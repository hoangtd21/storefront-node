import { Request, Response } from 'express';
import { OrderStore } from '../models/order';

const orderStore = new OrderStore();

export const getAllOrders = async (
    _req: Request,
    res: Response,
): Promise<void> => {
    try {
        const orders = await orderStore.index();
        res.status(200).send(orders);
    } catch (error) {
        res.status(400).json(error);
    }
};

export const createOrder = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { products, status, user_id } = req.body;
        if (!products || !status || !user_id) {
            res.status(400).send('Missing information order');
            return;
        }
        const newOrder = { products, status, user_id };
        const order = await orderStore.create(newOrder);
        res.status(200).send(order);
    } catch (error) {
        res.status(400).json(error);
    }
};

export const deleteOrder = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).send('Missing order id');
            return;
        }

        const product = await orderStore.getOrderProducts(Number(id));
        if (!product) {
            res.status(404).send(`Order with id ${id} not found`);
            return;
        }
        await orderStore.delete(Number(id));
        res.status(200).send(`Delete order have id ${id} success`);
    } catch (error) {
        res.status(400).json(error);
    }
};

export const updateOrderById = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { id } = req.params;
        const { products, status, user_id } = req.body;
        if (!id || !products || !status || !user_id) {
            res.status(400).send('Missing order information');
            return;
        }

        const orderProducts = await orderStore.getOrderProducts(Number(id));
        if (!orderProducts) {
            res.status(404).send(`Order with id ${id} not found`);
            return;
        }
        const updateOrder = { products, status, user_id };
        const order = await orderStore.update(Number(id), updateOrder);
        res.status(200).send(order);
    } catch (error) {
        res.status(400).json(error);
    }
};

export const getOrderProductsById = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).send('Missing order id');
            return;
        }

        const product = await orderStore.getOrderProducts(Number(id));
        if (!product) {
            res.status(404).send(`Order with id ${id} not found`);
            return;
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(400).json(error);
    }
};
