import { LogMessage } from './interfaces/LogMessage';

export abstract class LoggerFormater<I = string, O = string> {
  public abstract format(logMessage: LogMessage<I>): O;
}
