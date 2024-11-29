import { ValidationIssueException } from '../../exceptions/ValidationIssueException';
import type { SchemaValidator } from '../../interfaces/SchemaValidator';
import type { StringSchema } from '../../interfaces/schemas/StringSchema';

export class StringValidator implements SchemaValidator<StringSchema, string> {
  public validate(schema: StringSchema, value: unknown): string {
    this.assertType(value);
    this.assertMaxLength(value, schema.maxLength);
    this.assertMinLength(value, schema.minLength);
    this.assertPattern(value, schema.pattern);
    return value;
  }

  private assertType(value: unknown): asserts value is string {
    if (typeof value === 'string') return;
    throw new ValidationIssueException('INVALID_TYPE', 'Expected value to be of type string');
  }

  private assertMaxLength(value: string, maxLength?: number): void {
    if (maxLength === undefined) return;
    if (value.length <= maxLength) return;
    throw new ValidationIssueException(
      'INVALID_LENGTH',
      `Expected value to have less then ${maxLength} characters.`
    );
  }

  private assertMinLength(value: string, minLength?: number): void {
    if (minLength === undefined) return;
    if (value.length >= minLength) return;
    throw new ValidationIssueException(
      'INVALID_LENGTH',
      `Expected value to have more then ${minLength} characters.`
    );
  }

  private assertPattern(value: string, pattern?: RegExp): void {
    if (pattern === undefined) return;
    if (pattern.test(value)) return;
    throw new ValidationIssueException(
      'INVALID_FORMAT',
      `Expected value to match pattern ${pattern}.`
    );
  }
}
