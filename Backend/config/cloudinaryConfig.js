import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Add in your .env file
    api_key: process.env.CLOUDINARY_API_KEY,       // Add in your .env file
    api_secret: process.env.CLOUDINARY_API_SECRET  // Add in your .env file
});

export default cloudinary;
