import { InvalidInjectTarget } from '../exceptions/InvalidInjectTarget';
import { IOC_CONSTRUCTOR_TAG } from '../reflection/IOC_CONSTRUCTOR_TAG';

export function Inject(tag: symbol): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (propertyKey !== undefined) {
      throw new InvalidInjectTarget();
    }
    IOC_CONSTRUCTOR_TAG.set(parameterIndex, tag, target);
  };
}
