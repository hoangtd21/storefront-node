import supertest from 'supertest';
import app from '../..';

const request = supertest(app);

describe('Order controller', () => {
    it('should call api GET /api/orders success', async () => {
        const res = await request.get('/api/orders');
        expect(res.status).toBe(200);
    });
});
