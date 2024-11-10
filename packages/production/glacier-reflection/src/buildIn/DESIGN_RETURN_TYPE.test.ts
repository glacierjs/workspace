import { DESIGN_RETURN_TYPE } from './DESIGN_RETURN_TYPE';
import { ReadonlyReflection } from '../ReadonlyReflection';

describe('DESIGN_RETURN_TYPE', () => {
  it('should export a predefined ReadonlyReflection instance', () => {
    expect(DESIGN_RETURN_TYPE).toBeInstanceOf(ReadonlyReflection);
  });
});
