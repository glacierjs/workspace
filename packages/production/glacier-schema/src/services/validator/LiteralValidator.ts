import { ValidationIssueException } from '../../exceptions/ValidationIssueException';
import type { SchemaValidator } from '../../interfaces/SchemaValidator';
import type { LiteralSchema } from '../../interfaces/schemas/LiteralSchema';

export class LiteralValidator implements SchemaValidator<LiteralSchema, unknown> {
  public validate(schema: LiteralSchema, value: unknown): unknown {
    this.assertValue(schema.value, value);
    return value;
  }

  private assertValue(expectedValue: unknown, value: unknown): asserts value is unknown {
    if (value === expectedValue) return;
    throw new ValidationIssueException(
      'INVALID_VALUE',
      `Expected value to be ${String(expectedValue)}`
    );
  }
}
