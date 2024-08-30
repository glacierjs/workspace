import { Readable } from 'node:stream';

import { streamToBuffer } from './streamToBuffer';

describe('streamToBuffer', () => {
  it('should return the content of the stream as a Buffer', async () => {
    const stream = new Readable();
    stream.push('A');
    stream.push('B');
    stream.push(null);
    const result = await streamToBuffer(stream);
    expect(result.toString()).toBe('AB');
  });

  it('should reject the promise if an error occurred', async () => {
    const error = new Error('Test');
    await expect(async () => {
      const stream = new Readable();
      stream.destroy(error);
      return streamToBuffer(stream);
    }).rejects.toBe(error);
  });
});
