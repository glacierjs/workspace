import type { Constructor } from '@glacier/types';

export function isConstructor(value: unknown): value is Constructor {
  return (
    typeof value === 'function' &&
    value.prototype &&
    value.prototype.constructor === value
  );
}
