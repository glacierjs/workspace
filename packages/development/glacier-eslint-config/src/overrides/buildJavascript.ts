import type { Linter } from 'eslint';

export function buildJavascript(): Linter.ConfigOverride<Linter.RulesRecord> {
  return {
    files: ['*'],
    plugins: ['only-error', 'sonarjs'],
    extends: [
      'eslint:recommended',
      'plugin:sonarjs/recommended-legacy',
      'plugin:unicorn/recommended'
    ],
    env: {
      browser: true,
      node: true
    },
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module'
    },
    rules: {
      'max-lines': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/prefer-switch': 'off',
      'unicorn/no-object-as-default-parameter': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/numeric-separators-style': 'off',
      'unicorn/prefer-ternary': 'off',
      'sonarjs/prefer-single-boolean-return': 'off',
      'sonarjs/cognitive-complexity': ['error', 5],
      'unicorn/no-array-for-each': 'off'
    }
  };
}
