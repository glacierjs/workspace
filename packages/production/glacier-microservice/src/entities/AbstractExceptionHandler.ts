import type { HttpRequest, HttpResponse } from '@glacier/http';

import type { ExceptionHandler } from '../interfaces/ExceptionHandler';

export abstract class AbstractExceptionHandler implements ExceptionHandler {
  public abstract respond(
    req: HttpRequest,
    error: Error
  ): Promise<HttpResponse>;
}
