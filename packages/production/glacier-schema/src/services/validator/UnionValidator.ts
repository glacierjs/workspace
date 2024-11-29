import { DiscriminatedUnionValidator } from './DiscriminatedUnionValidator';
import { UnknownUnionValidator } from './UnknownUnionValidator';
import type { UnknownValidator } from './UnknownValidator';
import type { SchemaValidator } from '../../interfaces/SchemaValidator';
import type { DiscriminatedUnionSchema } from '../../interfaces/schemas/DiscriminatedUnionSchema';
import type { UnionSchema } from '../../interfaces/schemas/UnionSchema';
import type { IssueCollector } from '../IssueCollector';

export class UnionValidator implements SchemaValidator<UnionSchema, unknown> {
  private readonly discriminatedUnionValidator: DiscriminatedUnionValidator;
  private readonly unknownUnionValidator: UnknownUnionValidator;

  public constructor(unknownValidator: UnknownValidator) {
    this.discriminatedUnionValidator = new DiscriminatedUnionValidator(unknownValidator);
    this.unknownUnionValidator = new UnknownUnionValidator(unknownValidator);
  }

  public validate(schema: UnionSchema, value: unknown, issues: IssueCollector): unknown {
    if ('property' in schema) {
      return this.discriminatedUnionValidator.validate(
        schema as DiscriminatedUnionSchema,
        value,
        issues
      );
    }
    return this.unknownUnionValidator.validate(schema, value, issues);
  }
}
