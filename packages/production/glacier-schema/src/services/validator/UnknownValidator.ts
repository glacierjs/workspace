import { ArrayValidator } from './ArrayValidator';
import { BooleanValidator } from './BooleanValidator';
import { DateValidator } from './DateValidator';
import { EnumValidator } from './EnumValidator';
import { IntegerValidator } from './IntegerValidator';
import { LiteralValidator } from './LiteralValidator';
import { NumberValidator } from './NumberValidator';
import { ObjectValidator } from './ObjectValidator';
import { RecordValidator } from './RecordValidator';
import { StringValidator } from './StringValidator';
import { TupleValidator } from './TupleValidator';
import { UnionValidator } from './UnionValidator';
import { ValidationIssueException } from '../../exceptions/ValidationIssueException';
import type { Schema } from '../../interfaces/Schema';
import type { SchemaValidator } from '../../interfaces/SchemaValidator';
import type { IssueCollector } from '../IssueCollector';

export class UnknownValidator implements SchemaValidator<Schema, unknown> {
  private readonly stringValidator = new StringValidator();
  private readonly booleanValidator = new BooleanValidator();
  private readonly literalValidator = new LiteralValidator();
  private readonly enumValidator = new EnumValidator();
  private readonly dateValidator = new DateValidator();
  private readonly numberValidator = new NumberValidator();
  private readonly integerValidator = new IntegerValidator();
  private readonly arrayValidator = new ArrayValidator(this);
  private readonly tupleValidator = new TupleValidator(this);
  private readonly recordValidator = new RecordValidator(this);
  private readonly unionValidator = new UnionValidator(this);
  private readonly objectValidator = new ObjectValidator(this);

  public validate(schema: Schema, value: unknown, issues: IssueCollector): unknown {
    try {
      return this.validateSchema(schema, value, issues);
    } catch (error) {
      if (error instanceof ValidationIssueException) {
        issues.addIssue(error.type, error.message);
      } else {
        throw error;
      }
    }
  }

  private validateSchema(schema: Schema, value: unknown, issues: IssueCollector): unknown {
    switch (schema.type) {
      case 'cyclic': {
        return this.validateSchema(schema.factory(), value, issues);
      }
      case 'object': {
        return this.objectValidator.validate(schema, value, issues);
      }
      case 'boolean': {
        return this.booleanValidator.validate(schema, value);
      }
      case 'array': {
        return this.arrayValidator.validate(schema, value, issues);
      }
      case 'enum': {
        return this.enumValidator.validate(schema, value);
      }
      case 'integer': {
        return this.integerValidator.validate(schema, value);
      }
      case 'literal': {
        return this.literalValidator.validate(schema, value);
      }
      case 'number': {
        return this.numberValidator.validate(schema, value);
      }
      case 'record': {
        return this.recordValidator.validate(schema, value, issues);
      }
      case 'string': {
        return this.stringValidator.validate(schema, value);
      }
      case 'tuple': {
        return this.tupleValidator.validate(schema, value, issues);
      }
      case 'union': {
        return this.unionValidator.validate(schema, value, issues);
      }
      case 'date': {
        return this.dateValidator.validate(schema, value);
      }
    }
  }
}
