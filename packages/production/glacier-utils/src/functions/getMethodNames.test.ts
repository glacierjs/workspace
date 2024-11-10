import { getMethodNames } from './getMethodNames';

describe('getMethodNames', () => {
  it('should return an empty array if class has no methods', () => {
    class A {}
    expect(getMethodNames(A)).toEqual([]);
  });

  it('should return all methods of the class', () => {
    class A {
      getA() {
        throw new Error('Not Implemented');
      }
      getB() {
        throw new Error('Not Implemented');
      }
    }

    expect(getMethodNames(A)).toEqual(['getA', 'getB']);
  });

  it('should return all methods of parent class', () => {
    class A {
      getA() {
        throw new Error('Not Implemented');
      }
      getB() {
        throw new Error('Not Implemented');
      }
    }

    class B extends A {
      getC() {
        throw new Error('Not Implemented');
      }
    }

    expect(getMethodNames(B)).toEqual(['getC', 'getA', 'getB']);
  });
});
