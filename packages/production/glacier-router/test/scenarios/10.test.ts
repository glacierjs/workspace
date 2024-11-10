import { HttpMethod } from '@glacier/http/src/interfaces/HttpMethod';

import { Router } from '../../src/Router';

it('should resolve static paths before variables', () => {
  const router = new Router();
  router.addRoute({
    path: '/users/:userId',
    method: HttpMethod.GET,
    value: '{{VALUE1}}'
  });
  router.addRoute({
    path: '/users/123',
    method: HttpMethod.GET,
    value: '{{VALUE2}}'
  });
  expect(
    router.getRoute({
      path: '/users/123',
      method: HttpMethod.GET,
      headers: {}
    })
  ).toEqual({
    method: 'GET',
    path: '/users/123',
    value: '{{VALUE2}}',
    variables: {}
  });
});
