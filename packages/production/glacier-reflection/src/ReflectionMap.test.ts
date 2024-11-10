import 'reflect-metadata';
import { ReflectionMap } from './ReflectionMap';

describe('ReflectionMap', () => {
  describe('set', () => {
    it('should set a value for a given key and target', () => {
      class A {}
      const value = new ReflectionMap('T');
      expect(value.get('key', A)).toBeUndefined();
      value.set('key', '{{VALUE}}', A);
      expect(value.get('key', A)).toBe('{{VALUE}}');
    });

    it('should set a value for a given key and method', () => {
      class A {}
      const value = new ReflectionMap('T');
      expect(value.get('key', A, 'getA')).toBeUndefined();
      value.set('key', '{{VALUE}}', A, 'getA');
      expect(value.get('key', A, 'getA')).toBe('{{VALUE}}');
    });

    it('should set an additional value for a given key and target', () => {
      class A {}
      const value = new ReflectionMap('T');
      value.set('key1', '{{VALUE}}', A);
      value.set('key2', '{{VALUE}}', A);
      expect(value.get('key1', A)).toBe('{{VALUE}}');
      expect(value.get('key2', A)).toBe('{{VALUE}}');
    });
  });

  describe('has', () => {
    it('should return false if the given key does not exist for the given target', () => {
      class A {}
      const value = new ReflectionMap('T');
      expect(value.has('key', A)).toBe(false);
    });

    it('should return false if the given key does not exist for the given method', () => {
      class A {}
      const value = new ReflectionMap('T');
      expect(value.has('key', A, 'getA')).toBe(false);
    });

    it('should return true if the given key exists for the given target', () => {
      class A {}
      const value = new ReflectionMap('T');
      value.set('key', '{{VALUE}}', A);
      expect(value.has('key', A)).toBe(true);
    });

    it('should return true if the given key exists for the given method', () => {
      class A {}
      const value = new ReflectionMap('T');
      value.set('key', '{{VALUE}}', A, 'getA');
      expect(value.has('key', A, 'getA')).toBe(true);
    });
  });

  describe('delete', () => {
    it('should delete a given key for a given target', () => {
      class A {}
      const value = new ReflectionMap('T');
      value.set('key', '{{VALUE}}', A);
      expect(value.has('key', A)).toBe(true);
      value.delete('key', A);
      expect(value.has('key', A)).toBe(false);
    });

    it('should delete a given key for a given method', () => {
      class A {}
      const value = new ReflectionMap('T');
      value.set('key', '{{VALUE}}', A, 'getA');
      expect(value.has('key', A, 'getA')).toBe(true);
      value.delete('key', A, 'getA');
      expect(value.has('key', A, 'getA')).toBe(false);
    });
  });
});
