import { createServer } from 'node:http';
import request from 'supertest';

import { createRequestListener } from './createRequestListener';
import { HttpResponse } from './models/HttpResponse';

describe('createRequestListener', () => {
  it('should return a basic 200 with no content or header', async () => {
    const requestHandler = createRequestListener(() => {
      return HttpResponse.build().setStatus(200);
    });
    const server = createServer(requestHandler);
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
  });

  it('should return a basic 200 with content but no header', async () => {
    const body = Buffer.from('TEST');
    const requestHandler = createRequestListener(() => {
      return HttpResponse.build().setStatus(200).setBody(body);
    });
    const server = createServer(requestHandler);
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toEqual('TEST');
  });

  it('should return a basic 200 with content and headers', async () => {
    const body = Buffer.from('TEST');
    const requestHandler = createRequestListener(() => {
      return HttpResponse.build().setStatus(200).setBody(body).addHeader('X-Test', '1234');
    });
    const server = createServer(requestHandler);
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toEqual('TEST');
    expect(response.headers['x-test']).toEqual('1234');
  });

  it('should return a basic 200 with content and cookies', async () => {
    const requestHandler = createRequestListener(() => {
      return HttpResponse.build().setStatus(200).setCookie('a', 'b');
    });
    const server = createServer(requestHandler);
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
    expect(response.headers['set-cookie']).toEqual(['a=b']);
  });
});
