import type { Constructor } from '@glacier/utils';

import { ValidationException } from './exceptions/ValidationException';
import type { ValidationResult } from './interfaces/ValidationResult';
import type { ObjectSchema } from './interfaces/schemas/ObjectSchema';
import { IssueCollector } from './services/IssueCollector';
import { UnknownValidator } from './services/validator/UnknownValidator';

export class Validator {
  private readonly unknownValidator = new UnknownValidator();

  public parseOrThrow<E extends object>(schema: Constructor<E>, entity: NoInfer<E>): E {
    const parseResult = this.parse(schema, entity);
    if (parseResult.isValid) return parseResult.value;
    throw new ValidationException(parseResult.issues);
  }

  public parse<E extends object>(schema: Constructor<E>, entity: NoInfer<E>): ValidationResult<E> {
    const issueCollector = new IssueCollector();
    const objectSchema: ObjectSchema = { type: 'object', schema };
    const value = this.unknownValidator.validate(objectSchema, entity, issueCollector) as E;
    const issues = issueCollector.issues;
    if (issues.length > 0) {
      return {
        isValid: false,
        issues
      };
    }
    return {
      isValid: true,
      value
    };
  }
}
