import {Product} from '../model/productSchema.js'
import cloudinary from "../config/cloudinaryConfig.js";

export const addProduct = async (req, res) => {
    try {
        const {categoryName, categoryDescription} = req.body;
        console.log(req.body);
        
        const existingProduct = await Product.findOne({
            'category.name': categoryName,
            'category.description': categoryDescription,
        });

        if (existingProduct) {
            return res.status(400).json({ message: 'This product is already added. Please add another product.' });
        }

        // Upload image to Cloudinary if provided
        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path);
                imageUrls.push(result.secure_url); // Add the uploaded image URL to the array
            }
        }

        // Create and save the product
        const newProduct = new Product({
            ...req.body,
            category: {
                name: categoryName,
                description: categoryDescription,
            },
            images: imageUrls,
        });

        await newProduct.save();

        res.status(201).json({ message: 'Product added successfully!', product: newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong while adding the product.' });
    }
};
