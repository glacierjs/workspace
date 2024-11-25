import { ValidationIssueException } from '../../exceptions/ValidationIssueException';
import type { SchemaValidator } from '../../interfaces/SchemaValidator';
import type { IntegerSchema } from '../../interfaces/schemas/IntegerSchema';
import type { NumberSchema } from '../../interfaces/schemas/NumberSchema';

export class NumericValidator<T extends NumberSchema | IntegerSchema>
  implements SchemaValidator<T, number>
{
  public validate(schema: T, value: unknown): number {
    this.assertType(value);
    this.assertMaximum(value, schema);
    this.assertMinimum(value, schema);
    this.assertExclusiveMinimum(value, schema);
    this.assertExclusiveMaximum(value, schema);
    this.assertMultipleOf(value, schema);
    return value;
  }

  private assertMultipleOf(value: number, schema: T): void {
    if (schema.multipleOf === undefined) return;
    if (value % schema.multipleOf === 0) return;
    throw new ValidationIssueException(
      'INVALID_VALUE',
      `Expected value to be a multiple of ${schema.multipleOf}`
    );
  }

  private assertExclusiveMaximum(value: number, schema: T): void {
    if (schema.exclusiveMaximum === undefined) return;
    if (value < schema.exclusiveMaximum) return;
    throw new ValidationIssueException(
      'INVALID_RANGE',
      `Expected value to be lower ${schema.minimum}`
    );
  }

  private assertExclusiveMinimum(value: number, schema: T): void {
    if (schema.exclusiveMinimum === undefined) return;
    if (value > schema.exclusiveMinimum) return;
    throw new ValidationIssueException(
      'INVALID_RANGE',
      `Expected value to be higher ${schema.minimum}`
    );
  }

  private assertMaximum(value: number, schema: T): void {
    if (schema.maximum === undefined) return;
    if (value <= schema.maximum) return;
    throw new ValidationIssueException(
      'INVALID_RANGE',
      `Expected value to be lower or equal ${schema.minimum}`
    );
  }

  private assertMinimum(value: number, schema: T): void {
    if (schema.minimum === undefined) return;
    if (value >= schema.minimum) return;
    throw new ValidationIssueException(
      'INVALID_RANGE',
      `Expected value to be higher or equal ${schema.minimum}`
    );
  }

  private assertType(value: unknown): asserts value is number {
    if (typeof value === 'number') return;
    throw new ValidationIssueException('INVALID_TYPE', 'Expected value to be of type number');
  }
}
