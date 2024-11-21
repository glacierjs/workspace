import { Property } from './Property';
import type { ResolvedSchema } from '../interfaces/ResolvedSchema';

export function CyclicProperty(
  factory: () => ResolvedSchema,
  isOptional?: boolean
): PropertyDecorator {
  return (target, propertyKey) => {
    Property({ type: 'cyclic', factory, isOptional })(target, propertyKey);
  };
}
