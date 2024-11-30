import type { Optional } from '@glacier/utils';

import { HttpResponseCookieFactory } from './HttpResponseCookieFactory';
import { HttpStatusCode } from '../interfaces/HttpStatusCode';

export class HttpResponseFactory extends HttpResponseCookieFactory {
  private status: HttpStatusCode = HttpStatusCode.OK;
  private body?: Buffer;

  public static build(): HttpResponseFactory {
    return new HttpResponseFactory();
  }

  public setStatus(status: HttpStatusCode): this {
    this.status = status;
    return this;
  }

  public getStatus(): HttpStatusCode {
    return this.status;
  }

  public deleteBody(): this {
    this.body = undefined;
    return this;
  }

  public getBody(): Optional<Buffer> {
    return this.body;
  }

  public setBody(body: Buffer): this {
    this.body = body;
    return this;
  }
}
