import { client } from '../database';

export interface Product {
    id: number;
    name: string;
    price: number;
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            return result.rows;
        } catch (error) {
            throw new Error(`Cannot get products ${error}`);
        }
    }
}
