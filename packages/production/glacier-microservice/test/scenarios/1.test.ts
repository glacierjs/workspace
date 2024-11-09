import { HttpResponse } from '@glacier/http';
import { Factory, Module } from '@glacier/ioc';
import { ConsoleTransport, LogFactory, LogLevel } from '@glacier/logger';
import request from 'supertest';

import { Microservice } from '../../src/Microservice';
import { Controller } from '../../src/decorators/Controller';
import { Get } from '../../src/decorators/Get';

it('should resolve a class by its constructor', async () => {
  @Controller()
  class ApplicationController {
    public constructor(logFactory: LogFactory) {
      const logger = logFactory.create('Application');
      logger.debug({ message: 'Create ApplicationController' });
    }

    @Get()
    public health(): HttpResponse {
      return HttpResponse.build();
    }
  }

  @Module({
    imports: [ApplicationController]
  })
  class ApplicationModule {
    @Factory({})
    public createLogger(): LogFactory {
      return new LogFactory({
        level: LogLevel.DEBUG,
        defaultMeta: {},
        transports: [new ConsoleTransport()]
      });
    }
  }

  const microservice = new Microservice(ApplicationModule);
  await request(microservice).get('/').expect(200);
});
