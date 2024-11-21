import { Property } from './Property';

export function DateProperty(isOptional?: boolean): PropertyDecorator {
  return (target, propertyKey) => {
    Property({ type: 'date', isOptional })(target, propertyKey);
  };
}
