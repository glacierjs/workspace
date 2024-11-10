import { DESIGN_TYPE } from './DESIGN_TYPE';
import { ReadonlyReflection } from '../ReadonlyReflection';

describe('DESIGN_TYPE', () => {
  it('should export a predefined ReadonlyReflection instance', () => {
    expect(DESIGN_TYPE).toBeInstanceOf(ReadonlyReflection);
  });
});
