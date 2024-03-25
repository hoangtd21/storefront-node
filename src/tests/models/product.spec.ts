import { Product, ProductStore } from '../../models/product';

const store = new ProductStore();

describe('Product model', () => {
    const testProduct: Omit<Product, 'id'> = {
        name: 'Laptop',
        price: 1000,
    };

    it('Should have index method', () => {
        expect(store.index).toBeDefined();
    });

    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result).toEqual([]);
    });

    it('Should have create product method', () => {
        expect(store.create).toBeDefined();
    });

    it('Should create product', async () => {
        const createdProduct = await store.create(testProduct);
        expect(createdProduct).toEqual({
            id: createdProduct.id,
            ...testProduct,
        });
        await store.delete(createdProduct.id as number);
    });

    it('Should have delete product method', async () => {
        expect(store.delete).toBeDefined();
    });

    it('Should delete product', async () => {
        const createdProduct = await store.create(testProduct);
        expect(createdProduct).toEqual({
            id: createdProduct.id,
            ...testProduct,
        });
        await store.delete(createdProduct.id as number);
        expect(await store.index()).toEqual([]);
    });

    it('Should have get product by id method', () => {
        expect(store.getById).toBeDefined();
    });

    it('Should have update product by id method', () => {
        expect(store.update).toBeDefined();
    });

    it('Should update product', async () => {
        const createdProduct = await store.create(testProduct);
        expect(createdProduct).toEqual({
            id: createdProduct.id,
            ...testProduct,
        });
        const updatedProduct = {
            ...testProduct,
            name: 'Laptop new',
            price: 1500,
        };
        const product = await store.update(
            createdProduct.id as number,
            updatedProduct,
        );
        expect(updatedProduct.name).toEqual(product.name);
        expect(updatedProduct.price).toEqual(product.price);
        await store.delete(createdProduct.id as number);
    });
});
