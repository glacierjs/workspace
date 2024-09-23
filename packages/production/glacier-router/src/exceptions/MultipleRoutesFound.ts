import type { RouteDefinition } from '../interfaces/RouteDefinition';

export class MultipleRoutesFound extends Error {
  public constructor(routeDefinition: RouteDefinition<unknown>[]) {
    super('Found more then one matching route');
    this.name = 'MultipleRoutesFound';
    this.cause = routeDefinition;
  }
}
