import type { InferOptions } from './InferOptions';
import type { InferReturnValue } from './InferReturnValue';

export type EnvType<I extends InferOptions> = I['isArray'] extends true
  ? Array<InferReturnValue<I>>
  : InferReturnValue<I>;
