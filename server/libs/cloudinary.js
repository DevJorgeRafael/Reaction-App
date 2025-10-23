import { v2 as cloudinary } from 'cloudinary'

console.log(process.env.CLOUDINARY_NAME);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const uploadImage = async (filePath) => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'reaction'
    })
}

export const deleteImage = async (id) => {
    return await cloudinary.uploader.destroy(id)
}