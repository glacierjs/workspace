import type { ValidationFailedResult } from './ValidationFailedResult';
import type { ValidationSuccessResult } from './ValidationSuccessResult';

export type ValidationResult<E> = ValidationSuccessResult<E> | ValidationFailedResult;
