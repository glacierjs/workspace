import { HttpRequest, HttpResponse } from '@glacier/http';

export interface ExceptionHandler {
  respond(req: HttpRequest, error: Error): Promise<HttpResponse>;
}
