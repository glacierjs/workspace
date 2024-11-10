import { HttpRequestCookie } from './HttpRequestCookie';
import { HttpRequestCookies } from './HttpRequestCookies';
import { HttpRequestHeaders } from './HttpRequestHeaders';

describe('HttpRequestCookies', () => {
  it('should parse multiple cookies out of multiple headers', () => {
    const cookies = new HttpRequestCookies(['a=1;b=2', 'c=3', 'd=4']);
    expect(cookies.has('a')).toBe(true);
    expect(cookies.has('b')).toBe(true);
    expect(cookies.has('c')).toBe(true);
    expect(cookies.has('d')).toBe(true);
  });

  describe('get', () => {
    it('should return undefined if a given cookie is not stored in HttpRequestCookies', () => {
      const cookies = new HttpRequestCookies([]);
      expect(cookies.get('test')).toBeUndefined();
    });

    it('should return the cookie if a given cookie is  stored in HttpRequestCookies', () => {
      const cookies = new HttpRequestCookies(['a=b']);
      expect(cookies.get('a')).toBeInstanceOf(HttpRequestCookie);
    });
  });

  describe('has', () => {
    it('should return true if a given cookie is stored in HttpRequestCookies', () => {
      const cookies = new HttpRequestCookies(['a=b']);
      expect(cookies.has('a')).toBe(true);
    });

    it('should return true false a given cookie is not stored in HttpRequestCookies', () => {
      const cookies = new HttpRequestCookies([]);
      expect(cookies.has('a')).toBe(false);
    });
  });

  describe('getAll', () => {
    it('should return the raw headers', () => {
      const rawHeaders = ['a', 'b'];
      const headers = new HttpRequestHeaders(rawHeaders);
      expect(headers.getAll()).toEqual({ a: ['b'] });
    });
  });
});
