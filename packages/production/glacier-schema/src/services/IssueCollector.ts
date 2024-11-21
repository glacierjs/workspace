import type { ValidationIssue } from '../interfaces/ValidationIssue';

export class IssueCollector {
  private readonly currentPath: string[] = ['$'];
  public readonly issues: ValidationIssue[] = [];

  public enterProperty(propertyKey: string): void {
    this.currentPath.push(propertyKey);
  }

  public enterArrayItem(index: number): void {
    this.currentPath.push(`[${index}]`);
  }

  public leaveProperty(): void {
    this.currentPath.pop();
  }

  public addIssue(type: string, message: string): void {
    this.issues.push({
      path: this.currentPath.join('.'),
      type,
      message
    });
  }
}
