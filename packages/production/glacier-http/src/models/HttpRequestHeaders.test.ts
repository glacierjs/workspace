import { HttpRequestHeaders } from './HttpRequestHeaders';

describe('HttpRequestHeaders', () => {
  it('should merge same headers', () => {
    const rawHeaders = ['a', '1', 'a', '2'];
    const headers = new HttpRequestHeaders(rawHeaders);
    expect(headers.get('a')).toEqual(['1', '2']);
  });

  describe('get', () => {
    it('should return the headers values', () => {
      const rawHeaders = ['a', 'b'];
      const headers = new HttpRequestHeaders(rawHeaders);
      expect(headers.get('a')).toEqual(['b']);
    });

    it('should return undefined if the header does not exist', () => {
      const headers = new HttpRequestHeaders([]);
      expect(headers.get('a')).toBeUndefined();
    });
  });

  describe('has', () => {
    it('should return true if header exists', () => {
      const rawHeaders = ['a', 'b'];
      const headers = new HttpRequestHeaders(rawHeaders);
      expect(headers.has('a')).toBe(true);
    });

    it('should return false if header does not exists', () => {
      const rawHeaders = ['a', 'b'];
      const headers = new HttpRequestHeaders(rawHeaders);
      expect(headers.has('x')).toBe(false);
    });
  });
});
