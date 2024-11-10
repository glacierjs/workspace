import { LogFactory } from '../../src/entities/LogFactory';
import { LogLevel } from '../../src/interfaces/LogLevel';
import { ConsoleTransport } from '../../src/transports/ConsoleTransport';

it('should log a info message', () => {
  const consoleTransport = new ConsoleTransport();
  const mock = jest.spyOn(consoleTransport, 'log');
  const factory = new LogFactory({
    level: LogLevel.DEBUG,
    defaultMeta: {},
    transports: [consoleTransport]
  });
  const logger = factory.create('{{CONTEXT}}');
  logger.info({ message: '{{MESSAGE}}' });
  expect(mock).toHaveBeenCalledWith({
    context: '{{CONTEXT}}',
    level: LogLevel.INFO,
    message: { message: '{{MESSAGE}}' }
  });
});
