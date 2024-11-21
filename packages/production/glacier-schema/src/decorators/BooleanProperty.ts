import { Property } from './Property';

export function BooleanProperty(isOptional?: boolean): PropertyDecorator {
  return (target, propertyKey) => {
    Property({ type: 'boolean', isOptional })(target, propertyKey);
  };
}
