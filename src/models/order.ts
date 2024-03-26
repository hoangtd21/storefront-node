import client from '../database';

export interface Order {
    id?: number;
    products: OrderProduct[];
    user_id: number;
    status: boolean;
}

export interface OrderProduct {
    product_id: number;
    quantity: number;
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Cannot get orders ${error}`);
        }
    }

    async getOrderProducts(id: number): Promise<Order> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            const orderProductsSql =
                'SELECT product_id, quantity FROM order_products WHERE order_id=($1)';
            const { rows: orderProductRows } = await conn.query(
                orderProductsSql,
                [id],
            );
            conn.release();
            return {
                ...result.rows[0],
                products: orderProductRows,
            };
        } catch (err) {
            throw new Error(`Could not find order ${id}. ${err}`);
        }
    }

    async create(order: Order): Promise<Order> {
        const { products, status, user_id } = order;
        try {
            const conn = await client.connect();
            const sql =
                'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
            const result = await conn.query(sql, [
                String(user_id),
                String(status),
            ]);
            const order = result.rows[0];

            const orderProductsSql =
                'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING product_id, quantity';
            const orderProducts = [];
            for (const product of products) {
                const { product_id, quantity } = product;
                const { rows } = await conn.query(orderProductsSql, [
                    order.id,
                    product_id,
                    quantity,
                ]);
                orderProducts.push(rows[0]);
            }

            conn.release();

            return {
                ...order,
                products: orderProducts,
            };
        } catch (error) {
            throw new Error(`Cannot create orders ${error}`);
        }
    }

    async delete(id: number): Promise<Order> {
        try {
            const conn = await client.connect();
            const orderProductsSql =
                'DELETE FROM order_products WHERE order_id';
            await conn.query(orderProductsSql, [id]);

            const sql = 'DELETE FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot delete orders ${error}`);
        }
    }

    async update(id: number, order: Order): Promise<Order> {
        const { products, status, user_id } = order;
        try {
            const conn = await client.connect();
            const sql =
                'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *';
            const { rows } = await conn.query(sql, [
                String(id),
                String(status),
            ]);
            const order = rows[0];
            const orderProductsSql =
                'UPDATE order_products SET product_id = $1, quantity = $2 WHERE order_id = $3 RETURNING product_id, quantity';
            const orderProducts = [];

            for (const product of products) {
                const { rows } = await conn.query(orderProductsSql, [
                    product.product_id,
                    product.quantity,
                    order.id,
                ]);
                orderProducts.push(rows[0]);
            }

            conn.release();
            return {
                ...order,
                products: orderProducts,
            };
        } catch (error) {
            throw new Error(`Cannot update orders for ${user_id}: ${error}`);
        }
    }
}
