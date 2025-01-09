import mongoose from "mongoose";

const cartSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cartItems: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
        },
    ],
    totalPrice: { type: Number, default: 0 },
    updatedAt: { type: Date, default: Date.now },
});

export const Cart = mongoose.model('Cart', cartSchema);
