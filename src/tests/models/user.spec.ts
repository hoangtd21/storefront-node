import { UserStore } from '../../models/user';

const store = new UserStore();

describe('User model', () => {
    it('Should have index method', () => {
        expect(store.index).toBeDefined();
    });

    it('index method should return a list of users', async () => {
        const result = await store.index();
        expect(result).toEqual([]);
    });

    it('Should have create method', () => {
        expect(store.create).toBeDefined();
    });

    it('Should have delete method', () => {
        expect(store.delete).toBeDefined();
    });

    it('Should have getById method', () => {
        expect(store.getById).toBeDefined();
    });

    it('Should have authenicate method', () => {
        expect(store.authenicate).toBeDefined();
    });
});
