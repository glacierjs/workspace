import type { HttpRequest, HttpResponse } from '@glacier/http';

import type { FallbackHandler } from '../interfaces/FallbackHandler';

export abstract class AbstractFallbackHandler implements FallbackHandler {
  public abstract respond(req: HttpRequest): Promise<HttpResponse>;
}
