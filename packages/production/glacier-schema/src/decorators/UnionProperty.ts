import { Property } from './Property';
import type { UnionSchema } from '../interfaces/schemas/UnionSchema';

export function UnionProperty(schema: Omit<UnionSchema, 'type'>): PropertyDecorator {
  return (target, propertyKey) => {
    Property({ type: 'union', ...schema })(target, propertyKey);
  };
}
