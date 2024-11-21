import { streamToBuffer } from '@glacier/utils';
import type { RequestListener } from 'node:http';

import type { HttpRequestHandler } from './interfaces/HttpRequestHandler';
import { HttpRequest } from './models/HttpRequest';

export function createRequestListener(handler: HttpRequestHandler): RequestListener {
  return (req, res) => {
    void (async () => {
      const requestBody = await streamToBuffer(req);
      const httpRequest = new HttpRequest(req, requestBody);
      const httpResponse = await handler(httpRequest);
      httpResponse.applyResponse(res);
    })();
  };
}
