import { Validator } from '../../src/Validator';
import { LiteralProperty } from '../../src/decorators/LiteralProperty';
import { UnionProperty } from '../../src/decorators/UnionProperty';

it('should invalidate an union property if value has an incorrect type', () => {
  class U1 {
    @LiteralProperty('1')
    public declare type: '1';
  }

  class U2 {
    @LiteralProperty('2')
    public declare type: '2';
  }

  class A {
    @UnionProperty({
      property: 'type',
      items: [
        { type: 'object', schema: U1 },
        { type: 'object', schema: U2 }
      ]
    })
    public declare a: U1 | U2;
  }
  const validator = new Validator();
  const result = validator.parse(A, { a: 3 } as any);
  expect(result.isValid).toBe(false);
});