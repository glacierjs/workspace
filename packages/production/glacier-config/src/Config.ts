import type { Optional } from '@glacier/utils';

import { MissingEnvironment } from './exception/MissingEnvironment';
import type { EnvType } from './interfaces/EnvType';
import type { Environment } from './interfaces/Environment';
import type { InferOptions } from './interfaces/InferOptions';
import type { InferReturnValue } from './interfaces/InferReturnValue';

export class Config<T extends Environment<T>> {
  public getOrThrow<const I extends InferOptions = { type: 'string' }>(
    key: keyof T,
    inferOptions?: I
  ): EnvType<I> {
    const environmentValue = this.get(key, undefined, inferOptions);
    if (environmentValue === undefined) throw new MissingEnvironment(key as string);
    return environmentValue;
  }

  public get<const I extends InferOptions = { type: 'string' }>(
    key: keyof T,
    defaultValue?: EnvType<I>,
    inferOptions?: I
  ): Optional<EnvType<I>> {
    const environmentValue = process.env[key as string];

    if (environmentValue === undefined) {
      return defaultValue;
    }

    if (!inferOptions) {
      return environmentValue as EnvType<I>;
    }

    return this.inferValue(environmentValue, inferOptions);
  }

  private inferValue<I extends InferOptions>(value: string, inferOptions: I): EnvType<I> {
    if (inferOptions.isArray) {
      return value.split(',').map((v) => this.inferPrimitive(v, inferOptions)) as EnvType<I>;
    }
    return this.inferPrimitive(value, inferOptions) as EnvType<I>;
  }

  private inferPrimitive<I extends InferOptions>(
    value: string,
    inferOptions: I
  ): InferReturnValue<I> {
    if (inferOptions.type === 'number') {
      return Number.parseFloat(value) as InferReturnValue<I>;
    } else if (inferOptions.type === 'boolean') {
      return (value === 'true' || value === '1') as InferReturnValue<I>;
    }
    return value as InferReturnValue<I>;
  }
}
