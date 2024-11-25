import type { UnknownValidator } from './UnknownValidator';
import { ValidationIssueException } from '../../exceptions/ValidationIssueException';
import type { SchemaValidator } from '../../interfaces/SchemaValidator';
import type { ValidationIssue } from '../../interfaces/ValidationIssue';
import type { UnknownUnionSchema } from '../../interfaces/schemas/UnknownUnionSchema';
import { IssueCollector } from '../IssueCollector';

export class UnknownUnionValidator implements SchemaValidator<UnknownUnionSchema, unknown> {
  public constructor(private readonly unknownValidator: UnknownValidator) {}

  public validate(schema: UnknownUnionSchema, value: unknown, issues: IssueCollector): unknown {
    const collectedIssues: ValidationIssue[] = [];
    for (const possibleSchema of schema.items) {
      const issueCollector = new IssueCollector();
      const result = this.unknownValidator.validate(possibleSchema, value, issueCollector);
      if (issueCollector.issues.length === 0) return result;
      collectedIssues.push(...issueCollector.issues);
    }

    for (const issue of collectedIssues) {
      issues.addIssue(issue.type, issue.message);
    }

    throw new ValidationIssueException(
      'INVALID_UNION',
      'Expected value to be on of the possible union items'
    );
  }
}
