import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    date:{type:Date,default:null},
    category:{type:String,required:true},
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true }
},{ timestamps: true })

const FormModel = mongoose.models.form || mongoose.model('formModel',formSchema)

export default FormModel