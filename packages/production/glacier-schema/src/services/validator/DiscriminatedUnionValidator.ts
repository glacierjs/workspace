import type { UnknownValidator } from './UnknownValidator';
import { ValidationIssueException } from '../../exceptions/ValidationIssueException';
import type { SchemaValidator } from '../../interfaces/SchemaValidator';
import type { DiscriminatedUnionSchema } from '../../interfaces/schemas/DiscriminatedUnionSchema';
import type { ObjectSchema } from '../../interfaces/schemas/ObjectSchema';
import { SCHEMA_PROPERTY } from '../../reflection/SCHEMA_PROPERTY';
import type { IssueCollector } from '../IssueCollector';

export class DiscriminatedUnionValidator
  implements SchemaValidator<DiscriminatedUnionSchema, unknown>
{
  public constructor(private readonly unknownValidator: UnknownValidator) {}

  public validate(
    schema: DiscriminatedUnionSchema,
    value: unknown,
    issues: IssueCollector
  ): unknown {
    this.assertType(value);
    this.assertKey(value, schema);
    return this.assertValue(value, schema, issues);
  }

  private getUnionTypes(schema: DiscriminatedUnionSchema): Map<unknown, ObjectSchema> {
    return schema.items.reduce<Map<unknown, ObjectSchema>>((table, variant) => {
      const propertySchema = SCHEMA_PROPERTY.get(variant.schema.prototype, schema.property);
      if (propertySchema?.type !== 'literal') {
        throw new TypeError(
          'Expected all union types to have a literal property as discriminator.'
        );
      }
      table.set(propertySchema.value, variant);
      return table;
    }, new Map());
  }

  private assertValue(value: object, schema: DiscriminatedUnionSchema, issues: IssueCollector) {
    const lookupTable = this.getUnionTypes(schema);
    const discriminatorValue = value[schema.property as keyof typeof value];
    const matchingSchema = lookupTable.get(discriminatorValue);
    if (!matchingSchema) {
      throw new ValidationIssueException(
        'INVALID_UNION',
        `Expected ${schema.property} to be one of ${[...lookupTable.keys()].join(', ')}`
      );
    }
    return this.unknownValidator.validate(matchingSchema, value, issues);
  }

  private assertKey(value: object, schema: DiscriminatedUnionSchema) {
    if (schema.property in value) return;
    throw new ValidationIssueException(
      'INVALID_UNION',
      `Expected value to contain discriminating property ${schema.property}`
    );
  }

  private assertType(value: unknown): asserts value is object {
    if (typeof value === 'object') return;
    throw new ValidationIssueException('INVALID_TYPE', 'Expected value to be of type object');
  }
}
