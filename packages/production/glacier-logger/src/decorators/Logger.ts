import { Inject } from '@glacier/ioc';
import { TAG_LOGGER } from '../constants/TAG_LOGGER';

export function Logger(context: string): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    Inject(TAG_LOGGER)(target, propertyKey, parameterIndex);
  }
}
