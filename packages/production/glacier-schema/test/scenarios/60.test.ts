import { Validator } from '../../src/Validator';
import { LiteralProperty } from '../../src/decorators/LiteralProperty';
import { UnionProperty } from '../../src/decorators/UnionProperty';

it('should throw an error if not all union items has a literal discriminator property', () => {
  class U1 {
    @LiteralProperty('1')
    public declare type: '1';
  }

  class U2 {
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

  expect(() => {
    const validator = new Validator();
    validator.parse(A, { a: { type: '3' } } as any);
  }).toThrow();
});
