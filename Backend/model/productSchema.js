import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: {
        type: Number,
        required: true,
        set: (value) => typeof value === 'string' ? parseFloat(value.replace(/,/g, "")) : value,
    },
    stock: {
        type: Number,
        required: true,
        set: (value) => typeof value === 'string' ? parseInt(value, 10) : value,
    },
    category: {
        name: { type: String, required: true }, // Simple string for category name
        description: { type: String },         // Optional category description
    },
    images: [{ type: String }], // Array of image URLs
    ratings: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user
            rating: { type: Number, required: true, min: 1, max: 5 },    // Ensure rating is between 1 and 5
            comment: { type: String },                                  // Optional user comment
        },
    ],
    createdAt: { type: Date, default: Date.now },
});

// Export the Product model
export const Product = mongoose.model('Product', productSchema);
