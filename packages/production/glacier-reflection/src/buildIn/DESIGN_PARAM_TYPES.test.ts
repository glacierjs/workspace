import { DESIGN_PARAM_TYPES } from './DESIGN_PARAM_TYPES';
import { ReadonlyReflection } from '../ReadonlyReflection';

describe('DESIGN_PARAM_TYPES', () => {
  it('should export a predefined ReadonlyReflection instance', () => {
    expect(DESIGN_PARAM_TYPES).toBeInstanceOf(ReadonlyReflection);
  });
});
