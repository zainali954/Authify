import transporter from "../config/email.config.js";
import { verify_email, email_verified, reset_password, reset_password_successful } from "../templates/email.templates.js";

export const sendVerifyEmail = async (email, code) => {
    try {
        if (!email || !code) {
            throw new Error("Email and verification code are required");
        }

        const emailContent = verify_email.replace("{{CODE}}", code);
        const response = await transporter.sendMail({
            from: `"Authify" <${process.env.EMAIL_SENDER}>`, // Use environment variable for the sender's email
            to: email,
            subject: 'Verify your email',
            html: emailContent,
        });

        console.log(`Verification email sent successfully to ${email}`, { response });
    } catch (error) {
        console.error(`Error sending verification email to ${email}: ${error.message}`, { error });
        throw error; // Re-throw error to let the caller handle it
    }
};

export const sendVerifiedSuccessfully = async (email) => {
    try {
        if (!email) {
            throw new Error("Email is required");
        }

        const emailContent = email_verified;
        const response = await transporter.sendMail({
            from: `"Authify" <${process.env.EMAIL_SENDER}>`, 
            to: email,
            subject: 'Email Verified Successfully',
            html: emailContent,
        });

        console.log(`Verified successfully email sent to ${email}`, { response });
    } catch (error) {
        console.error(`Error sending verified successfully email to ${email}: ${error.message}`, { error });
        throw error;
    }
};

export const sendResetPassword = async (email, resetLink) => {
    try {
        if (!email || !resetLink) {
            throw new Error("Email and reset link are required");
        }
    console.log(resetLink)
        const emailContent = reset_password.replaceAll("{{RESET_LINK}}", resetLink);
        const response = await transporter.sendMail({
            from: `"Authify" <${process.env.EMAIL_SENDER}>`, 
            to: email,
            subject: 'Reset Your Password',
            html: emailContent,
        });

        console.log(`Password reset email sent successfully to ${email}`, { response });
    } catch (error) {
        console.error(`Error sending reset password email to ${email}: ${error.message}`, { error });
        throw error;
    }
};

export const sendResetPasswordSuccessful = async (email) => {
    try {
        if (!email) {
            throw new Error("Email is required");
        }

        const emailContent = reset_password_successful;
        const response = await transporter.sendMail({
            from: `"Authify" <${process.env.EMAIL_SENDER}>`,
            to: email,
            subject: 'Password Reset Successful',
            html: emailContent,
        });

        console.log(`Password reset successful email sent to ${email}`, { response });
    } catch (error) {
        console.error(`Error sending reset password successful email to ${email}: ${error.message}`, { error });
        throw error;
    }
};
