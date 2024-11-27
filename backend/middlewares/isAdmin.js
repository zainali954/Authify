import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js"; 

const isAdmin = asyncHandler(async (req, _, next) => {

    const user = await User.findById(req.user.id);

    if (!user) {
        throw new apiError(404, "User not found. Please log in again.");
    }
    console.log(user)
    // Check if the user is an admin
    if (user.role === "admin") {
        next(); // Allow the request to proceed
    } else {
        throw new apiError(403, "Forbidden: You do not have admin privileges.");
    }
});

export default isAdmin;
