import { LoggerFormater } from './LoggerFormater';
import { Component, Scope } from '@glacier/ioc';
import { LogLevel } from './interfaces/LogLevel';
import { LoggerPersister } from './LoggerPersister';

@Component({ scope: Scope.TRANSIENT })
export class Logger<I = string, O = string> {
  private context?: string;

  public constructor(
    private readonly formatter: LoggerFormater<I, O>,
    private readonly persister: LoggerPersister<O>
  ) {
  }

  public debug(message: I): this {
    this.log(LogLevel.DEBUG, message);
    return this;
  }

  public info(message: I): this {
    this.log(LogLevel.INFO, message);
    return this;
  }

  public warn(message: I): this {
    this.log(LogLevel.WARN, message);
    return this;
  }

  public error(message: I): this {
    this.log(LogLevel.ERROR, message);
    return this;
  }

  private log(logLevel: LogLevel, message: I): void {
    const formattedMessage = this.formatter.format({
      logLevel, message, context: this.context
    });
    this.persister.persist(formattedMessage);
  }

  public setContext(context?: string): this {
    this.context = context;
    return this;
  }
}
