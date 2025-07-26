import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    firstname:{type:String,require:true},
    lastname:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    avatar:{type:String,require:true,default:""},
    refresh_token:{type:String,default:""},
    forgot_password_otp:{type:String,default:null},
    forgot_password_expiry:{type:Date,default:""}
})

const userModel = mongoose.models.userModel || mongoose.model('userModel',userSchema)

export default userModel