import type { UnknownValidator } from './UnknownValidator';
import { ValidationIssueException } from '../../exceptions/ValidationIssueException';
import type { SchemaValidator } from '../../interfaces/SchemaValidator';
import type { RecordSchema } from '../../interfaces/schemas/RecordSchema';
import type { IssueCollector } from '../IssueCollector';

export class RecordValidator
  implements SchemaValidator<RecordSchema, Record<string | number, unknown>>
{
  public constructor(private readonly unknownValidator: UnknownValidator) {}

  public validate(
    schema: RecordSchema,
    value: unknown,
    issues: IssueCollector
  ): Record<string | number, unknown> {
    this.assertType(value);
    this.assertMinProperties(value, schema);
    this.assertMaxProperties(value, schema);
    return this.assertItems(value, schema, issues);
  }

  private assertItems(
    value: object,
    schema: RecordSchema,
    issues: IssueCollector
  ): Record<string | number, unknown> {
    const record: Record<string | number, unknown> = {};
    for (const key in value) {
      issues.enterProperty(key);
      const parsedKey = this.unknownValidator.validate(schema.key, key, issues);
      record[parsedKey as string | number] = this.unknownValidator.validate(
        schema.value,
        value[key as keyof typeof value],
        issues
      );
      issues.leaveProperty();
    }
    return record;
  }

  private assertMaxProperties(value: object, schema: RecordSchema) {
    if (schema.maxProperties === undefined) return;
    const keys = Object.keys(value);
    if (keys.length <= schema.maxProperties) return;
    throw new ValidationIssueException(
      'INVALID_PROPERTIES',
      `Expected value to have less then ${schema.maxProperties} properties.`
    );
  }

  private assertMinProperties(value: object, schema: RecordSchema) {
    if (schema.minProperties === undefined) return;
    const keys = Object.keys(value);
    if (keys.length >= schema.minProperties) return;
    throw new ValidationIssueException(
      'INVALID_PROPERTIES',
      `Expected value to have more then ${schema.minProperties} properties.`
    );
  }

  private assertType(value: unknown): asserts value is object {
    if (typeof value === 'object') return;
    throw new ValidationIssueException('INVALID_TYPE', 'Expected value to be of type object');
  }
}
