import { Property } from './Property';

export function EnumProperty(
  items: Record<string, string>,
  isOptional?: boolean
): PropertyDecorator {
  return (target, propertyKey) => {
    Property({ type: 'enum', items, isOptional })(target, propertyKey);
  };
}
