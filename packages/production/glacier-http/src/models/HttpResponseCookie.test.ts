import { HttpResponseCookie } from './HttpResponseCookie';

describe('HttpResponseCookie', () => {
  it('should set attributes to an empty object by default', () => {
    const instance = new HttpResponseCookie('a', 'b');
    expect(instance.attributes).toEqual({});
  });

  describe('fromHeader', () => {
    it('should parse a simple header without attributes', () => {
      const header = HttpResponseCookie.fromHeader('a=b');
      expect(header[0].name).toBe('a');
      expect(header[0].value).toBe('b');
    });

    it('should detect HttpOnly attribute', () => {
      const header = HttpResponseCookie.fromHeader('a=b; HttpOnly');
      expect(header[0].attributes.httpOnly).toBe(true);
    });

    it('should detect Partitioned attribute', () => {
      const header = HttpResponseCookie.fromHeader('a=b; Partitioned');
      expect(header[0].attributes.partitioned).toBe(true);
    });

    it('should detect Secure attribute', () => {
      const header = HttpResponseCookie.fromHeader('a=b; Secure');
      expect(header[0].attributes.secure).toBe(true);
    });

    it('should detect Path attribute', () => {
      const header = HttpResponseCookie.fromHeader('a=b; Path=/a/b');
      expect(header[0].attributes.path).toBe('/a/b');
    });

    it('should detect Max-Age attribute', () => {
      const header = HttpResponseCookie.fromHeader('a=b; Max-Age=1000');
      expect(header[0].attributes.maxAge).toBe(1000);
    });

    it('should detect Domain attribute', () => {
      const header = HttpResponseCookie.fromHeader('a=b; Domain=/a/b');
      expect(header[0].attributes.domain).toBe('/a/b');
    });

    it('should detect Same-Site attribute', () => {
      const header = HttpResponseCookie.fromHeader('a=b; Same-Site=Strict');
      expect(header[0].attributes.sameSite).toBe('Strict');
    });

    it('should detect Expires attribute', () => {
      const header = HttpResponseCookie.fromHeader(
        'a=b; Expires=Sun, 10 Nov 2024 10:33:53 GMT'
      );
      expect(header[0].attributes.expires).toEqual(
        new Date('2024-11-10T10:33:53.000Z')
      );
    });
  });

  describe('toHeader', () => {
    it('should convert a simple header without attributes', () => {
      const inputHeader = 'a=b';
      const header = HttpResponseCookie.fromHeader(inputHeader);
      expect(header[0].toHeader()).toBe(inputHeader);
    });

    it('should detect HttpOnly attribute', () => {
      const inputHeader = 'a=b; HttpOnly';
      const header = HttpResponseCookie.fromHeader(inputHeader);
      expect(header[0].toHeader()).toBe(inputHeader);
    });

    it('should detect Partitioned attribute', () => {
      const inputHeader = 'a=b; Partitioned';
      const header = HttpResponseCookie.fromHeader(inputHeader);
      expect(header[0].toHeader()).toBe(inputHeader);
    });

    it('should detect Secure attribute', () => {
      const inputHeader = 'a=b; Secure';
      const header = HttpResponseCookie.fromHeader(inputHeader);
      expect(header[0].toHeader()).toBe(inputHeader);
    });

    it('should detect Path attribute', () => {
      const inputHeader = 'a=b; Path=/a/b';
      const header = HttpResponseCookie.fromHeader(inputHeader);
      expect(header[0].toHeader()).toBe(inputHeader);
    });

    it('should detect Max-Age attribute', () => {
      const inputHeader = 'a=b; Max-Age=1000';
      const header = HttpResponseCookie.fromHeader(inputHeader);
      expect(header[0].toHeader()).toBe(inputHeader);
    });

    it('should detect Domain attribute', () => {
      const inputHeader = 'a=b; Domain=/a/b';
      const header = HttpResponseCookie.fromHeader(inputHeader);
      expect(header[0].toHeader()).toBe(inputHeader);
    });

    it('should detect Same-Site attribute', () => {
      const inputHeader = 'a=b; Same-Site=Strict';
      const header = HttpResponseCookie.fromHeader(inputHeader);
      expect(header[0].toHeader()).toBe(inputHeader);
    });

    it('should detect Expires attribute', () => {
      const inputHeader = 'a=b; Expires=Sun, 10 Nov 2024 10:33:53 GMT';
      const header = HttpResponseCookie.fromHeader(inputHeader);
      expect(header[0].toHeader()).toBe(inputHeader);
    });
  });
});
