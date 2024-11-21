import type { UnknownValidator } from './UnknownValidator';
import { ValidationIssue } from '../../exceptions/ValidationIssue';
import type { SchemaValidator } from '../../interfaces/SchemaValidator';
import type { ArraySchema } from '../../interfaces/schemas/ArraySchema';
import type { IssueCollector } from '../IssueCollector';

export class ArrayValidator implements SchemaValidator<ArraySchema, unknown[]> {
  public constructor(private readonly unknownValidator: UnknownValidator) {}

  public validate(schema: ArraySchema, value: unknown, issues: IssueCollector): unknown[] {
    this.assertType(value);
    this.assertUnique(value, schema);
    this.assertMinItems(value, schema);
    this.assertMaxItems(value, schema);
    return this.assertItems(value, schema, issues);
  }

  private assertItems(value: unknown[], schema: ArraySchema, issues: IssueCollector): unknown[] {
    return value.map((item, index) => {
      issues.enterArrayItem(index);
      const validatedValue = this.unknownValidator.validate(schema.items, item, issues);
      issues.leaveProperty();
      return validatedValue;
    });
  }

  private assertMaxItems(value: unknown[], schema: ArraySchema): void {
    if (schema.maxItems === undefined) return;
    if (value.length <= schema.maxItems) return;
    throw new ValidationIssue(
      'INVALID_ARRAY',
      `Expected array to have at most ${schema.maxItems} items.`
    );
  }

  private assertMinItems(value: unknown[], schema: ArraySchema): void {
    if (schema.minItems === undefined) return;
    if (value.length >= schema.minItems) return;
    throw new ValidationIssue(
      'INVALID_ARRAY',
      `Expected array to have at least ${schema.minItems} items.`
    );
  }

  private assertUnique(value: unknown[], schema: ArraySchema): void {
    if (schema.uniqueItems === undefined) return;
    const uniqueItems = new Set(value);
    if (uniqueItems.size === value.length) return;
    throw new ValidationIssue('INVALID_ARRAY', 'Expected value to consist of only unique items');
  }

  private assertType(value: unknown): asserts value is unknown[] {
    if (Array.isArray(value)) return;
    throw new ValidationIssue('INVALID_TYPE', 'Expected value to be an array');
  }
}
