import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

export interface User {
    id?: number;
    username: string;
    firstname: string;
    lastname: string;
    password: string;
}

dotenv.config();
const pepper = process.env.BCRYPT_PASSWORD as string;
const saltRounds = parseInt(process.env.SALT_ROUNDS as string);

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Cannot get user ${error}`);
        }
    }

    async create(user: User): Promise<User> {
        const { username, firstname, lastname, password } = user;
        try {
            const conn = await client.connect();
            const sql =
                'INSERT INTO users (username, firstname, lastname, password_digest) VALUES($1, $2, $3, $4) RETURNING *';
            const hash = bcrypt.hashSync(password + pepper, saltRounds);
            const result = await conn.query(sql, [
                username,
                firstname,
                lastname,
                hash,
            ]);
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Cannot create users with username ${username}: ${error}`,
            );
        }
    }

    async delete(id: number): Promise<User> {
        try {
            const conn = await client.connect();
            const sql = 'DELETE FROM users where id=($1)';
            const result = await conn.query(sql, [id]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot delete users with id ${id}: ${error}`);
        }
    }

    async getById(id: number): Promise<User> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users where id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot get user with id ${id}: ${error}`);
        }
    }

    async update(
        id: number,
        user: Omit<User, 'username' | 'password'>,
    ): Promise<User> {
        try {
            const { firstname, lastname } = user;
            const conn = await client.connect();
            const sql =
                'UPDATE users SET firstname=$1, lastname=$2 where id=($3) RETURNING *';
            const result = await conn.query(sql, [
                firstname,
                lastname,
                String(id),
            ]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot update user with id ${id}: ${error}`);
        }
    }

    async authenicate(
        username: string,
        password: string,
    ): Promise<User | null> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT password_digest FROM users WHERE username=($1)';
            const { rows } = await conn.query(sql, [username]);

            if (rows.length > 0) {
                const user = rows[0];
                if (
                    bcrypt.compareSync(password + pepper, user.password_digest)
                ) {
                    return user;
                }
            }
            conn.release();
            return null;
        } catch (err) {
            throw new Error(
                `Cannot find user with username ${username}: ${err}`,
            );
        }
    }
}
