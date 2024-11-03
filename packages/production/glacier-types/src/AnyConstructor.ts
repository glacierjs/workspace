import { AbstractConstructor } from './AbstractConstructor';
import { Constructor } from './Constructor';

export type AnyConstructor<T = unknown> = AbstractConstructor<T> | Constructor<T>;
