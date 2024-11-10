import { HttpMethod } from '@glacier/http/src/interfaces/HttpMethod';

import { Router } from '../../src/Router';
import { InvalidRouteMethod } from '../../src/exceptions/InvalidRouteMethod';

it('should throw an error if route has the wrong method', () => {
  const router = new Router();
  router.addRoute({
    method: HttpMethod.PUT,
    path: '/',
    headers: {},
    value: '{{VALUE}}'
  });
  expect(() => {
    router.getRoute({ method: HttpMethod.GET, path: '/', headers: {} });
  }).toThrow(InvalidRouteMethod);
});
