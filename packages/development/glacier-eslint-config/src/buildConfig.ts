import type { Linter } from 'eslint';

import { buildImport } from './overrides/buildImport';
import { buildJavascript } from './overrides/buildJavascript';
import { buildPrettier } from './overrides/buildPrettier';
import { buildTests } from './overrides/buildTests';
import { buildTypescript } from './overrides/buildTypescript';

export function buildConfig(): Linter.Config {
  return {
    overrides: [buildJavascript(), buildTypescript(), buildImport(), buildPrettier(), buildTests()]
  };
}
