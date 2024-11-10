import type { ServerResponse } from 'node:http';

export function createServiceResponseMock(): ServerResponse {
  return {
    setHeader: jest.fn(),
    write: jest.fn(),
    end: jest.fn()
  } as unknown as ServerResponse;
}
