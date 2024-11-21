import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const dashboard = asyncHandler(async(req, res) => {
    const users = await User.find().select('-refreshToken -password')
    res.send(users)
})