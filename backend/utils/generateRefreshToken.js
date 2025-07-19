import jwt from 'jsonwebtoken'
import userModel from '../models/UserModel.js'
import 'dotenv/config'

const generateRefreshToken = async(userId)=>{
    const token =  await jwt.sign({id:userId},process.env.REFRESH_TOKEN,{expiresIn:'7d'})
    const updateToken = await userModel.findByIdAndUpdate({_id:userId},{
        refresh_token:token
    })
    return token
}

export default generateRefreshToken