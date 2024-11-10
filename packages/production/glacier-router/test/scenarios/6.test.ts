import { HttpMethod } from '@glacier/http/src/interfaces/HttpMethod';

import { Router } from '../../src/Router';
import { RouteNotFound } from '../../src/exceptions/RouteNotFound';

it('should throw an error if route has at least one wrong header value', () => {
  const router = new Router();
  router.addRoute({
    method: HttpMethod.GET,
    path: '/',
    headers: {
      a: ['1', '2']
    },
    value: '{{VALUE}}'
  });

  expect(() => {
    router.getRoute({
      method: HttpMethod.GET,
      path: '/',
      headers: { a: ['1'] }
    });
  }).toThrow(RouteNotFound);
});
