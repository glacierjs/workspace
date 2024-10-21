import { HttpMethod } from '@glacier/http';
import { REQUEST_HANDLER } from '../reflection/REQUEST_HANDLER';
import { RequestHandlerMeta } from '../interfaces/RequestHandlerMeta';

export function Put(meta: Omit<RequestHandlerMeta, 'method'> = {}): MethodDecorator {
  return (target, propertyKey) => {
    REQUEST_HANDLER.set({ ...meta, method: HttpMethod.PUT }, target, propertyKey);
  };
}
