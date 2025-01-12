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
export const getAllProduct = async(req, res) => {
    try {
        const fetchProduct = await Product.find()
        res.status(200).json({message:"successfully get all product", fetchProduct})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Someting went wrong in get all product function"})
        
    }
}

export const getSingleProduct = async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ success: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch product details", error });
    }
}

export const updateProduct = async(req, res) => {
    const {id} = req.body
    try {
        const updateProdct = await Product.findById(id)
        if(!updateProdct){
            return res.status(400).json({message: "Invalid Product Please Check Your id "})
        }

        const submit = await Product.findByIdAndUpdate({id}, {$set:{...req.body}})
        res.status(200).json({product: submit})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Something went wrong in update product fuction"})
        
    }
}

export const deleteProduct = async(req, res) => {

}

export const productRating = async(req, res) => {

}

export const searchProduct = async(req, res) => {

}

export const getProductByCategory = async(req, res) => {
    
}
