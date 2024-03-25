import express from 'express';
import products from './api/product';

const routes = express.Router();
routes.use('/products', products);

export default routes;
