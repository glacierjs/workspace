import type { Constructor } from '../types/Constructor';

export function isConstructor(value: unknown): value is Constructor {
  return (
    typeof value === 'function' &&
    value.prototype &&
    value.prototype.constructor === value &&
    value.toString().startsWith('class')
  );
}
