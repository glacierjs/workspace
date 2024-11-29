import { ArrayProperty, StringProperty } from '@glacier/schema';

export class ServerVariableModel {
  @ArrayProperty({ type: 'string' }, { isOptional: true })
  public declare enum?: string[];

  @StringProperty()
  public declare default: string;

  @StringProperty({ isOptional: true })
  public declare description?: string;
}
