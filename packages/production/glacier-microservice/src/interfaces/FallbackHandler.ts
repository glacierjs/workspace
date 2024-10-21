import { HttpRequest, HttpResponse } from '@glacier/http';

export interface FallbackHandler {
  respond(req: HttpRequest): Promise<HttpResponse>;
}
