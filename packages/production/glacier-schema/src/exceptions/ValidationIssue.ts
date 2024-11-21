export class ValidationIssue extends Error {
  public readonly type: string;

  public constructor(type: string, message: string) {
    super(message);
    this.type = type;
    this.name = 'ValidationIssue';
  }
}
