import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    date:{type:String,required:true},
    category:{type:String,required:true}
})

const FormModel = mongoose.models.form || mongoose.model('form',formSchema)

export default FormModel