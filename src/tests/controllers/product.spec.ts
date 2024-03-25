import supertest from 'supertest';
import app from '../..';

const request = supertest(app);

describe('Product controller', () => {
    it('should call api GET /api/products success', async () => {
        const res = await request.get('/api/products');
        expect(res.status).toBe(200);
    });
});
