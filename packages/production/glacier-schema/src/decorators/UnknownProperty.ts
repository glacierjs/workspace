import { Property } from './Property';

export function UnknownProperty(isOptional?: boolean): PropertyDecorator {
  return (target, propertyKey) => {
    Property({ type: 'unknown', isOptional })(target, propertyKey);
  };
}
