import { Logger } from '../../src/Logger';
import { LogLevel } from '../../src/interfaces/LogLevel';
import { ConsoleTransport } from '../../src/transports/ConsoleTransport';

it('should log a simple info statement', () => {
  const logger = new Logger('{{TEST}}', {
    level: LogLevel.DEBUG,
    defaultMeta: {},
    transports: [new ConsoleTransport()]
  });
  logger.debug({ message: 'test' });
  logger.info({ message: 'test' });
  logger.warn({ message: 'test' });
  logger.error({ message: 'test' });
});
