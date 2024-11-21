import type { Schema } from './Schema';
import type { IssueCollector } from '../services/IssueCollector';

export interface SchemaValidator<T extends Schema, O> {
  validate(schema: T, value: unknown, issues: IssueCollector): O;
}
