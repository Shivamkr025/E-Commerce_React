import mongoose from "mongoose";

const orderSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        },
    ],
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
    },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, default: 'Pending' }, // Paid, Pending, Failed
    orderStatus: { type: String, default: 'Processing' }, // Processing, Shipped, Delivered, Canceled
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const Order = mongoose.model('Order', orderSchema);
