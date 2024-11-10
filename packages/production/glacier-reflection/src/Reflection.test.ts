import 'reflect-metadata';
import { Reflection } from './Reflection';

describe('Reflection', () => {
  describe('set', () => {
    it('should set metadata to the given target', () => {
      class A {}
      const value = new Reflection('T');
      expect(value.get(A)).toBeUndefined();
      value.set('{{TEST}}', A);
      expect(value.get(A)).toBe('{{TEST}}');
    });

    it('should set metadata to the given method', () => {
      class A {}
      const value = new Reflection('T');
      expect(value.get(A, 'getA')).toBeUndefined();
      value.set('{{TEST}}', A, 'getA');
      expect(value.get(A, 'getA')).toBe('{{TEST}}');
    });
  });

  describe('delete', () => {
    it('should delete the metadata of a target', () => {
      class A {}
      const value = new Reflection('T');
      value.set('{{TEST}}', A);
      expect(value.get(A)).toBe('{{TEST}}');
      value.delete(A);
      expect(value.get(A)).toBeUndefined();
    });

    it('should delete the metadata of a method', () => {
      class A {}
      const value = new Reflection('T');
      value.set('{{TEST}}', A, 'getA');
      expect(value.get(A, 'getA')).toBe('{{TEST}}');
      value.delete(A, 'getA');
      expect(value.get(A, 'getA')).toBeUndefined();
    });
  });
});
