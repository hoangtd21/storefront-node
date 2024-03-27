import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import app from '../..';
import { Product } from '../../models/product';

const request = supertest(app);

interface UserInformation {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    password_digest: string;
}

export interface UserJwt {
    user: UserInformation;
}

describe('Product controller', () => {
    let token: string;
    let userId: number;
    const testProduct: Omit<Product, 'id'> = {
        name: 'Laptop',
        price: 1000,
    };

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
    it('should call api GET /api/products success', async () => {
        const res = await request.get('/api/products');
        expect(res.status).toBe(200);
    });

    it('should call api POST /api/products success', async () => {
        const res = await request
            .post('/api/products')
            .send(testProduct)
            .set('Authorization', 'bearer ' + token);
        const productId = res.body.id;
        expect(res.status).toBe(200);
        await request
            .delete(`/api/products/${productId}`)
            .set('Authorization', 'bearer ' + token);
    });

    it('should call api DELETE /api/products/:id success', async () => {
        const res = await request
            .post('/api/products')
            .send(testProduct)
            .set('Authorization', 'bearer ' + token);
        const productId = res.body.id;

        const resDeleted = await request
            .delete(`/api/products/${productId}`)
            .set('Authorization', 'bearer ' + token);
        expect(resDeleted.status).toBe(200);
    });

    it('should call api GET /api/products/:id success', async () => {
        const res = await request
            .post('/api/products')
            .send(testProduct)
            .set('Authorization', 'bearer ' + token);
        const productId = res.body.id;

        const resProduct = await request
            .get(`/api/products/${productId}`)
            .set('Authorization', 'bearer ' + token);
        expect(resProduct.status).toBe(200);
        expect(resProduct.body.name).toEqual('Laptop');
        expect(resProduct.body.price).toEqual(1000);

        await request
            .delete(`/api/products/${productId}`)
            .set('Authorization', 'bearer ' + token);
    });

    it('should call api PUT /api/products/:id success', async () => {
        const res = await request
            .post('/api/products')
            .send(testProduct)
            .set('Authorization', 'bearer ' + token);
        const productId = res.body.id;

        const updatedProduct = { name: 'Iphone', price: '2000' };
        const resUpdatedProduct = await request
            .put(`/api/products/${productId}`)
            .send(updatedProduct)
            .set('Authorization', 'bearer ' + token);
        expect(resUpdatedProduct.body.name).toEqual('Iphone');
        expect(resUpdatedProduct.body.price).toEqual(2000);

        await request
            .delete(`/api/products/${productId}`)
            .set('Authorization', 'bearer ' + token);
    });
});
