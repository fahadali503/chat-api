import { Users } from './user.schema';

describe('Users', () => {
  it('should be defined', () => {
    expect(new Users()).toBeDefined();
  });
});
