import client from '../database';

export interface User {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    password: string;
}

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            return result.rows;
        } catch (error) {
            throw new Error(`Cannot get user ${error}`);
        }
    }
}
