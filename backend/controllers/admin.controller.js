import User from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const dashboard = asyncHandler(async(req, res) => {
    const users = await User.find().select('-refreshToken -password')
    res.send(users)
})
export const getAllUsers = asyncHandler(async(req, res) => {
    const users = await User.find().select('-refreshToken -password')
    apiResponse.success(res, "Success", users, 200)
})

/**
 * Deletes a user by their ID.
 * @route DELETE /api/users/:id
 * @access Admin
 */
export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    // Validate that an ID is provided
    if (!id) {
      throw new apiError(400, 'User ID is required.');
    }
  
    // Attempt to find and delete the user
    const deletedUser = await User.findByIdAndDelete(id);
  
    // Handle case where user is not found
    if (!deletedUser) {
      throw new apiError(404, `User with ID: ${id} not found.`);
    }
  
    // Return success response
    apiResponse.success(res, `User with ID: ${id} has been successfully deleted.`, {}, 200);
  });