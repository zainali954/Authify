import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import crypto from 'crypto'

import User from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateJWT from "../utils/generateJWT.js";
import validateFields from "../utils/validateFields.js";
import { sendVerifyEmail, sendVerifiedSuccessfully, sendResetPassword, sendResetPasswordSuccessful } from "../utils/sendEmails.js";
import formatDateShort from "../utils/convertDates.js";

export const register = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;

    const data = [
        {
            value: req.body.email,
            type: "email",
        },
        {
            value: req.body.password,
            type: "password",
        }
    ]
    validateFields(data)

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return next(new apiError(400, "User already exists with this email"))
    }

    // generate 6 digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    // hash this verification code
    const hashedVerificationCode = await bcrypt.hash(verificationCode, 10);

    const newUser = await User.create({
        name,
        email,
        password,
        lastLogin: Date.now(),
        verificationCode: hashedVerificationCode,
        verificationCodeExpiry: Date.now() + 15 * 60 * 1000 // 15 minutes
    })

    const { accessToken, refreshToken } = await generateJWT(newUser)

    // Send new tokens in cookies
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 30 * 60 * 1000 // 30 minutes
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    // send verification email
    await sendVerifyEmail(newUser.email, verificationCode)
    const userData = {
        ...newUser._doc,
        createdAt: formatDateShort(newUser.createdAt),
        lastLogin: formatDateShort(newUser.lastLogin),
        password: undefined,
        refreshToken: undefined,
        verificationCode: undefined,
        verificationCodeExpiry: undefined
    }
    console.log(userData)
    apiResponse.success(res, "Registration successful! We've sent a 6-digit verification code to your email. Please verify to activate your account.", { userData, accessToken }, 201)
})

export const login = asyncHandler(async (req, res, next) => {
    // get user details from request body
    const { email, password } = req.body;
    const data = [
        {
            value: req.body.email,
            type: "email",
        },
        {
            value: req.body.password,
            type: "password",
        }
    ]
    validateFields(data)

    // find user in database
    const user = await User.findOne({ email })

    if (!user) {
        throw new apiError(404, "Invalid email or password. Please check your credentials and try again.")
    }
    // check if password is correct
    const isCorrect = await user.isPasswordCorrect(password)
    if (!isCorrect) {
        throw new apiError(401, "Invalid email or password. Please check your credentials and try again.")
    }
    // generate access and refresh tokens
    const { accessToken, refreshToken } = await generateJWT(user)

    // Send new tokens in cookies
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 30 * 60 * 1000 // 30 minutes
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    user.lastLogin = Date.now();
    await user.save()

    const userData = {
        ...user._doc,
        createdAt: formatDateShort(user.createdAt),
        lastLogin: formatDateShort(user.lastLogin),
        password: undefined,
        refreshToken: undefined
    }
    console.log(userData)
    // send response
    apiResponse.success(res, "User logged in successfully", { userData, accessToken }, 200)
})

export const logout = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    if (!user) {
        throw new apiError(404, "User not found")
    }
    user.refreshToken = undefined;
    await user.save();
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    apiResponse.success(res, "User logged out successfully", {}, 200)
})

export const refreshToken = asyncHandler(async (req, res, next) => {
    const IncommingRefreshToken = req.cookies?.refreshToken 
    console.log(IncommingRefreshToken)

    if (!IncommingRefreshToken) {
        throw new apiError(401, "Refresh token missing. Please log in again.");
    }

    let decoded;
    try {
        decoded = jwt.verify(IncommingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
        console.log(err.message)
        throw new apiError(403, err.message);
    }

    const user = await User.findById(decoded.id);
    if (!user) {
        throw new apiError(404, "User not found. Please log in again.");
    }

    if (user.refreshToken !== IncommingRefreshToken) {
        user.refreshToken = null; // Revoke refresh token
        await user.save();
        throw new apiError(401, "Possible token theft detected. Please log in again.");
    }

    // Generate new tokens
    const { accessToken, refreshToken } = await generateJWT(user);

    user.refreshToken = refreshToken;
    await user.save()

    // Set cookies
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 30 * 60 * 1000, // 30 minutes
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send success response
    apiResponse.success(res, "Token refreshed successfully.", { accessToken }, 200)
});

export const verifyEmail = asyncHandler(async (req, res) => {
    const { email, verificationCode } = req.body;
    const data = [
        {
            value: verificationCode,
            type: "verificationCode",
        }
    ]
    validateFields(data)
    const accessToken =
        req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    let userId;
    if (accessToken) {
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            userId = decoded.id;
        } catch (error) {
            throw new apiError(401, "Invalid or expired token");
        }
    }

    // Find user by ID (if logged in) or by email (if not logged in)
    const user = userId
        ? await User.findById(userId)
        : await User.findOne({ email: email?.toLowerCase().trim() });

    if (!user) {
        throw new apiError(404, "User not found check your email");
    }

    // Check if the verification code exists and has not expired
    if (!user.verificationCode) {
        throw new apiError(400, "Verification code not found or already used");
    }

    if (user.verificationCodeExpiry && user.verificationCodeExpiry < Date.now()) {
        throw new apiError(400, "Verification code has expired");
    }

    // Validate the verification code
    const isCodeValid = await bcrypt.compare(verificationCode, user.verificationCode);
    if (!isCodeValid) {
        throw new apiError(400, "Invalid verification code");
    }

    // Check if the email is already verified
    if (user.isVerified) {
        throw new apiError(400, "Email already verified");
    }

    // Mark user as verified and clear verification code/expiry
    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpiry = undefined;
    await user.save();

    // Notify the user and send a success response
    try {
        sendVerifiedSuccessfully(user.email);
    } catch (error) {
        console.error("Failed to send verification email:", error.message);
    }

    apiResponse.success(res, "Email verified successfully", {
        user
    }, 200);
});

export const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    // Validate email field
    validateFields([{ value: email, type: "email" }]);

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        throw new apiError(404, "No account found with this email address.");
    }

    // Generate reset token
    const passwordResetToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })

    // Send reset link via email
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${passwordResetToken}`;
    sendResetPassword(user.email, resetLink);

    // Respond with success message
    apiResponse.success(
        res,
        "A password reset email has been sent. Please check your inbox.",
        {},
        200
    );
});

export const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    console.log(req.body)
    console.log(token)

    // Validate input fields
    validateFields([
        { value: password, type: "password" }
    ]);

    // Ensure token is provided
    if (!token) {
        throw new apiError(400, "Reset token is missing. Please try again.");
    }

    // decode the token and takeout user email
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log(decoded)
    } catch (error) {
        console.error(error)
    }

    const user = await User.findOne({
        email: decoded.email
    });

    if (!user) {
        throw new apiError(400, "Invalid or expired token. Please request a new one.");
    }

    user.password = password;
    await user.save();

    // Notify user of successful password change
    sendResetPasswordSuccessful(user.email);

    // Respond with success message
    apiResponse.success(
        res,
        "Your password has been reset successfully. You can now log in with your new password.",
        {},
        200
    );
});


export const resendVerificationEmail = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    if (!user) {
        throw new apiError(404, "User not found")
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedVerificationCode = await bcrypt.hash(verificationCode, 10);

    user.verificationCode = hashedVerificationCode
    user.verificationCodeExpiry = Date.now() + 15 * 60 * 1000 //15 minutes
    await user.save()

    await sendVerifyEmail(user.email, verificationCode)

    apiResponse.success(res, "If the email exists, a code has been sent", {}, 200)
})