import { Config } from './Config';
import { MissingEnvironment } from './exception/MissingEnvironment';

describe('Config', () => {
  interface E {
    T: string;
  }

  describe('getOrThrow', () => {
    it('should throw an error if environment variable does not exist', () => {
      const config = new Config<E>();
      expect(() => {
        config.getOrThrow('T');
      }).toThrow(MissingEnvironment);
    });

    it('should return the environment variable if it exists', () => {
      const config = new Config<E>();
      process.env.T = '{{VALUE}}';
      expect(config.getOrThrow('T')).toBe('{{VALUE}}');
      delete process.env.T;
    });
  });

  describe('get', () => {
    it('should return undefined if environment variable does not exist', () => {
      const config = new Config<E>();
      expect(config.get('T')).toBeUndefined();
    });

    it('should return the environment variable if it exists', () => {
      const config = new Config<E>();
      process.env.T = '{{VALUE}}';
      expect(config.get('T')).toBe('{{VALUE}}');
      delete process.env.T;
    });

    it('should return the default value if the environment variable does not exist', () => {
      const config = new Config<E>();
      expect(config.get('T', '{{VALUE2}}')).toBe('{{VALUE2}}');
    });

    it('should infer a string environment variable', () => {
      const config = new Config<E>();
      process.env.T = '{{VALUE}}';
      expect(config.get('T', undefined, { type: 'string' })).toBe('{{VALUE}}');
      delete process.env.T;
    });

    it('should infer a number environment variable', () => {
      const config = new Config<E>();
      process.env.T = '3';
      expect(config.get('T', undefined, { type: 'number' })).toBe(3);
      delete process.env.T;
    });

    it('should infer a boolean environment variable', () => {
      const config = new Config<E>();
      process.env.T = 'true';
      expect(config.get('T', undefined, { type: 'boolean' })).toBe(true);
      delete process.env.T;
    });

    it('should infer a number as boolean environment variable', () => {
      const config = new Config<E>();
      process.env.T = '1';
      expect(config.get('T', undefined, { type: 'boolean' })).toBe(true);
      delete process.env.T;
    });

    it('should infer an array of strings environment variable', () => {
      const config = new Config<E>();
      process.env.T = '1,true,test';
      expect(config.get('T', undefined, { type: 'string', isArray: true })).toEqual([
        '1',
        'true',
        'test'
      ]);
      delete process.env.T;
    });
  });
});
