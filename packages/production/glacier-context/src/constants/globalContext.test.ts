import { globalContext } from './globalContext';
import { Context } from '../Context';

describe('globalContext', () => {
  it('should provide a global Context instance', () => {
    expect(globalContext).toBeInstanceOf(Context);
  });
});
