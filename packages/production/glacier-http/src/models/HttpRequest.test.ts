import { HttpRequest } from './HttpRequest';
import { HttpRequestCookies } from './HttpRequestCookies';
import { HttpRequestHeaders } from './HttpRequestHeaders';
import { createIncomingMessageMock } from '../../test/mocks/createIncomingMessageMock';

describe('HttpRequest', () => {
  it('should transform an IncomingMessage', () => {
    const body = Buffer.from('X');
    const incomingMessage = createIncomingMessageMock();
    const instance = new HttpRequest(incomingMessage, body);
    expect(instance.httpVersion).toBe('{{HTTP_VERSION}}');
    expect(instance.complete).toBe(true);
    expect(instance.socket).toBe('{{SOCKET}}');
    expect(instance.method).toBe('GET');
    expect(instance.url).toBeInstanceOf(URL);
    expect(instance.body).toBe(body);
    expect(instance.headers).toBeInstanceOf(HttpRequestHeaders);
    expect(instance.trailers).toBeInstanceOf(HttpRequestHeaders);
    expect(instance.cookies).toBeInstanceOf(HttpRequestCookies);
  });
});
