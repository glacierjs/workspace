import { HttpResponseCookie } from './HttpResponseCookie';
import { HttpResponseCookieFactory } from './HttpResponseCookieFactory';

describe('HttpResponseCookieFactory', () => {
  describe('getCookie', () => {
    it('should return undefined if Set-Cookie header does not exist', () => {
      const instance = new HttpResponseCookieFactory();
      expect(instance.getCookie('a')).toBeUndefined();
    });

    it('should return undefined if cookie does not exist', () => {
      const instance = new HttpResponseCookieFactory();
      instance.setCookie('a', 'b');
      expect(instance.getCookie('x')).toBeUndefined();
    });

    it('should return HttpResponseCookie', () => {
      const instance = new HttpResponseCookieFactory();
      instance.setCookie('a', 'b');
      expect(instance.getCookie('a')).toBeInstanceOf(HttpResponseCookie);
    });
  });

  describe('getCookies', () => {
    it('should return undefined if Set-Cookie header does not exist', () => {
      const instance = new HttpResponseCookieFactory();
      expect(instance.getCookies()).toEqual([]);
    });

    it('should return an array of HttpResponseCookies', () => {
      const instance = new HttpResponseCookieFactory();
      instance.setCookie('a', 'b');
      expect(instance.getCookies()).toEqual([expect.any(HttpResponseCookie)]);
    });
  });

  describe('setCookie', () => {
    it('should add the first cookie', () => {
      const instance = new HttpResponseCookieFactory();
      instance.setCookie('a', 'b');
      expect(instance.getCookie('a')).toBeInstanceOf(HttpResponseCookie);
    });

    it('should add multiple cookies', () => {
      const instance = new HttpResponseCookieFactory();
      instance.setCookie('a', '1');
      instance.setCookie('b', '2');
      expect(instance.getCookie('a')).toBeInstanceOf(HttpResponseCookie);
      expect(instance.getCookie('b')).toBeInstanceOf(HttpResponseCookie);
    });
  });

  describe('hasCookie', () => {
    it('should return true if cookie exists', () => {
      const instance = new HttpResponseCookieFactory();
      instance.setCookie('a', 'b');
      expect(instance.hasCookie('a')).toBe(true);
    });

    it('should return false if cookie does not exists', () => {
      const instance = new HttpResponseCookieFactory();
      instance.setCookie('a', 'b');
      expect(instance.hasCookie('x')).toBe(false);
    });
  });

  describe('deleteCookie', () => {
    it('should not fail if cookie does not exist', () => {
      const instance = new HttpResponseCookieFactory();
      expect(() => instance.deleteCookie('a')).not.toThrow();
    });

    it('should remove cookie if it exists', () => {
      const instance = new HttpResponseCookieFactory();
      instance.setCookie('a', 'b');
      expect(instance.hasCookie('a')).toBe(true);
      instance.deleteCookie('a');
      expect(instance.hasCookie('x')).toBe(false);
    });
  });
});
