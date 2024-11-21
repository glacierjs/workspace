import type { Linter } from 'eslint';

export function buildImport(): Linter.ConfigOverride<Linter.RulesRecord> {
  return {
    files: ['*'],
    plugins: ['import'],
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts']
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true
        }
      }
    },
    rules: {
      'import/dynamic-import-chunkname': 'warn',
      'import/export': 'error',
      'import/first': 'error',
      'import/named': 'error',
      'import/newline-after-import': 'warn',
      'import/no-amd': 'error',
      'import/no-anonymous-default-export': 'error',
      'import/no-default-export': 'warn',
      'import/no-duplicates': 'warn',
      'import/no-dynamic-require': 'warn',
      'import/no-mutable-exports': 'error',
      'import/no-named-default': 'error',
      'import/no-namespace': 'error',
      'import/no-unresolved': 'warn',
      'import/no-unused-modules': 'warn',
      'import/no-webpack-loader-syntax': 'error',
      'import/order': [
        'warn',
        {
          alphabetize: {
            order: 'asc',
            caseInsensitive: false
          },
          groups: [['builtin', 'external', 'internal'], ['unknown', 'parent', 'sibling'], 'index'],
          'newlines-between': 'always',
          warnOnUnassignedImports: false
        }
      ]
    }
  };
}
