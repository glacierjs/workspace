import type { Optional } from '@glacier/types';

import { HttpResponseCookie } from './HttpResponseCookie';
import type { HttpCookieAttributes } from '../interfaces/HttpCookieAttributes';

export class HttpResponseCookies {
  private readonly cookies: HttpResponseCookie[];

  public constructor(cookies: string[]) {
    this.cookies = this.parseCookies(cookies);
  }

  public getCookies(): HttpResponseCookie[] {
    return [...this.cookies];
  }

  public getCookie(name: string): Optional<HttpResponseCookie> {
    return this.cookies.find((cookie) => cookie.name === name);
  }

  public setCookie(
    name: string,
    value: string,
    attributes: HttpCookieAttributes = {}
  ): this {
    this.deleteCookie(name);
    this.cookies.push(new HttpResponseCookie(name, value, attributes));
    return this;
  }

  public deleteCookie(name: string): this {
    const cookieIndex = this.cookies.findIndex(
      (cookie) => cookie.name === name
    );
    this.cookies.splice(cookieIndex, 1);
    return this;
  }

  public toHeader(): string[] {
    return this.cookies.map((cookie) => cookie.toHeader());
  }

  private parseCookies(cookies: string[]): HttpResponseCookie[] {
    return cookies.flatMap((cookie) => {
      return HttpResponseCookie.fromHeader(cookie);
    });
  }
}
