import { RecordProperty, StringProperty } from '@glacier/schema';

export class Oauth2BaseFlow {
  @RecordProperty({
    key: { type: 'string' },
    value: { type: 'string' }
  })
  public declare scopes: Record<string, string>;

  @StringProperty({ isOptional: true })
  public declare refreshUrl?: string;
}
