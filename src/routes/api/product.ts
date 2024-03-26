import express from 'express';
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProductById,
} from '../../controllers/product';
import { verifyAuthToken } from '../../middlewares/auth';

const products = express.Router();

products.get('/', getAllProducts);
products.post('/', verifyAuthToken, createProduct);
products.delete('/:id', verifyAuthToken, deleteProduct);
products.get('/:id', getProductById);
products.put('/:id', verifyAuthToken, updateProductById);

export default products;
