import type { AbstractConstructor } from '@glacier/utils';

import { IOC_CONSTRUCTOR_PARAM } from '../reflection/IOC_CONSTRUCTOR_PARAM';

export function ResolveOrThrow(target: AbstractConstructor): ParameterDecorator {
  return (constructor, _, parameterIndex) => {
    IOC_CONSTRUCTOR_PARAM.set(
      parameterIndex,
      { target, isArray: false, isOptional: false },
      constructor
    );
  };
}
