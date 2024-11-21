import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    name: {
        type : String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type : String,
        required : true,
    },
    verificationCode : { type : String},
    verificationCodeExpiry : { type : Date},
    passwordResetToken: { type : String},
    passwordResetTokenExpiry : {type : Date},
    isVerified : { type : Boolean, default : false},
    isAdmin : { type : Boolean, default : false},
    refreshToken : { type : String}
}, { timestamps : true })

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
} 
const User = mongoose.model("User", userSchema);
export default User;