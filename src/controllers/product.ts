import { Request, Response } from 'express';
import { ProductStore } from '../models/product';

const productStore = new ProductStore();

export const getAllProducts = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const products = await productStore.index();
        res.status(200).send(products);
    } catch (error) {
        res.status(400).json(error);
    }
};

export const createProduct = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { name, price } = req.body;
        if (!name || !price) {
            res.status(400).send('Missing information product');
            return;
        }
        const newProduct = { name, price };
        const product = await productStore.create(newProduct);
        res.status(200).send(product);
    } catch (error) {
        res.status(400).json(error);
    }
};

export const deleteProduct = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).send('Missing product id');
            return;
        }

        const product = await productStore.getById(Number(id));
        if (!product) {
            res.status(404).send(`Product with id ${id} not found`);
            return;
        }

        await productStore.delete(Number(id));
        res.status(200).send(`Delete product have id ${id} success`);
    } catch (error) {
        res.status(400).json(error);
    }
};

export const getProductById = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).send('Missing product id');
            return;
        }
        const product = await productStore.getById(Number(id));

        if (!product) {
            res.status(404).send(`Product with id ${id} not found`);
            return;
        }

        res.status(200).send(product);
    } catch (error) {
        res.status(400).json(error);
    }
};

export const updateProductById = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, price } = req.body;
        if (!id || !name || !price) {
            res.status(400).send('Missing product information');
            return;
        }
        const product = await productStore.update(Number(id), { name, price });
        res.status(200).send(product);
    } catch (error) {
        res.status(400).json(error);
    }
};
