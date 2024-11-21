import { Property } from './Property';
import type { Schema } from '../interfaces/Schema';

export function TupleProperty(items: Schema[], isOptional?: boolean): PropertyDecorator {
  return (target, propertyKey) => {
    Property({ type: 'tuple', items, isOptional })(target, propertyKey);
  };
}
