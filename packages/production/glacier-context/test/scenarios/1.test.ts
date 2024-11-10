import { Context } from '../../src/Context';
import { globalContext } from '../../src/constants/globalContext';

it('should provide a global Context instance', () => {
  expect(globalContext).toBeInstanceOf(Context);
});
