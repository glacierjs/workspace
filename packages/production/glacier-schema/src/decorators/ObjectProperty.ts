import type { Constructor } from '@glacier/utils';

import { Property } from './Property';

export function ObjectProperty(schema: Constructor, isOptional?: boolean): PropertyDecorator {
  return (target, propertyKey) => {
    Property({ type: 'object', schema, isOptional })(target, propertyKey);
  };
}
