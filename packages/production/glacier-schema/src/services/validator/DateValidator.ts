import { ValidationIssue } from '../../exceptions/ValidationIssue';
import type { SchemaValidator } from '../../interfaces/SchemaValidator';
import type { DateSchema } from '../../interfaces/schemas/DateSchema';

export class DateValidator implements SchemaValidator<DateSchema, Date> {
  public validate(schema: DateSchema, value: unknown): Date {
    this.assertType(value);
    return value;
  }

  private assertType(value: unknown): asserts value is Date {
    if (value instanceof Date) return;
    throw new ValidationIssue('INVALID_TYPE', 'Expected value to be an instance of Date');
  }
}
