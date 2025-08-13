import userModel from "../models/UserModel.js"
import FormModel from "../models/FormModel.js"
import bcryptjs from "bcryptjs"
import generateAccessToken from "../utils/generateAccessToken.js"
import generateRefreshToken from "../utils/generateRefreshToken.js"
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js"
import generateOtp from "../utils/generateOtp.js"
import sendEmail from "../config/sendEmail.js"
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js"
import jwt from 'jsonwebtoken'

const register = async(req,res)=>{
    try{
        const {firstname,lastname,email,password} = req.body
        if(!firstname||!lastname||!email||!password){
            return res.json({
                success:false,
                message:"Please fill all fields"
            })
        }

        const user = await userModel.findOne({email})
        if(user){
            return res.json({
                success:false,
                message:"Already registered"
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)

        const payload = {
            firstname,
            lastname,
            email,
            password:hashedPassword,
        }
        
        const registerUser = new userModel(payload)
        await registerUser.save()
        return res.json({
            success:true,
            message:"Registered successfully"
        })

    }catch(error){
        res.json({
            success:false,
            message:error.message
        })
    }
}

const login = async(req,res)=>{
    try{
        const {email,password} = req.body
        if(!email||!password){
            return res.json({
                success:false,
                message:"Provide email and password"
            })
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({
                success:false,
                message:"User not found"
            })
        }

        const comparePassword = await bcryptjs.compare(password, user.password)
        if(!comparePassword){
            return res.json({
                success:false,
                message:"Check your password"
            })
        }
        const accessToken =  await generateAccessToken(user._id)
        const refreshToken = await generateRefreshToken(user._id)
        
        const updateUser = await userModel.findByIdAndUpdate(user?._id,{
            last_login_date: new Date()
        })

        if (!accessToken || !refreshToken) {
            return res.json({
                success:false,
                message:"Token not available"
            })
          }

        const cookieOptions = {
            httpOnly:true,
            secure:true,
            sameSite:"None",
        }

        res.cookie("accessToken",accessToken,cookieOptions)
        res.cookie("refreshToken",refreshToken,cookieOptions)

        const userWithPosts = await userModel.findById(user._id).populate({path:'posts'})
       
        return res.json({
            success:true,
            message:"Login successfully",
            user: userWithPosts,
            data:{
                "accessToken":accessToken,
                "refreshToken":refreshToken
            }
        })
    }catch(error){
        return res.json({
            success:false,
            message:"Catch Error"
        })
    }
}

const logout = async(req,res)=>{
    try{
        const userId = req.userId
        const cookieOptions  ={
            httpOnly:true,
            secure:true,
            sameSite:"None"
        }
        res.clearCookie("accessToken",cookieOptions)
        res.clearCookie("refreshToken",cookieOptions)

        const removeRefreshToken = await userModel.findByIdAndUpdate(userId,{
            refresh_token:""
        })

        return res.json({
            success:true,
            message:"Logout successfully"
        })

    }catch(error){
        return res.json({
            success:false,
            message:"Catch error"
        })
    }
}

const forgot_password = async(req,res)=>{
    try{
        const {email} = req.body

        const user = await userModel.findOne({email})
        if(!user){
            return res.json({
                success:false,
                message:"User not available"
                }
            )
        }
        const otp = generateOtp()
        const expireTime = new Date(Date.now() + 3600000)

        const update = await userModel.findByIdAndUpdate(user._id,{
            forgot_password_otp: otp,
            forgot_password_expiry: new Date(expireTime).toISOString()
        })
        await sendEmail({
            sendTo:email,
            subject:"Forgot Password from To-Do App",
            html: forgotPasswordTemplate({
                name:user.firstname,
                otp:otp
            })
        })
        return res.json({
            success:true,
            message:"check your email",
        })
    }catch(error){
        return res.json({
            success:false,
            message:"Catch Error"
        })
    }
}

const verify_otp = async(req,res)=>{
    try{
        const {email,otp} = req.body

        if(!email||!otp){
            return res.json({
                success:false,
                message:"Provide email and otp"
            })
        }

        const user = await userModel.findOne({email})
        if(!user){
            return res.json({
                success:false,
                message:"Email not available"
            })
        }

        const currentTime = new Date().toISOString()
        if(user.forgot_password_expiry<currentTime){
            return res.json({
                success:false,
                message:"otp is expired"
            })
        }

        if(otp!==user.forgot_password_otp){
            return res.json({
                success:false,
                message:"Invalid Otp"
            })
        }
        
        const updateUser = await userModel.findByIdAndUpdate(user?._id,{
            forgot_password_otp:"",
            forgot_password_expiry:""
        })


        return res.json({
            success:true,
            message:"Verify Successfully"
        })
    }catch(error){
        return res.json({
            success:false,
            message:"Catch Error"
        })
    }
}

const resetPassword = async(req,res)=>{
    try{
        const {email,newPassword,confirmPassword} = req.body
        if(!email||!newPassword||!confirmPassword){
            return res.json({
                success:false,
                message:"Provide all field"
            })
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({
                success:false,
                message:"User not available"
            })
        }

        if(newPassword!==confirmPassword){
            return res.json({
                success:false,
                message:"Password not matched"
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(newPassword,salt)

        const update = await userModel.findByIdAndUpdate(user._id,{
            password:hashedPassword
        })
        return res.json({
            success:true,
            message:"Password changed"
        })
    }catch(error){
        return res.json({
            success:false,
            message:"Catch Error"
        })
    }
}

const uploadAvatar = async(req,res)=>{
    try{
        const image = req.file
        const userId = req.userId
        const upload = await uploadImageCloudinary(image)
        const uploadImage = await userModel.findByIdAndUpdate(userId,{
            avatar:upload.url
        },{new:true}).lean()

        return res.json({
            success:true,
            message:"Upload successfully",
            data:upload
        })
    }catch(error){
        return res.json({
            success:false,
            message:error.message
        })
    }
}

const refreshToken = async(req,res)=>{
    try{
        const refreshToken = req.cookies?.refreshToken || req?.header?.authorization?.split(" ")[1]
        if(!refreshToken){
            return res.status(401).json({
                success:false,
                message:"Unauthorized access"
            })
        }

        const verifyToken = await jwt.verify(refreshToken,process.env.SECRET_REFRESH_TOKEN)

        if(!verifyToken){
            return res.json({
                success:false,
                message:"token is expired"
            })
        }
        const userId = verifyToken?._id

        const cookieOptions = {
            httpOnly:true,
            secure:true,
            sameSite:"None"
        }

        const newAccessToken = await generateAccessToken(userId)
        res.cookie('accessToken',newAccessToken,cookieOptions)
        return res.json({
            success:true,
            message:"New access Token generated",
            data:{
                'accessToken':newAccessToken
            }
        })
    }catch(error){
        return res.json({
            success:false,
            message:"Catch Error"
        })
    }
}

const userDetail = async(req,res)=>{
    try{
        const userId = req.userId

        const user = await userModel.findById(userId).select("-password -refreshToken")
        return res.json({
            success:true,
            data:user,
            message:"user details"
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something wrong"
        })
    }
}

const updateUserDetails = async(req,res)=>{
    try{
        const userId = req.userId
        const {firstname,lastname,email,password} = req.body
        let hashedPassword = ""
        if(password){
            const salt = await bcryptjs.genSalt(10)
            hashedPassword = await bcryptjs.hash(password,salt)
        }
        const updateUser = await userModel.findByIdAndUpdate(userId,{
            ...(firstname && {firstname:firstname}),
            ...(lastname && {lastname:lastname}),
            ...(email && {email:email}),
            ...(password && {password:hashedPassword})
        })

        return res.json({
            message:"Updated user successfully",
            success:true
        })
    }catch(error){
        return res.json({
            success:false,
            message:"Catch error"
        })
    }
}



export {register,login,logout,uploadAvatar,forgot_password,verify_otp,resetPassword,refreshToken,userDetail,updateUserDetails}