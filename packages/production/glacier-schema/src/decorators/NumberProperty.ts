import { Property } from './Property';
import type { IntegerSchema } from '../interfaces/schemas/IntegerSchema';

export function NumberProperty(schema?: Omit<IntegerSchema, 'type'>): PropertyDecorator {
  return (target, propertyKey) => {
    Property({ type: 'number', ...schema })(target, propertyKey);
  };
}
