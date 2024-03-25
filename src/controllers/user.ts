import { Request, Response } from 'express';
import { UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const userStore = new UserStore();

dotenv.config();

export const getAllUsers = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const users = await userStore.index();
        res.status(200).send(users);
    } catch (error) {
        res.status(400).json(error);
    }
};

export const createUser = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { username, firstname, lastname, password } = req.body;
        if (!username || !firstname || !lastname || !password) {
            res.status(400).send('Missing information user');
            return;
        }
        const newUser = { username, firstname, lastname, password };
        const user = await userStore.create(newUser);
        const token = jwt.sign({ user }, process.env.TOKEN_SECRET as string);
        res.status(200).send(token);
    } catch (error) {
        res.status(400).json(error);
    }
};

export const deleteUser = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).send('Missing user id');
            return;
        }

        const user = await userStore.getById(Number(id));
        if (!user) {
            res.status(404).send(`User with id ${id} not found`);
            return;
        }

        await userStore.delete(Number(id));
        res.status(200).send(`Delete user have id ${id} success`);
    } catch (error) {
        res.status(400).json(error);
    }
};

export const getUserById = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).send('Missing user id');
            return;
        }
        const user = await userStore.getById(Number(id));

        if (!user) {
            res.status(404).send(`User with id ${id} not found`);
            return;
        }

        res.status(200).send(user);
    } catch (error) {
        res.status(400).json(error);
    }
};

export const updateUserById = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { id } = req.params;
        const { firstname, lastname } = req.body;
        if (!id || !firstname || !lastname) {
            res.status(400).send('Missing user information');
            return;
        }
        const user = await userStore.update(Number(id), {
            firstname,
            lastname,
        });
        res.status(200).send(user);
    } catch (error) {
        res.status(400).json(error);
    }
};
