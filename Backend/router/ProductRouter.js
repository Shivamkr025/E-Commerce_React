import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import { addProduct } from '../controller/productController.js';

const router = express.Router()

router.post('/add/product', upload.single('images'), addProduct)

export default router