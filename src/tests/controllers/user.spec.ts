import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import app from '../..';
import { UserJwt } from './product.spec';

const request = supertest(app);

describe('User controller', () => {
    let token: string;
    let userId: number;
    const user = {
        username: 'hoangtd',
        firstname: 'Hoang',
        lastname: 'Tran',
        password: '12345678',
    };

    const handleDeleteAfterAll = async (tokenParam: string) => {
        const { user: userData } = jwt.verify(
            tokenParam,
            process.env.TOKEN_SECRET as string,
        ) as UserJwt;
        userId = userData.id;
        await request
            .delete(`/api/users/${userId}`)
            .set('Authorization', 'bearer ' + tokenParam);
    };

    it('should call api GET /api/users success', async () => {
        const res = await request.get('/api/users');
        expect(res.status).toBe(200);
    });

    it('should call api POST /api/users success', async () => {
        const res = await request.post('/api/users').send(user);
        token = res.text;
        expect(res.status).toBe(200);

        handleDeleteAfterAll(token);
    });

    it('should call api DELETE /api/users/:id success', async () => {
        const res = await request.post('/api/users').send(user);
        token = res.text;
        const { user: userData } = jwt.verify(
            token,
            process.env.TOKEN_SECRET as string,
        ) as UserJwt;
        userId = userData.id;

        const resDeletedUser = await request
            .delete(`/api/users/${userId}`)
            .set('Authorization', 'bearer ' + token);
        expect(resDeletedUser.status).toBe(200);
    });

    it('should call api GET /api/users/:id success', async () => {
        const res = await request.post('/api/users').send(user);
        token = res.text;
        const { user: userData } = jwt.verify(
            token,
            process.env.TOKEN_SECRET as string,
        ) as UserJwt;
        userId = userData.id;

        const resUser = await request
            .get(`/api/users/${userId}`)
            .set('Authorization', 'bearer ' + token);
        expect(resUser.status).toBe(200);
        expect(resUser.body.username).toEqual('hoangtd');
        expect(resUser.body.firstname).toEqual('Hoang');
        handleDeleteAfterAll(token);
    });

    it('should call api PUT /api/users/:id success', async () => {
        const updatedUser = {
            firstname: 'Hoang Duc',
            lastname: 'Tran',
        };
        const resUpdatedUser = await request
            .put(`/api/users/${userId}`)
            .send(updatedUser)
            .set('Authorization', 'bearer ' + token);
        expect(resUpdatedUser.status).toBe(200);
    });
});
