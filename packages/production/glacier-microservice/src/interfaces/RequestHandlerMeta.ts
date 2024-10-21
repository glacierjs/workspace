import { HttpMethod } from '@glacier/http';

export interface RequestHandlerMeta {
  method: HttpMethod;
  path?: string;
}
