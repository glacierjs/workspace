import type { UnknownValidator } from './UnknownValidator';
import { ValidationIssueException } from '../../exceptions/ValidationIssueException';
import type { SchemaValidator } from '../../interfaces/SchemaValidator';
import type { ObjectSchema } from '../../interfaces/schemas/ObjectSchema';
import { SCHEMA_PROPERTIES } from '../../reflection/SCHEMA_PROPERTIES';
import { SCHEMA_PROPERTY } from '../../reflection/SCHEMA_PROPERTY';
import type { IssueCollector } from '../IssueCollector';

export class ObjectValidator implements SchemaValidator<ObjectSchema, object> {
  public constructor(private readonly unknownValidator: UnknownValidator) {}

  public validate(schema: ObjectSchema, value: unknown, issues: IssueCollector): object {
    this.assertType(value);
    const properties = SCHEMA_PROPERTIES.getAll(schema.schema.prototype);
    const Constructor = schema.schema;
    const instance: any = new Constructor();
    for (const propertyKey of properties) {
      issues.enterProperty(propertyKey);
      const validatedProperty = this.validateProperty(propertyKey, schema, value, issues);
      if (validatedProperty === undefined) continue;
      instance[propertyKey] = validatedProperty;
      issues.leaveProperty();
    }
    return instance;
  }

  private validateProperty(
    propertyKey: string,
    schema: ObjectSchema,
    value: object,
    issues: IssueCollector
  ) {
    const propertySchema = SCHEMA_PROPERTY.get(schema.schema.prototype, propertyKey)!;

    if (!(propertyKey in value)) {
      if (!propertySchema.isOptional) {
        issues.addIssue('REQUIRED_PROPERTY', `Expected ${propertyKey} to exist.`);
      }
      return;
    }

    return this.unknownValidator.validate(
      propertySchema,
      value[propertyKey as keyof typeof value],
      issues
    );
  }

  private assertType(value: unknown): asserts value is object {
    if (typeof value === 'object') return;
    throw new ValidationIssueException('INVALID_TYPE', 'Expected value to be of type object');
  }
}
