import type { HttpMethod, HttpRequestHeader } from '@glacier/http';
import type { AnyString } from '@glacier/types';

export interface RouteRequest {
  method: HttpMethod;
  path: string;
  headers: { [key in AnyString<`${HttpRequestHeader}`>]?: string | string[] };
}
