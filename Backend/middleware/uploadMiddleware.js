import multer from "multer";
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinaryConfig.js';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'ecommerce-images', // Folder name in Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed image formats
    },
});

const upload = multer({ storage: storage });

export default upload
