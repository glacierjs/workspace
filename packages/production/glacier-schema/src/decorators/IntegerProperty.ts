import { Property } from './Property';
import type { IntegerSchema } from '../interfaces/schemas/IntegerSchema';

export function IntegerProperty(schema?: Omit<IntegerSchema, 'type'>): PropertyDecorator {
  return (target, propertyKey) => {
    Property({ type: 'integer', ...schema })(target, propertyKey);
  };
}
