import userModel from "../models/UserModel.js"
import bcryptjs from "bcryptjs"
import generateAccessToken from "../utils/generateAccessToken.js"
import generateRefreshToken from "../utils/generateRefreshToken.js"
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js"

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
            message:"Catch error"
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

        const comparePassword = await bcryptjs.compare(password,user.password)
        if(!comparePassword){
            return res.json({
                success:false,
                message:"Check your password"
            })
        }
        const accessToken =  await generateAccessToken(user._id)
        const refreshToken = await generateRefreshToken(user._id)
        
        
        if (!accessToken || !refreshToken) {
            return res.json({
                success:false,
                message:"Token not available"
            })
          }

        const cookieOptions = {
            httpOnly:true,
            secure:true,
            sameSite:"None"
        }

        res.cookie("accessToken",accessToken,cookieOptions)
        res.cookie("refreshToken",refreshToken,cookieOptions)

        return res.json({
            success:true,
            message:"Login successfully"
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

const uploadAvatar = async(req,res)=>{
    try{
        const image = req.file
        const userId = req.userId
        const upload = await uploadImageCloudinary(image)

        const uploadImage = await userModel.findByIdAndUpdate(userId,{
            avatar:upload.url
        })

        return res.json({
            success:true,
            message:"Upload successfully"
        })
    }catch(error){
        res.json({
            success:false,
            message:"Catch error"
        })
    }
}
export {register,login,logout,uploadAvatar}