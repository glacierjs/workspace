import { InvalidRouteMethod } from './exceptions/InvalidRouteMethod';
import { MultipleRoutesFound } from './exceptions/MultipleRoutesFound';
import { RouteNotFound } from './exceptions/RouteNotFound';
import type { ResolvedRoute } from './interfaces/ResolvedRoute';
import type { RouteDefinition } from './interfaces/RouteDefinition';
import type { RouteRequest } from './interfaces/RouteRequest';
import { RouterTrie } from './models/RouterTrie';
import { compareArray } from '@glacier/utils';

export class Router<T> {
  private readonly routerTrie = new RouterTrie<RouteDefinition<T>>();

  public addRoute(route: RouteDefinition<T>): this {
    this.routerTrie.insert(route.path, route);
    return this;
  }

  public getRoute(request: RouteRequest): ResolvedRoute<T> {
    const result = this.routerTrie.find(request.path);
    if (result === undefined) {
      throw new RouteNotFound(request);
    }

    const matchingMethodRoutes = result.values.filter(
      (route) => route.method === request.method
    );

    if (matchingMethodRoutes.length === 0) {
      throw new InvalidRouteMethod();
    }

    const matchingRoutes = matchingMethodRoutes.filter((route) => {
      if (route.method !== request.method) {
        return false;
      }

      if (route.headers) {
        const entries = Object.entries(route.headers);
        for (const [name, value] of entries) {
          const a1 = Array.isArray(value) ? value : [value];
          const a2 = Array.isArray(request.headers[name]) ? request.headers[name] : [request.headers[name]];

          if (!compareArray(a1, a2)) {
            return false;
          }
        }
      }

      return true;
    });

    if (matchingRoutes.length === 0) {
      throw new RouteNotFound(request);
    }

    if (matchingRoutes.length > 1) {
      throw new MultipleRoutesFound(matchingRoutes);
    }

    return {
      variables: result.variables,
      ...result.values[0]
    };
  }
}
