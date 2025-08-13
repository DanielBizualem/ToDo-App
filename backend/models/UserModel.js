import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    avatar:{type:String,default:null},
    refresh_token:{type:String,default:null},
    forgot_password_otp:{type:String,default:null},
    forgot_password_expiry:{type:Date,default:null},
    last_login_date:{type:Date,default:null},
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'formModel' }]
})

const userModel = mongoose.models.userModel || mongoose.model('userModel',userSchema)

export default userModel