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
});
