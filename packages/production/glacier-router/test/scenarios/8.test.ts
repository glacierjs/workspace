import { HttpMethod } from '@glacier/http/src/interfaces/HttpMethod';

import { Router } from '../../src/Router';

it('should resolve a variable', () => {
  const router = new Router();
  router.addRoute({
    path: '/users/:userId',
    method: HttpMethod.GET,
    value: '{{VALUE}}'
  });
  expect(
    router.getRoute({
      path: '/users/1234',
      method: HttpMethod.GET,
      headers: {}
    })
  ).toEqual({
    method: 'GET',
    path: '/users/:userId',
    value: '{{VALUE}}',
    variables: {
      userId: '1234'
    }
  });
});
