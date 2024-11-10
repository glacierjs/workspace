import { HttpMethod } from '@glacier/http/src/interfaces/HttpMethod';

import { Router } from '../../src/Router';
import { RouteNotFound } from '../../src/exceptions/RouteNotFound';

it('should throw an error if route is only partially correct', () => {
  const router = new Router();
  router.addRoute({
    method: HttpMethod.GET,
    path: '/a/b/c',
    value: '{{VALUE}}'
  });

  expect(() => {
    router.getRoute({ method: HttpMethod.GET, path: '/a/b', headers: {} });
  }).toThrow(RouteNotFound);
});
