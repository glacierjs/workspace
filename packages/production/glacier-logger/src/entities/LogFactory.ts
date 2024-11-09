import { Logger } from '../Logger';
import type { LogConfig } from '../interfaces/LogConfig';

export class LogFactory<V, M> {
  public constructor(private readonly config: LogConfig<V, M>) {}

  public create(context: string): Logger<V, M> {
    return new Logger<V, M>(context, this.config);
  }
}
