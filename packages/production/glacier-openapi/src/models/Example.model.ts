import { StringProperty } from '@glacier/schema';

export class ExampleModel {
  @StringProperty({ isOptional: true })
  public declare summary?: string;

  @StringProperty({ isOptional: true })
  public declare description?: string;

  @StringProperty({ isOptional: true })
  public declare value?: string;

  @StringProperty({ isOptional: true })
  public declare externalValue?: string;
}
