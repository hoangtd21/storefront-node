import express from 'express';
import {
    getAllOrders,
    createOrder,
    deleteOrder,
    getOrderProductsById,
    updateOrderById,
} from '../../controllers/order';
import { verifyAuthToken } from '../../middlewares/auth';

const orders = express.Router();

orders.get('/', getAllOrders);
orders.post('/', verifyAuthToken, createOrder);
orders.delete('/:id', verifyAuthToken, deleteOrder);
orders.get('/:id', getOrderProductsById);
orders.put('/:id', verifyAuthToken, updateOrderById);

export default orders;
