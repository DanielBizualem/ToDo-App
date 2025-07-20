import FormModel from "../models/FormModel.js"


const addTask = async(req,res)=>{
    try{
        const userId = req.userId
        const {title,description,date,category} = req.body
        if(!title||!description||!date||!category){
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


export {addTask}