import { globalContext } from '@glacier/context';
import type { HttpRequestHandler } from '@glacier/http';
import { createRequestListener, HttpResponse } from '@glacier/http';
import { DIContainer } from '@glacier/ioc';
import { RouteNotFound, Router } from '@glacier/router';
import type { Constructor } from '@glacier/utils';
import { getMethodNames } from '@glacier/utils';
import { Server } from 'node:http';

import { AbstractController } from './entities/AbstractController';
import { AbstractExceptionHandler } from './entities/AbstractExceptionHandler';
import { AbstractFallbackHandler } from './entities/AbstractFallbackHandler';
import { CONTROLLER_META } from './reflection/CONTROLLER_META';
import { REQUEST_HANDLER } from './reflection/REQUEST_HANDLER';

export class Microservice extends Server {
  private readonly rootModule: Constructor;

  public constructor(rootModule: Constructor) {
    super();
    this.rootModule = rootModule;
    const listener = this.createListener();
    this.on('request', listener);
  }

  private createListener() {
    const container = new DIContainer();
    container.register(this.rootModule, this.rootModule);
    const router = new Router<HttpRequestHandler>();
    const controllers = container.resolveAll(AbstractController);

    for (const controller of controllers) {
      const methodNames = getMethodNames(controller.constructor);
      const controllerMeta = CONTROLLER_META.get(controller.constructor);
      if (!controllerMeta) {
        continue;
      }

      for (const methodName of methodNames) {
        const requestHandlerMeta = REQUEST_HANDLER.get(controller, methodName);
        if (requestHandlerMeta) {
          const resolvedPath = [
            controllerMeta.path ?? '/',
            requestHandlerMeta.path
          ]
            .filter(Boolean)
            .join('');
          router.addRoute({
            method: requestHandlerMeta.method,
            path: resolvedPath,
            value: (controller as any)[methodName].bind(controller)
          });
        }
      }
    }
    const fallbackHandlers = container.resolveAll(AbstractFallbackHandler);
    const fallbackHandler = fallbackHandlers.at(0);
    if (fallbackHandlers.length > 1) {
      throw new Error('More then one fallback handler has been defined');
    }

    const exceptionHandlers = container.resolveAll(AbstractExceptionHandler);
    const exceptionHandler = exceptionHandlers.at(0);
    if (exceptionHandlers.length > 1) {
      throw new Error('More then one exception handler has been defined');
    }

    return createRequestListener((req) => {
      try {
        const requestHandler = router.getRoute({
          path: req.url.pathname,
          method: req.method,
          headers: req.headers.getAll()
        });
        return globalContext.run(() => requestHandler.value(req));
      } catch (error) {
        if (error instanceof RouteNotFound) {
          if (fallbackHandler) {
            try {
              return fallbackHandler.respond(req);
            } catch (error) {
              if (error instanceof Error && exceptionHandler) {
                try {
                  return exceptionHandler.respond(req, error);
                } catch {
                  return new HttpResponse().setStatus(500);
                }
              } else {
                return new HttpResponse().setStatus(500);
              }
            }
          } else {
            return new HttpResponse().setStatus(404);
          }
        }
        if (error instanceof Error && exceptionHandler) {
          try {
            return exceptionHandler.respond(req, error);
          } catch {
            return new HttpResponse().setStatus(500);
          }
        } else {
          return new HttpResponse().setStatus(500);
        }
      }
    });
  }
}
