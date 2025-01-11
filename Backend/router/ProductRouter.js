import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import { addProduct, getAllProduct, getSingleProduct, updateProduct } from '../controller/productController.js';

const router = express.Router()

router.post('/add/product', upload.single('images'), addProduct)

router.get('/get/all-product', getAllProduct)

router.get('/products/:id', getSingleProduct)

router.post('/update/product/:id', updateProduct)

export default router