import { Property } from './Property';

export function LiteralProperty(
  value: string | number | boolean,
  isOptional?: boolean
): PropertyDecorator {
  return (target, propertyKey) => {
    Property({ type: 'literal', value, isOptional })(target, propertyKey);
  };
}
