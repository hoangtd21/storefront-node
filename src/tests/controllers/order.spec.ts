import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import app from '../..';
import { UserJwt } from './product.spec';
import { Product } from '../../models/product';

const request = supertest(app);

describe('Order controller', () => {
    let token: string;
    let userId: number;

    beforeAll(async () => {
        const user = {
            username: 'hoangtd',
            firstname: 'Hoang',
            lastname: 'Tran',
            password: '12345678',
        };
        const data = await request.post('/api/users').send(user);
        token = data.text;
        const { user: userData } = jwt.verify(
            token,
            process.env.TOKEN_SECRET as string,
        ) as UserJwt;
        userId = userData.id;
    });

    afterAll(async () => {
        await request
            .delete(`/api/users/${userId}`)
            .set('Authorization', 'bearer ' + token);
    });

    it('should call api GET /api/orders success', async () => {
        const res = await request.get('/api/orders');
        expect(res.status).toBe(200);
    });

    it('should call api POST /api/orders success', async () => {
        const testProduct: Omit<Product, 'id'> = {
            name: 'Laptop',
            price: 1000,
        };

        const resProduct = await request
            .post('/api/products')
            .send(testProduct)
            .set('Authorization', 'bearer ' + token);
        const productId = resProduct.body.id;
        const testOrder = {
            products: [
                {
                    product_id: productId,
                    quantity: 5,
                },
            ],
            status: true,
            user_id: userId,
        };

        const res = await request
            .post('/api/orders')
            .send(testOrder)
            .set('Authorization', 'bearer ' + token);
        expect(res.status).toBe(200);

        await request
            .delete(`/api/orders/${res.body.id}`)
            .set('Authorization', 'bearer ' + token);
        await request
            .delete(`/api/products/${productId}`)
            .set('Authorization', 'bearer ' + token);
    });

    it('should call api DELETE /api/orders success', async () => {
        const res = await request
            .delete('/api/orders/1')
            .set('Authorization', 'bearer ' + token);
        expect(res.status).toBe(200);
    });

    it('should call api GET /api/orders/:id success', async () => {
        const res = await request.get('/api/orders/1');
        expect(res.status).toBe(200);
    });

    it('should call api PUT /api/orders/:id success', async () => {
        const updatedOrder = {
            products: [
                {
                    product_id: 1,
                    quantity: 5,
                },
            ],
            status: true,
            user_id: userId,
        };
        const res = await request
            .put('/api/orders/1')
            .send(updatedOrder)
            .set('Authorization', 'bearer ' + token);
        expect(res.status).toBe(400);
    });
});
