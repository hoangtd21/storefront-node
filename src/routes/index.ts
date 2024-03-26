import express from 'express';
import products from './api/product';
import users from './api/user';
import orders from './api/order';

const routes = express.Router();
routes.use('/products', products);
routes.use('/users', users);
routes.use('/orders', orders);

export default routes;
