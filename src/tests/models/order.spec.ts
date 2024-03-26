import { OrderStore } from '../../models/order';

const store = new OrderStore();

describe('Order model', () => {
    it('Should have index method', () => {
        expect(store.index).toBeDefined();
    });

    it('index method should return a list of orders', async () => {
        const result = await store.index();
        expect(result).toEqual([]);
    });

    it('Should have getOrderProducts method', () => {
        expect(store.getOrderProducts).toBeDefined();
    });

    it('Should have create method', () => {
        expect(store.create).toBeDefined();
    });

    it('Should have delete method', () => {
        expect(store.delete).toBeDefined();
    });

    it('Should have index method', () => {
        expect(store.update).toBeDefined();
    });
});
