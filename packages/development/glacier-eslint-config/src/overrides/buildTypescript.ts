import type { Linter } from 'eslint';

export function buildTypescript(): Linter.ConfigOverride<Linter.RulesRecord> {
  return {
    files: ['**/*.ts'],
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking'
    ],
    parserOptions: {
      project: './tsconfig.json'
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports'
        }
      ]
    }
  };
}
