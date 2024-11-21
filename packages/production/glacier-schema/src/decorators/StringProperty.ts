import { Property } from './Property';
import type { StringSchema } from '../interfaces/schemas/StringSchema';

export function StringProperty(schema?: Omit<StringSchema, 'type'>): PropertyDecorator {
  return (target, propertyKey) => {
    Property({ type: 'string', ...schema })(target, propertyKey);
  };
}
