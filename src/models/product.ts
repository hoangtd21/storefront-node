import client from '../database';

export interface Product {
    id?: number;
    name: string;
    price: number;
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Cannot get products ${error}`);
        }
    }

    async create(product: Product): Promise<Product> {
        const { name, price } = product;
        try {
            const conn = await client.connect();
            const sql =
                'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
            const result = await conn.query(sql, [
                name as string,
                String(price),
            ]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot create products ${name}: ${error}`);
        }
    }

    async delete(id: number): Promise<Product> {
        try {
            const conn = await client.connect();
            const sql = 'DELETE FROM products where id=($1)';
            const result = await conn.query(sql, [id]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot delete products with id ${id}: ${error}`);
        }
    }

    async getById(id: number): Promise<Product> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products where id=($1)';
            const result = await conn.query(sql, [id]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot get product with id ${id}: ${error}`);
        }
    }

    async update(id: number, product: Product): Promise<Product> {
        try {
            const { name, price } = product;
            const conn = await client.connect();
            const sql =
                'UPDATE products SET name=$1, price=$2 where id=($3) RETURNING *';
            const result = await conn.query(sql, [
                name as string,
                String(price),
                String(id),
            ]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot update product with id ${id}: ${error}`);
        }
    }
}
