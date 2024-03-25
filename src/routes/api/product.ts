import express from 'express';
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProductById,
} from '../../controllers/product';

const products = express.Router();

products.get('/', getAllProducts);
products.post('/', createProduct);
products.delete('/:id', deleteProduct);
products.get('/:id', getProductById);
products.put('/:id', updateProductById);

export default products;
