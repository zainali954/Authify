import apiError from "../utils/apiError.js"
import jwt from "jsonwebtoken";

const verifyAuth = (req, res, next) => {
    try {
        const accessToken = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', "");

        if (!accessToken) {
            // Missing token, signal frontend to attempt refresh
            throw new apiError(401, "Access token missing. Attempt to refresh the session.");
        }

        let decodedToken;
        try {
            // Verify token
            decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                // Access token expired
                throw new apiError(401, "Access token expired. Refresh required.");
            }
            // Invalid token
            throw new apiError(403, "Invalid access token. Please log in again.");
        }

        // Attach user data to the request object
        req.user = decodedToken;
        next();
    } catch (error) {
        throw new apiError(error.code || 401, error.message || "Authentication failed. Please log in again.")
    }
}

export default verifyAuth;