import { LogFactory } from '../../src/entities/LogFactory';
import { LogLevel } from '../../src/interfaces/LogLevel';
import { ConsoleTransport } from '../../src/transports/ConsoleTransport';

it('should log an error message', () => {
  const consoleTransport = new ConsoleTransport();
  const mock = jest.spyOn(consoleTransport, 'log');
  const factory = new LogFactory({
    level: LogLevel.DEBUG,
    defaultMeta: {},
    transports: [consoleTransport]
  });
  const logger = factory.create('{{CONTEXT}}');
  logger.error({ message: '{{MESSAGE}}' });
  expect(mock).toHaveBeenCalledWith({
    context: '{{CONTEXT}}',
    level: LogLevel.ERROR,
    message: { message: '{{MESSAGE}}' }
  });
});
