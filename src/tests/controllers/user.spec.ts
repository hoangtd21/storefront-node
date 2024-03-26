import supertest from 'supertest';
import app from '../..';

const request = supertest(app);

describe('User controller', () => {
    it('should call api GET /api/users success', async () => {
        const res = await request.get('/api/users');
        expect(res.status).toBe(200);
    });
});
