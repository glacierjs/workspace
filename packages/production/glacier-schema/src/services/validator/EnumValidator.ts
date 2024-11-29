import { ValidationIssueException } from '../../exceptions/ValidationIssueException';
import type { SchemaValidator } from '../../interfaces/SchemaValidator';
import type { EnumSchema } from '../../interfaces/schemas/EnumSchema';

export class EnumValidator implements SchemaValidator<EnumSchema, string> {
  public validate(schema: EnumSchema, value: unknown): string {
    this.assertType(value);
    this.assertOneOf(value, Object.values(schema.items));
    return value;
  }

  private assertOneOf(value: string, options: string[]): void {
    if (options.includes(value)) return;
    throw new ValidationIssueException(
      'INVALID_OPTION',
      `Expected value to be one of ${options.join(', ')}`
    );
  }

  private assertType(value: unknown): asserts value is string {
    if (typeof value === 'string') return;
    throw new ValidationIssueException('INVALID_TYPE', 'Expected value to be of type string');
  }
}
