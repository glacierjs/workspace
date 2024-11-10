import { HttpRequestCookie } from './HttpRequestCookie';

describe('HttpRequestCookie', () => {
  describe('fromHeader', () => {
    it('should transform a cookie header to an array of HttpRequestCookies', () => {
      const cookieHeader = 'a=1;b=2';
      const cookies = HttpRequestCookie.fromHeader(cookieHeader);
      expect(cookies).toHaveLength(2);
      expect(cookies[0].name).toBe('a');
      expect(cookies[0].value).toBe('1');
      expect(cookies[1].name).toBe('b');
      expect(cookies[1].value).toBe('2');
    });
  });
});
