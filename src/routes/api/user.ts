import express from 'express';
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    updateUserById,
} from '../../controllers/user';
import { verifyAuthToken } from '../../middlewares/auth';

const users = express.Router();

users.get('/', getAllUsers);
users.post('/', createUser);
users.delete('/:id', verifyAuthToken, deleteUser);
users.get('/:id', verifyAuthToken, getUserById);
users.put('/:id', verifyAuthToken, updateUserById);

export default users;
