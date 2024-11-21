import type { ValidationIssue } from './ValidationIssue';

export interface ValidationFailedResult {
  isValid: false;
  issues: ValidationIssue[];
}
