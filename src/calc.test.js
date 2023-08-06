import context from 'jest-plugin-context';

describe('Jest 동작 테스트', () => {
  context('1 + 2는', () => {
    const result = 1 + 2;

    it('3', () => {
      expect(result).toBe(3);
    });
  });
});
