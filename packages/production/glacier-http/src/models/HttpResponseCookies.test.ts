import { HttpResponseCookie } from './HttpResponseCookie';
import { HttpResponseCookies } from './HttpResponseCookies';

describe('HttpResponseCookies', () => {
  describe('getCookies', () => {
    it('should return an empty list if no cookie is defined', () => {
      const instance = new HttpResponseCookies([]);
      expect(instance.getCookies()).toEqual([]);
    });

    it('should return all cookies', () => {
      const instance = new HttpResponseCookies(['a=b']);
      expect(instance.getCookies()).toEqual([expect.any(HttpResponseCookie)]);
    });
  });

  describe('getCookie', () => {
    it('should return undefined if cookie does not exist', () => {
      const instance = new HttpResponseCookies([]);
      expect(instance.getCookie('a')).toBeUndefined();
    });

    it('should return cookie if it exists', () => {
      const instance = new HttpResponseCookies(['a=b']);
      expect(instance.getCookie('a')).toBeInstanceOf(HttpResponseCookie);
    });
  });

  describe('setCookie', () => {
    it('should set a new cookie', () => {
      const instance = new HttpResponseCookies([]);
      expect(instance.getCookie('a')).toBeUndefined();
      instance.setCookie('a', 'b');
      expect(instance.getCookie('a')).toBeInstanceOf(HttpResponseCookie);
    });
  });

  describe('deleteCookie', () => {
    it('should delete a cookie', () => {
      const instance = new HttpResponseCookies([]);
      instance.setCookie('a', 'b');
      expect(instance.getCookie('a')).toBeInstanceOf(HttpResponseCookie);
      instance.deleteCookie('a');
      expect(instance.getCookie('a')).toBeUndefined();
    });
  });

  describe('toHeader', () => {
    it('should convert cookies to header', () => {
      const instance = new HttpResponseCookies([]);
      instance.setCookie('a', 'b');
      expect(instance.toHeader()).toEqual(['a=b']);
    });
  });
});
