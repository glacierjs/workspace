import type { CookieParameterModel } from './CookieParameter.model';
import type { HeaderParameterModel } from './HeaderParameter.model';
import type { PathParameterModel } from './PathParameter.model';
import type { QueryParameterModel } from './QueryParameter.model';

export type ParameterModel =
  | QueryParameterModel
  | HeaderParameterModel
  | CookieParameterModel
  | PathParameterModel;
