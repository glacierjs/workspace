import { NumericValidator } from './NumericValidator';
import { ValidationIssueException } from '../../exceptions/ValidationIssueException';
import type { IntegerSchema } from '../../interfaces/schemas/IntegerSchema';

export class IntegerValidator extends NumericValidator<IntegerSchema> {
  public validate(schema: IntegerSchema, value: unknown): number {
    const validatedValue = super.validate(schema, value);
    this.assertInteger(validatedValue);
    return validatedValue;
  }

  private assertInteger(value: number): void {
    if (Number.isInteger(value)) return;
    throw new ValidationIssueException('INVALID_PRECISION', 'Expected value to be an integer');
  }
}
