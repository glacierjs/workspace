import type { IncomingMessage } from 'node:http';
import type { Socket } from 'node:net';

import { HttpRequestCookies } from './HttpRequestCookies';
import { HttpRequestHeaders } from './HttpRequestHeaders';
import type { HttpMethod } from '../interfaces/HttpMethod';
import type { HttpVersion } from '../interfaces/HttpVersion';

export class HttpRequest {
  public readonly httpVersion: HttpVersion;
  public readonly complete: boolean;
  public readonly socket: Socket;
  public readonly method: HttpMethod;
  public readonly url: URL;
  public readonly body: Buffer;
  public readonly headers: HttpRequestHeaders;
  public readonly trailers: HttpRequestHeaders;
  public readonly cookies: HttpRequestCookies;

  public constructor(incomingMessage: IncomingMessage, body: Buffer) {
    this.body = body;
    this.httpVersion = incomingMessage.httpVersion as HttpVersion;
    this.complete = incomingMessage.complete;
    this.socket = incomingMessage.socket;
    this.method = incomingMessage.method as HttpMethod;
    this.url = new URL(`http://localhost${incomingMessage.url}`);
    this.headers = new HttpRequestHeaders(incomingMessage.rawHeaders);
    this.trailers = new HttpRequestHeaders(incomingMessage.rawTrailers);
    this.cookies = new HttpRequestCookies(this.headers.get('Cookie'));
  }
}
