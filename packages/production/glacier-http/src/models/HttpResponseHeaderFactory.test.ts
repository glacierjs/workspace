import { HttpResponseHeaderFactory } from './HttpResponseHeaderFactory';

describe('HttpResponseHeaderFactory', () => {
  describe('hasHeader', () => {
    it('should return false if header does not exist', () => {
      const instance = new HttpResponseHeaderFactory();
      expect(instance.hasHeader('a')).toBe(false);
    });

    it('should return true if header exists', () => {
      const instance = new HttpResponseHeaderFactory();
      instance.setHeader('a', 'b');
      expect(instance.hasHeader('a')).toBe(true);
    });
  });

  describe('getHeader', () => {
    it('should return undefined if header does not exist', () => {
      const instance = new HttpResponseHeaderFactory();
      expect(instance.getHeader('a')).toBeUndefined();
    });

    it('should return header if header exists', () => {
      const instance = new HttpResponseHeaderFactory();
      instance.setHeader('a', 'b');
      expect(instance.getHeader('a')).toEqual(['b']);
    });
  });

  describe('getHeaders', () => {
    it('should return a Record of headers', () => {
      const instance = new HttpResponseHeaderFactory();
      instance.setHeader('a', 'b');
      expect(instance.getHeaders()).toEqual({
        a: ['b']
      });
    });
  });

  describe('addHeader', () => {
    it('should add a new header', () => {
      const instance = new HttpResponseHeaderFactory();
      instance.addHeader('a', 'b');
      expect(instance.getHeader('a')).toEqual(['b']);
    });

    it('should append primitive value to a header', () => {
      const instance = new HttpResponseHeaderFactory();
      instance.addHeader('a', 'b');
      instance.addHeader('a', 'c');
      expect(instance.getHeader('a')).toEqual(['b', 'c']);
    });

    it('should append array value to a header', () => {
      const instance = new HttpResponseHeaderFactory();
      instance.addHeader('a', 'b');
      instance.addHeader('a', ['c', 'd']);
      expect(instance.getHeader('a')).toEqual(['b', 'c', 'd']);
    });
  });

  describe('setHeader', () => {
    it('should override a header', () => {
      const instance = new HttpResponseHeaderFactory();
      instance.setHeader('a', 'b');
      expect(instance.getHeader('a')).toEqual(['b']);
      instance.setHeader('a', ['c']);
      expect(instance.getHeader('a')).toEqual(['c']);
    });
  });
});
