import {
  ArrayProperty,
  BooleanProperty,
  CyclicProperty,
  ObjectProperty,
  StringProperty,
  UnknownProperty
} from '@glacier/schema';

import { ExternalDocumentationModel } from './ExternalDocumentation.model';
import { schemaModel, SchemaModel } from './Schema.model';

export class BaseSchemaModel {
  @ObjectProperty(ExternalDocumentationModel, true)
  public declare externalDocs?: ExternalDocumentationModel;

  @ArrayProperty(
    {
      type: 'cyclic',
      factory: () => schemaModel
    },
    { isOptional: true }
  )
  public declare allOf?: SchemaModel[];

  @ArrayProperty(
    {
      type: 'cyclic',
      factory: () => schemaModel
    },
    { isOptional: true }
  )
  public declare oneOf?: SchemaModel[];

  @ArrayProperty(
    {
      type: 'cyclic',
      factory: () => schemaModel
    },
    { isOptional: true }
  )
  public declare anyOf?: SchemaModel[];

  @CyclicProperty(() => schemaModel, true)
  public declare not?: SchemaModel;

  @BooleanProperty(true)
  public declare nullable?: boolean;

  @BooleanProperty(true)
  public declare writeOnly?: boolean;

  @BooleanProperty(true)
  public declare deprecated?: boolean;

  @BooleanProperty(true)
  public declare readOnly?: boolean;

  @StringProperty({ isOptional: true })
  public declare description?: string;

  @StringProperty({ isOptional: true })
  public declare title?: string;

  @StringProperty({ isOptional: true })
  public declare $ref?: string;

  @UnknownProperty(true)
  public declare example?: unknown;
}
