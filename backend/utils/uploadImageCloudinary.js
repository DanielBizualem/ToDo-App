import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

const uploadImageCloudinary = async(image)=>{
    const buffer = image?.buffer || Buffer.from(await Image.arryBuffer())

    const uploadImage = await new Promise((resolve,reject)=>{
        cloudinary.uploader.upload_stream({folder:"todo"},(error,uploadResult)=>{
            return resolve(uploadResult)
        }).end(buffer)
    })
    return uploadImage
}

export default uploadImageCloudinary