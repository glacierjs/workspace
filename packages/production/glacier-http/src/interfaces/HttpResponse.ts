import type { Optional, AnyString } from '@glacier/utils';

import type { HttpResponseHeaders } from './HttpResponseHeader';
import type { HttpStatusCode } from './HttpStatusCode';
import type { HttpResponseCookie } from '../models/HttpResponseCookie';

export interface HttpResponse<B = Optional<Buffer>> {
  getStatus: () => HttpStatusCode;
  getBody: () => B;
  getCookie: (name: string) => Optional<HttpResponseCookie>;
  getCookies: () => HttpResponseCookie[];
  hasHeader: (name: string) => boolean;
  getHeader: (name: string) => Optional<string[]>;
  getHeaders: () => Record<AnyString<`${HttpResponseHeaders}`>, string[]>;
}
