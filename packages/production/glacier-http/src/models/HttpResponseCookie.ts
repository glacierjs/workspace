import { HttpRequestCookie } from './HttpRequestCookie';
import type { HttpCookieAttributes } from '../interfaces/HttpCookieAttributes';
import type { HttpSameSite } from '../interfaces/HttpSameSite';

export class HttpResponseCookie extends HttpRequestCookie {
  public readonly attributes: HttpCookieAttributes;

  public constructor(
    name: string,
    value: string,
    attributes: HttpCookieAttributes = {}
  ) {
    super(name, value);
    this.attributes = attributes;
  }

  public static fromHeader(header: string): [HttpResponseCookie] {
    const attributes = header.split(';').map((attr) => attr.trim());
    const [name, value] = attributes.shift()!.split('=');
    const cookieAttributes: HttpCookieAttributes = {};

    for (const attribute of attributes) {
      const [key, val] = attribute.split('=');
      const trimmedKey = key.trim();

      switch (trimmedKey) {
        case 'HttpOnly': {
          cookieAttributes.httpOnly = true;
          break;
        }
        case 'Partitioned': {
          cookieAttributes.partitioned = true;
          break;
        }
        case 'Secure': {
          cookieAttributes.secure = true;
          break;
        }
        case 'Path': {
          cookieAttributes.path = val;
          break;
        }
        case 'Max-Age': {
          cookieAttributes.maxAge = Number.parseInt(val, 10);
          break;
        }
        case 'Domain': {
          cookieAttributes.domain = val;
          break;
        }
        case 'Same-Site': {
          cookieAttributes.sameSite = val as HttpSameSite;
          break;
        }
        case 'Expires': {
          cookieAttributes.expires = new Date(val);
          break;
        }
      }
    }

    return [new HttpResponseCookie(name, value, cookieAttributes)];
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  public toHeader(): string {
    const attrStrings = [
      this.attributes.httpOnly && 'HttpOnly',
      this.attributes.partitioned && 'Partitioned',
      this.attributes.secure && 'Secure',
      this.attributes.path && `Path=${this.attributes.path}`,
      typeof this.attributes.maxAge === 'number' &&
        `Max-Age=${this.attributes.maxAge}`,
      this.attributes.domain && `Domain=${this.attributes.domain}`,
      this.attributes.sameSite && `Same-Site=${this.attributes.sameSite}`,
      this.attributes.expires &&
        `Expires=${this.attributes.expires.toUTCString()}`
    ];

    return [`${this.name}=${this.value}`, ...attrStrings]
      .filter(Boolean)
      .join('; ');
  }
}
