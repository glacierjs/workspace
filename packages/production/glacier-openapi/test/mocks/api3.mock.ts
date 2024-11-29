import type { OpenAPIModel } from '../../src/models/OpenAPI.model';

export const api3Mock: OpenAPIModel = {
  openapi: '3.1.0',
  info: {
    title: 'Mock API',
    version: '1.0.0'
  },
  paths: {
    '/v1': {
      get: {
        callbacks: {
          myEvent: {
            '/callback': {
              post: {}
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      Schema1: {
        type: 'array',
        unevaluatedItems: true,
        prefixItems: [{ type: 'string' }],
        contains: {
          type: 'string'
        }
      },
      Schema2: {
        patternProperties: {
          get: { type: 'string' }
        },
        anyOf: [{ type: 'string' }, { type: 'boolean' }],
        not: {
          type: 'string',
          pattern: '1234'
        }
      }
    }
  }
};
