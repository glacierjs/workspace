import type { Schema } from '../interfaces/Schema';
import { SCHEMA_PROPERTIES } from '../reflection/SCHEMA_PROPERTIES';
import { SCHEMA_PROPERTY } from '../reflection/SCHEMA_PROPERTY';

export function Property(schema: Schema): PropertyDecorator {
  return (target, propertyKey) => {
    SCHEMA_PROPERTY.set(schema, target, propertyKey);
    if (typeof propertyKey === 'symbol') {
      throw new TypeError('Symbol properties are not supported.');
    }
    SCHEMA_PROPERTIES.add(propertyKey, target);
  };
}
