import type { LogLevel } from './LogLevel';

export interface LogMessage<T> {
  context: string;
  level: LogLevel;
  message: T;
}
