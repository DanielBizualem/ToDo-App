import FormModel from "../models/FormModel.js"


const addTask = async(req,res)=>{
    try{
        const {title,description,date,category} = req.body
        if(!title||!description||!date||!category){
            res.json({
                success:false,
                message:"Please provide required field"
            })
        }
        const payload = {
            title,description,date,category
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