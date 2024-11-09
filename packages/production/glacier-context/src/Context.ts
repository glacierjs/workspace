import type { Optional } from '@glacier/types';
import { AsyncLocalStorage } from 'node:async_hooks';
import { randomUUID } from 'node:crypto';

export class Context {
  private mainContext = Symbol();
  private store = new AsyncLocalStorage<symbol>();

  public getContext(): symbol {
    return this.store.getStore() ?? this.mainContext;
  }

  public getId(): Optional<string> {
    const context = this.getContext();
    return Symbol.keyFor(context);
  }

  public getShortId(): Optional<string> {
    const id = this.getId();
    if (!id) return;
    return id.slice(0, 8);
  }

  public run<R>(callback: () => R): R {
    const context = Symbol(randomUUID());
    return this.store.run(context, callback);
  }
}
