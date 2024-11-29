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

    it('should return values from parent class', () => {
      class A {}
      class B extends A {}
      const set = new ReflectionSet<string>('T');
      set.add('A', A);
      set.add('B', B);
      expect(set.getAll(B)).toEqual(['B', 'A']);
    });

    it('should not return values from different child class', () => {
      class A {}
      class B extends A {}
      class C extends A {}
      const set = new ReflectionSet<string>('T');
      set.add('A', A);
      set.add('B', B);
      set.add('C', C);
      expect(set.getAll(B)).toEqual(['B', 'A']);
    });
  });
});
