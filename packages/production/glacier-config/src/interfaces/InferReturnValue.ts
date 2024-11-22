import type { InferOptions } from './InferOptions';

export type InferReturnValue<I extends InferOptions> = I['type'] extends 'string'
  ? string
  : I['type'] extends 'number'
    ? number
    : I['type'] extends 'boolean'
      ? boolean
      : never;
