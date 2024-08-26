import type { Linter } from 'eslint';

export function buildPrettier(): Linter.ConfigOverride<Linter.RulesRecord> {
  return {
    files: ['*'],
    extends: ['plugin:prettier/recommended'],
    rules: {
      '@typescript-eslint/ban-types': 'off'
    }
  };
}
