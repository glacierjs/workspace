import { HttpMethod } from '@glacier/http/src/interfaces/HttpMethod';

import { Router } from '../../src/Router';
import { MultipleRoutesFound } from '../../src/exceptions/MultipleRoutesFound';

it('should throw an error if multiple routes would match', () => {
  const router = new Router();
  router.addRoute({
    method: HttpMethod.GET,
    path: '/',
    value: '{{VALUE}}'
  });

  router.addRoute({
    method: HttpMethod.GET,
    path: '/',
    value: '{{VALUE}}'
  });

  expect(() => {
    router.getRoute({
      method: HttpMethod.GET,
      path: '/',
      headers: {}
    });
  }).toThrow(MultipleRoutesFound);
});
