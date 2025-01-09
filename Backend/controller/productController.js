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

        // if (existingProduct) {
        //     return res.status(400).json({ message: 'This product is already added. Please add another product.' });
        // }

        // Upload image to Cloudinary if provided
        let imageUrl = [];
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl.push(result.secure_url); // Store the image URL in the images array
        }

        // Create and save the product
        const newProduct = new Product({
            ...req.body,
            category: {
                name: categoryName,
                description: categoryDescription,
            },
            images: imageUrl,
        });

        await newProduct.save();

        res.status(201).json({ message: 'Product added successfully!', product: newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong while adding the product.' });
    }
};
