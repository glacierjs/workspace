import type { DiscriminatedUnionSchema } from './DiscriminatedUnionSchema';
import type { UnknownUnionSchema } from './UnknownUnionSchema';

export type UnionSchema = DiscriminatedUnionSchema | UnknownUnionSchema;
