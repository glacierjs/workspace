import type { ValidationIssue } from '../interfaces/ValidationIssue';

export class ValidationException extends Error {
  public readonly issues: ValidationIssue[];
  public constructor(issues: ValidationIssue[]) {
    super('Failed to validate given entity against schema.');
    this.issues = issues;
    this.name = 'ValidationException';
  }
}
