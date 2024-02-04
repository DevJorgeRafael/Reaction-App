import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: "deg43qjmw",
    api_key: "599465688566752",
    api_secret: "ktc6oqVZKEL7Gd7hKKFtrn7FHeg"
})

export const uploadImage = async (filePath) => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'reaction'
    })
}

export const deleteImage = async (id) => {
    return await cloudinary.uploader.destroy(id)
}