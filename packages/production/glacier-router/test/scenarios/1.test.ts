import { HttpMethod } from '@glacier/http/src/interfaces/HttpMethod';

import { Router } from '../../src/Router';

it('should route a simple GET request', () => {
  const router = new Router();
  router.addRoute({
    path: '/',
    method: HttpMethod.GET,
    value: '{{VALUE}}'
  });
  expect(
    router.getRoute({
      path: '/',
      method: HttpMethod.GET,
      headers: {}
    })
  ).toEqual({
    method: 'GET',
    path: '/',
    value: '{{VALUE}}',
    variables: {}
  });
});
