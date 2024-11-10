import { HttpMethod } from '@glacier/http/src/interfaces/HttpMethod';

import { Router } from '../../src/Router';

it('should resolve multiple variables', () => {
  const router = new Router();
  router.addRoute({
    path: '/users/:userId/teams/:teamId',
    method: HttpMethod.GET,
    value: '{{VALUE}}'
  });
  expect(
    router.getRoute({
      path: '/users/1234/teams/123',
      method: HttpMethod.GET,
      headers: {}
    })
  ).toEqual({
    method: 'GET',
    path: '/users/:userId/teams/:teamId',
    value: '{{VALUE}}',
    variables: {
      userId: '1234',
      teamId: '123'
    }
  });
});
