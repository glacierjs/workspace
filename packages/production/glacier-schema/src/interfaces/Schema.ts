import type { ArraySchema } from './schemas/ArraySchema';
import type { BooleanSchema } from './schemas/BooleanSchema';
import type { CyclicSchema } from './schemas/CyclicSchema';
import type { DateSchema } from './schemas/DateSchema';
import type { EnumSchema } from './schemas/EnumSchema';
import type { IntegerSchema } from './schemas/IntegerSchema';
import type { LiteralSchema } from './schemas/LiteralSchema';
import type { NumberSchema } from './schemas/NumberSchema';
import type { ObjectSchema } from './schemas/ObjectSchema';
import type { RecordSchema } from './schemas/RecordSchema';
import type { StringSchema } from './schemas/StringSchema';
import type { TupleSchema } from './schemas/TupleSchema';
import type { UnionSchema } from './schemas/UnionSchema';

export type Schema =
  | ArraySchema
  | BooleanSchema
  | CyclicSchema
  | EnumSchema
  | IntegerSchema
  | LiteralSchema
  | NumberSchema
  | RecordSchema
  | StringSchema
  | TupleSchema
  | UnionSchema
  | DateSchema
  | ObjectSchema;
