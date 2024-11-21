import { ValidationIssue } from '../../exceptions/ValidationIssue';
import type { SchemaValidator } from '../../interfaces/SchemaValidator';
import type { BooleanSchema } from '../../interfaces/schemas/BooleanSchema';

export class BooleanValidator implements SchemaValidator<BooleanSchema, boolean> {
  public validate(schema: BooleanSchema, value: unknown): boolean {
    this.assertType(value);
    return value;
  }

  private assertType(value: unknown): asserts value is boolean {
    if (typeof value === 'boolean') return;
    throw new ValidationIssue('INVALID_TYPE', 'Expected value to be of type boolean');
  }
}
