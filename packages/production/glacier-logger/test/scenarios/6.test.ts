import { LogFactory } from '../../src/entities/LogFactory';
import { LogLevel } from '../../src/interfaces/LogLevel';
import { ConsoleTransport } from '../../src/transports/ConsoleTransport';

it('should not log debug message if logLevel is error', () => {
  const consoleTransport = new ConsoleTransport();
  const mock = jest.spyOn(consoleTransport, 'log');
  const factory = new LogFactory({
    level: LogLevel.ERROR,
    defaultMeta: {},
    transports: [consoleTransport]
  });
  const logger = factory.create('{{CONTEXT}}');
  logger.debug({ message: '{{MESSAGE}}' });
  expect(mock).not.toHaveBeenCalled();
});
