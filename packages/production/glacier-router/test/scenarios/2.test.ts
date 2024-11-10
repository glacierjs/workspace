import { HttpMethod } from '@glacier/http/src/interfaces/HttpMethod';

import { Router } from '../../src/Router';
import { RouteNotFound } from '../../src/exceptions/RouteNotFound';

it('should throw an error if route could not be resolved', () => {
  const router = new Router();
  expect(() => {
    router.getRoute({ method: HttpMethod.GET, path: '/', headers: {} });
  }).toThrow(RouteNotFound);
});
