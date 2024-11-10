import { Context } from './Context';

describe('Context', () => {
  describe('run', () => {
    it('should execute a given function when called with run', () => {
      const context = new Context();
      const fn = jest.fn();
      context.run(fn);
      expect(fn).toHaveBeenCalledWith();
    });
  });

  describe('getContext', () => {
    it('should return undefined when getContext is called without any context', () => {
      const context = new Context();
      expect(context.getContext()).toBeUndefined();
    });

    it('should return a symbol when getContext is run inside a context', () => {
      const context = new Context();
      context.run(() => {
        expect(context.getContext()).toEqual(expect.any(Symbol));
      });
    });
  });

  describe('getId', () => {
    it('should return undefined if getId is called without any context', () => {
      const context = new Context();
      expect(context.getId()).toBeUndefined();
    });

    it('should return an id when getId is run inside a context', () => {
      const context = new Context();
      context.run(() => {
        expect(context.getId()).toEqual(expect.any(String));
      });
    });
  });
});
