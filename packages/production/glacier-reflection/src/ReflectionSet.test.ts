import 'reflect-metadata';
import { ReflectionSet } from './ReflectionSet';

describe('ReflectionSet', () => {
  describe('add', () => {
    it('should add a new value', () => {
      class A {}
      const set = new ReflectionSet<string>('T');
      expect(set.has('X', A)).toBe(false);
      set.add('X', A);
      expect(set.has('X', A)).toBe(true);
    });
  });

  describe('getAll', () => {
    it('should return an array of all set values', () => {
      class A {}
      const set = new ReflectionSet<string>('T');
      set.add('X', A);
      set.add('Y', A);
      expect(set.getAll(A)).toEqual(['X', 'Y']);
    });

    it('should return an empty array if no values exist', () => {
      class A {}
      const set = new ReflectionSet<string>('T');
      expect(set.getAll(A)).toEqual([]);
    });
  });
});
