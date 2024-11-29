import { RecordProperty, StringProperty } from '@glacier/schema';

export class DiscriminatorModel {
  @StringProperty()
  public declare propertyName: string;

  @RecordProperty({
    isOptional: true,
    key: { type: 'string' },
    value: { type: 'string' }
  })
  public declare mapping?: Record<string, string>;
}
