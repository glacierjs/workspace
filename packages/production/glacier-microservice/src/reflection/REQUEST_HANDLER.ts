import { Reflection } from '@glacier/reflection';
import { RequestHandlerMeta } from '../interfaces/RequestHandlerMeta';

export const REQUEST_HANDLER = new Reflection<RequestHandlerMeta>('REQUEST_HANDLER');
