import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://Daniel:daniel321@cluster0.wvbmfcw.mongodb.net/Todo').then(()=>console.log('DB Connected'))
}