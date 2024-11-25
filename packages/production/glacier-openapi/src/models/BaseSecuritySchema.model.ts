import { StringProperty } from '@glacier/schema';

export class BaseSecuritySchemaModel {
  @StringProperty({ isOptional: true })
  public declare description?: string;
}
