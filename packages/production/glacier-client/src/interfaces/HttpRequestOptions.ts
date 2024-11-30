import type { HttpMethod } from '@glacier/http';
import type { OutgoingHttpHeaders } from 'node:http';

export interface HttpRequestOptions {
  method: HttpMethod;
  path: string;
  headers?: OutgoingHttpHeaders;
  params?: Record<string, string | number>;
  timeout?: number;
  data?: unknown;
}
