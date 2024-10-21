import { Module } from '@glacier/ioc';
import { Controller } from '../../src/decorators/Controller';
import { Get } from '../../src/decorators/Get';
import { HttpResponse } from '@glacier/http';
import { Microservice } from '../../src/Microservice';
import request from 'supertest';
import { Logger } from '@glacier/logger';

it('should resolve a class by its constructor', async () => {
  @Controller()
  class ApplicationController {

    public constructor(
      private readonly logger: Logger
    ) {
      logger.setContext('Application');
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

  }


  const microservice = new Microservice(ApplicationModule);
  await request(microservice).get('/').expect(200);
});
