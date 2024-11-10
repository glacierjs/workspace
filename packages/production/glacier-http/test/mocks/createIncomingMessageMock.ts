import type { IncomingMessage } from 'node:http';

export function createIncomingMessageMock(): IncomingMessage {
  return {
    httpVersion: '{{HTTP_VERSION}}',
    complete: true,
    socket: '{{SOCKET}}',
    method: 'GET',
    url: '{{URL}}',
    rawHeaders: [],
    rawTrailers: []
  } as unknown as IncomingMessage;
}
