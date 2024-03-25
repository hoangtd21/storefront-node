import express from 'express';
import products from './api/product';
import users from './api/user';

const routes = express.Router();
routes.use('/products', products);
routes.use('/users', users);

export default routes;
