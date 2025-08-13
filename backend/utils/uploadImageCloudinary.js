import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv';
dotenv.config();
console.log({
    CLOUD_NAME: !!process.env.CLOUD_NAME, // Should log 'true'
    API_KEY: !!process.env.API_KEY,       // Should log 'true'
    API_SECRET: !!process.env.API_SECRET  // Should log 'true'
  });

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})


const uploadImageCloudinary = async(image)=>{
    const buffer = image?.buffer || Buffer.from(await Image.arrayBuffer())

    const uploadImage = await new Promise((resolve,reject)=>{
        cloudinary.uploader.upload_stream({folder:"todo"},(error,uploadResult)=>{
            return resolve(uploadResult)
        }).end(buffer)
    })
    return uploadImage
}

export default uploadImageCloudinary

//API_KEY = 294598624692443