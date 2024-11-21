import validator from "validator";
import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import apiResponse from "../utils/apiResponse.js";

export const changeUserDetails = asyncHandler(async(req, res)=>{
    const { name, email }  = req.body
    
    if(!name && !email){
        throw new apiError(400, "At least one of 'email' or 'name' must be provided")
    }
    if(email && !validator.isEmail(email)){
        throw new apiError(400, "Invalid Email format")
    }

    if(name && name.length ===0){
        throw new apiError(400, "'name can't be empty")
    }

    const user = await User.findById(req.user.id)
    if(email){
        user.email = email
    }
    if(name){
        user.name = name
    }

    await user.save()

    apiResponse.success(res, "User details updated successfully.", {}, 200)
})