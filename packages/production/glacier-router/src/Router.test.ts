import { HttpMethod } from '@glacier/http';

import { Router } from './Router';

describe('Router', () => {
  it('should route a single route', () => {
    const router = new Router<string>();
    router.addRoute({ method: HttpMethod.GET, path: '/', value: '{{TEST}}' });
    const route = router.getRoute({
      method: HttpMethod.GET,
      path: '/',
      headers: {}
    });
    expect(route).toEqual({
      method: HttpMethod.GET,
      path: '/',
      value: '{{TEST}}',
      variables: {}
    });
  });
});
