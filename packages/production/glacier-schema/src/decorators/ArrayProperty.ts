import { Property } from './Property';
import type { Schema } from '../interfaces/Schema';
import type { ArraySchema } from '../interfaces/schemas/ArraySchema';

export function ArrayProperty(
  items: Schema,
  schema?: Omit<ArraySchema, 'items' | 'type'>
): PropertyDecorator {
  return (target, propertyKey) => {
    Property({ type: 'array', items, ...schema })(target, propertyKey);
  };
}
