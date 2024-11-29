import 'reflect-metadata';
import { ReadonlyReflection } from './ReadonlyReflection';

describe('ReadonlyReflection', () => {
  describe('get', () => {
    it('should return the metadata for a given target', () => {
      class A {}
      Reflect.defineMetadata('T', '{{VALUE}}', A);
      const value = new ReadonlyReflection('T');
      expect(value.get(A)).toEqual('{{VALUE}}');
    });

    it('should return the metadata for a given method', () => {
      class A {}
      Reflect.defineMetadata('T', '{{VALUE}}', A, 'getA');
      const value = new ReadonlyReflection('T');
      expect(value.get(A, 'getA')).toEqual('{{VALUE}}');
    });

    it('should return the metadata for an inherited method', () => {
      class A {}
      class B extends A {}
      Reflect.defineMetadata('T', '{{VALUE}}', A, 'getA');
      const value = new ReadonlyReflection('T');
      expect(value.get(B, 'getA')).toEqual('{{VALUE}}');
    });
  });

  describe('getOwn', () => {
    it('should not return the metadata for an inherited method', () => {
      class A {}
      class B extends A {}
      Reflect.defineMetadata('T', '{{VALUE}}', A, 'getA');
      const value = new ReadonlyReflection('T');
      expect(value.getOwn(B, 'getA')).toBeUndefined();
    });
  });

  describe('has', () => {
    it('should return false if no metadata is attached to the target', () => {
      class A {}
      const value = new ReadonlyReflection('T');
      expect(value.has(A)).toBe(false);
    });

    it('should return false if no metadata is attached to the method', () => {
      class A {}
      const value = new ReadonlyReflection('T');
      expect(value.has(A, 'getA')).toBe(false);
    });

    it('should return true if metadata is attached to the target', () => {
      class A {}
      Reflect.defineMetadata('T', '{{VALUE}}', A);
      const value = new ReadonlyReflection('T');
      expect(value.has(A)).toBe(true);
    });

    it('should return true if metadata is attached to the method', () => {
      class A {}
      Reflect.defineMetadata('T', '{{VALUE}}', A, 'getA');
      const value = new ReadonlyReflection('T');
      expect(value.has(A, 'getA')).toBe(true);
    });

    it('should return true if metadata is attached to the parents method', () => {
      class A {}
      class B extends A {}
      Reflect.defineMetadata('T', '{{VALUE}}', A, 'getA');
      const value = new ReadonlyReflection('T');
      expect(value.has(B, 'getA')).toBe(true);
    });
  });

  describe('hasOwn', () => {
    it('should not return true if metadata is attached to the parents method', () => {
      class A {}
      class B extends A {}
      Reflect.defineMetadata('T', '{{VALUE}}', A, 'getA');
      const value = new ReadonlyReflection('T');
      expect(value.hasOwn(B, 'getA')).toBe(false);
    });
  });
});
