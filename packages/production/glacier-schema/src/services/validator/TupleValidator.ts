import type { UnknownValidator } from './UnknownValidator';
import { ValidationIssueException } from '../../exceptions/ValidationIssueException';
import type { SchemaValidator } from '../../interfaces/SchemaValidator';
import type { TupleSchema } from '../../interfaces/schemas/TupleSchema';
import type { IssueCollector } from '../IssueCollector';

export class TupleValidator implements SchemaValidator<TupleSchema, unknown[]> {
  public constructor(private readonly unknownValidator: UnknownValidator) {}

  public validate(schema: TupleSchema, value: unknown, issues: IssueCollector): unknown[] {
    this.assertType(value);
    this.assertLength(value, schema);
    return this.assertItems(value, schema, issues);
  }

  private assertItems(value: unknown[], schema: TupleSchema, issues: IssueCollector): unknown[] {
    return value.map((item, index) => {
      issues.enterArrayItem(index);
      const validatedValue = this.unknownValidator.validate(schema.items[index], item, issues);
      issues.leaveProperty();
      return validatedValue;
    });
  }

  private assertType(value: unknown): asserts value is unknown[] {
    if (Array.isArray(value)) return;
    throw new ValidationIssueException('INVALID_TYPE', 'Expected value to be an array');
  }
  private assertLength(value: unknown[], schema: TupleSchema): asserts value is unknown[] {
    if (value.length === schema.items.length) return;
    throw new ValidationIssueException(
      'INVALID_LENGTH',
      `Expected array to have exactly ${schema.items.length} items.`
    );
  }
}
