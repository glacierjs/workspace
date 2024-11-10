import { globalContext } from '@glacier/context';

import { LogFactory } from '../../src/entities/LogFactory';
import { LogLevel } from '../../src/interfaces/LogLevel';
import { ConsoleTransport } from '../../src/transports/ConsoleTransport';

it('should add contextId to a simple message', () => {
  const consoleTransport = new ConsoleTransport();
  const mock = jest.spyOn(consoleTransport, 'log');
  const factory = new LogFactory({
    level: LogLevel.DEBUG,
    defaultMeta: {},
    transports: [consoleTransport]
  });
  const logger = factory.create('{{CONTEXT}}');

  globalContext.run(() => {
    logger.info({ message: '{{MESSAGE}}' });
    expect(mock).toHaveBeenCalledWith({
      context: '{{CONTEXT}}',
      contextId: expect.any(String),
      level: 1,
      message: { message: '{{MESSAGE}}' }
    });
  });
});
