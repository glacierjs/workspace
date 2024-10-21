import { LogLevel } from './LogLevel';

export interface LogMessage<M> {
  message: M;
  context?: string;
  logLevel: LogLevel;
}
