import jwt from "jsonwebtoken"

const auth = async(req,res,next)=>{
    try{
        const token = req.cookies?.accessToken || req.headers?.authorization?.split(" ")[1]
        if(!token){
            return res.json({
                success:false,
                message:"Token not available"
            })
        }
        const decode = await jwt.verify(token,process.env.SECRET_ACCESS_TOKEN)
        if(!decode){
            return res.status(401).json({
                success:false,
                message:"unauthorized access"
            })
        }

        req.userId = decode.id
        next()
    }catch(error){
        return res.json({
            success:false,
            message:"Catch Error"
        })
    }
}

export default auth