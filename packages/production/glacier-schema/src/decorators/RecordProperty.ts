import { Property } from './Property';
import type { RecordSchema } from '../interfaces/schemas/RecordSchema';

export function RecordProperty(schema: Omit<RecordSchema, 'type'>): PropertyDecorator {
  return (target, propertyKey) => {
    Property({ type: 'record', ...schema })(target, propertyKey);
  };
}
