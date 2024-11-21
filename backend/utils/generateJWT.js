import jwt from 'jsonwebtoken';
import apiError from './apiError.js';

const generateJWT = async (user) => {
    // Validate that secrets are available
    if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
        throw new apiError(400, 'JWT secrets are not defined in environment variables');
    }

    // Generate tokens
    const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30m' }
    );
    const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );

    // Save the refresh token to the database
    user.refreshToken = refreshToken;
    await user.save();
    
    return { accessToken, refreshToken };
};

export default generateJWT;
