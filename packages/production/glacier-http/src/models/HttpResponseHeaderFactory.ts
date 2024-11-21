import type { AnyString, Optional } from '@glacier/utils';

import type { HttpResponseHeaders } from '../interfaces/HttpResponseHeader';

export class HttpResponseHeaderFactory {
  private readonly headers = new Map<AnyString<`${HttpResponseHeaders}`>, string[]>();

  public hasHeader(name: string): boolean {
    return this.headers.has(name);
  }

  public getHeader(name: string): Optional<string[]> {
    return this.headers.get(name);
  }

  public getHeaders(): Record<AnyString<`${HttpResponseHeaders}`>, string[]> {
    return Object.fromEntries(this.headers.entries()) as Record<
      AnyString<`${HttpResponseHeaders}`>,
      string[]
    >;
  }

  public addHeader(name: AnyString<`${HttpResponseHeaders}`>, value: string | string[]): this {
    if (!this.headers.has(name)) {
      return this.setHeader(name, value);
    }
    const header = this.headers.get(name)!;
    if (Array.isArray(value)) {
      header.push(...value);
    } else {
      header.push(value);
    }
    return this;
  }

  public setHeader(name: AnyString<`${HttpResponseHeaders}`>, value: string | string[]): this {
    if (Array.isArray(value)) {
      this.headers.set(name, value);
    } else {
      this.headers.set(name, [value]);
    }
    return this;
  }
}
