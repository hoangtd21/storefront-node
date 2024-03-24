import { ProductStore } from '../../models/product';

const store = new ProductStore();

describe('Product model', () => {
    it('Should have index method', () => {
        expect(store.index).toBeDefined();
    });

    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result).toEqual([]);
    });
});
