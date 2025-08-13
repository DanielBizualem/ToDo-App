import FormModel from "../models/FormModel.js"
import userModel from "../models/UserModel.js"
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js"

const addTask = async(req,res)=>{
    try{
        const userId = req.userId
        const {title,description,date,category} = req.body
        if(!title||!description||!category){
            return res.json({
                success:false,
                message:"Please provide required field"
            })
        }
        const owner = userId
        const payload = {
            title,description,date,category,owner
        }
        const newTask = await FormModel(payload)
        await newTask.save()
        
        await userModel.findByIdAndUpdate(
            userId,
            { posts: newTask._id } ,
            { new: true }
        );
        return res.json({
            success:true,
            message:"Task added successfully"
        })

    }catch(error){
        res.json({
            success:false,
            message:"Catch Error"
        })
    }
}
const fetchTask = async(req,res)=>{
    const userId = req.userId
    try{
        const task = await FormModel.find({owner:userId})
        return res.json({
            success:true,
            message:"fetch successfully",
            data:task
        })
    }catch(error){
        return res.status(500).json({
            message:"Server error",
            success:false,
            error:true
        })
    }
}

const removeItem = async(req,res)=>{
    try{
        
    }catch(error){
        return res.json({
            message:error.message,
            success:false,
            error:true
        })
    }
}

const uploadImage = async(req,res)=>{
    try{
        const file = req.file
        const uploadImage = await uploadImageCloudinary(file)
        return res.json({
            message:"Upload Done",
            data:uploadImage,
            success:true
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export {addTask,fetchTask,uploadImage}