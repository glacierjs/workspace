import type { Optional } from '@glacier/utils';

import { HttpResponseCookie } from './HttpResponseCookie';
import type { HttpCookieAttributes } from '../interfaces/HttpCookieAttributes';

export class HttpResponseCookies {
  private readonly cookies: Record<string, HttpResponseCookie>;

  public constructor(cookies: string[]) {
    this.cookies = this.parseCookies(cookies);
  }

  public getCookies(): HttpResponseCookie[] {
    return Object.values(this.cookies);
  }

  public getCookie(name: string): Optional<HttpResponseCookie> {
    return this.cookies[name];
  }

  public setCookie(
    name: string,
    value: string,
    attributes?: HttpCookieAttributes
  ): this {
    this.cookies[name] = new HttpResponseCookie(name, value, attributes);
    return this;
  }

  public deleteCookie(name: string): this {
    delete this.cookies[name];
    return this;
  }

  public toHeader(): string[] {
    return this.getCookies().map((cookie) => cookie.toHeader());
  }

  private parseCookies(cookies: string[]): Record<string, HttpResponseCookie> {
    return cookies
      .flatMap((cookie) => {
        return HttpResponseCookie.fromHeader(cookie);
      })
      .reduce<Record<string, HttpResponseCookie>>((cookies, cookie) => {
        cookies[cookie.name] = cookie;
        return cookies;
      }, {});
  }
}
