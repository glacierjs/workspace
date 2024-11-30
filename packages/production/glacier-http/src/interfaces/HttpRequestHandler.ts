import type { HttpResponse } from './HttpResponse';
import type { HttpRequest } from '../models/HttpRequest';

export type HttpRequestHandler = (req: HttpRequest) => HttpResponse | Promise<HttpResponse>;
