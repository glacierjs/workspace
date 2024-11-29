import type { OpenAPIModel } from '../../src/models/OpenAPI.model';

export const api2Mock: OpenAPIModel = {
  openapi: '3.1.0',
  info: {
    title: 'intent-service',
    description:
      'EN: The API to obtain and manipulate mortgage-intents. A mortgage-intent consists of the persons applying for the mortgage and  estates for which the mortgage shall be obtained or which shall be used as collateral in the mortgage.<br> All methods are access-restricted and require a valid JWT Access-Token and a valid JWT Data-Access-Token for the intent\n',
    contact: {
      name: 'Squad Advisory Excellence',
      url: 'https://atlas.interhyp.de/confluence/display/DP/advisory',
      email: '_DPT_Squad_AdvisoryExcellence@interhyp.de'
    },
    version: '0.189.0'
  },
  servers: [
    {
      url: 'https://api.ehyphome.de/mortgage-intent/v1',
      description: 'Production'
    },
    {
      url: 'https://api-acc.ehyphome.de/mortgage-intent/v1',
      description: 'Acceptance'
    },
    {
      url: 'https://api-dev.ehyphome.de/mortgage-intent/v1',
      description: 'Dev Stage'
    }
  ],
  tags: [
    {
      name: 'intent',
      description: 'intent'
    }
  ],
  security: {
    ApiKey: [],
    BearerAuth: []
  },
  paths: {
    '/info': {
      get: {
        summary: 'Get API service status and info',
        description:
          'Delivers information about API service status and basic information about the current version',
        operationId: 'getServiceInfo',
        tags: ['Info'],
        responses: {
          '200': {
            description: 'Service Info is returned',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ServiceInfo'
                },
                example: {
                  apiSpecificationVersion: '0.0.1'
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized - Missing or invalid authorization',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SimpleErrorResponse'
                }
              }
            }
          }
        }
      }
    },
    '/intents': {
      post: {
        operationId: 'createIntent',
        summary: 'create a new intent',
        description:
          'DE: Erstellt einen neuen Baufinanzierungs-Intent.<br/>\n    Ein Intent kann initial zwar ganz ohne Personen und Immobilien angelegt werden, um ihn sinnvoll verwenden zu können gilt allerdings:\n    Der Intent muss mindestens eine Person vom Typ APPLICANT unter personParams und ein Objekt als Eintrag unter estateParams enthalten.\n    Ein Objekt muss - aus technischer Sicht - die Felder ownership und estate.type gesetzt haben, bei mindestens einem Objekt - \n    bei dem zu finanzierende Objekt - muss auch der projectType gesetzt sein. Der projectType muss zu der ownership passen.\n    Eine Person kann - aus technischer Sicht - leer sein, dann wird der Typ auf APPLICANT gesetzt. <br/>\nEN: Creates a new mortgage-intent.<br/>\n    An Intent can initially be created without persons and estates, but to use it meaningful, please note:\n    The intent must contain at least one person of type APPLICANT as entry under personParams and one estate as entry under estateParams.\n    An estate must - as technical minimum requirement - contain the fields ownership and estate.type. At least one estate must also \n    contain the field projectType denoting this estate as the estate a mortgage is required for. ProjectType must not contradict ownership.\n    A person might be - from a technical perspective - empty, then its type will be defaulted to APPLICANT.\n',
        tags: ['intent'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/IntentCreationRequest'
              }
            }
          }
        },
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Intent'
                }
              }
            },
            description:
              'DE: Ein neuer Intent wurde angelegt und ist in der response enthalten.<br/> EN: The Intent was created, the response contains the newly created Intent.\n'
          },
          '400': {
            description:
              'DE: Die übergebenen Daten entsprechen nicht dem in der API spec geforderten Format.<br/> EN: the data passed to the method does not correspond to the format required by this API spec.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized - Missing or invalid authorization',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SimpleErrorResponse'
                }
              }
            }
          },
          '403': {
            description: 'Forbidden - Authorized but not allowed to execute this action.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          },
          '422': {
            description:
              'DE: Die übergebenen Daten können nicht als Intent verarbeitet werden. z.B. sind die Daten widersprüchlich oder unzureichend.<br/> EN: The data passed to the method correspond to the API spec but still can not be processed as intent. This might be due to inconsistencies or insufficient data.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          }
        }
      },
      get: {
        operationId: 'searchByCaseId',
        deprecated: true,
        summary:
          'search for intent by human-readable case ID [DEPRECATED] Please use lookup-endpoint instead - https://bitbucket.interhyp.de/bitbucket/projects/BACKEND/repos/intent-service-api/browse/docs/Apis/IntentApi.md#getIntentInfoByCaseId\n',
        description:
          'DE: Sucht nach einem Baufinanzierungs-Intent mit der übergebenen Case-ID (numerische ID für die menschliche Kommunikation über diesen Intent). Für einen erfolgreichen Zugriff muss der Aufrufer für den Zugriff auf diesen Intent autorisiert sein.<br/> [DEPRECATED] Bitte stattdessen lookup-endpoint verwenden - https://bitbucket.interhyp.de/bitbucket/projects/BACKEND/repos/intent-service-api/browse/docs/Apis/IntentApi.md#getIntentInfoByCaseId EN: Search for an intent with the given case-id (human readable id). Only returns a result if the caller is authorized to view this intent. [DEPRECATED] Please use lookup-endpoint instead - https://bitbucket.interhyp.de/bitbucket/projects/BACKEND/repos/intent-service-api/browse/docs/Apis/IntentApi.md#getIntentInfoByCaseId\n',
        tags: ['intent'],
        parameters: [
          {
            name: 'caseId',
            in: 'query',
            required: true,
            description:
              'DE: die numerische, von Menschen lesbare id (früher case-id oder app-id)<br/> EN: the numerical, human-readable id (formerly known as case-id or app-id)\n',
            schema: {
              type: 'integer',
              format: 'int64'
            }
          }
        ],
        responses: {
          '200': {
            description: 'found the intent',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  maxItems: 10,
                  items: {
                    $ref: '#/components/schemas/Intent'
                  }
                }
              }
            }
          },
          '400': {
            description:
              'DE: Die übergebenen Daten können nicht als Case-ID interpretiert werden.<br/> EN: the data passed to the method can not be interpreted as Case-ID.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized - Missing or invalid authorization',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SimpleErrorResponse'
                }
              }
            }
          },
          '403': {
            description: 'Forbidden - Authorized but not allowed to execute this action.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          },
          '404': {
            description: 'Not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          }
        }
      }
    },
    '/intents/export': {
      get: {
        operationId: 'exportIntents',
        summary: 'retrieve all intents according to the filter criteria',
        description:
          'EN: Retrieves all intents according to the filter criteria.<br/>\n    Omitting the query parameters will return all intents.<br/>\n    The company-id, extracted from the JWT Token used to access this endpoint is always applied as a filter.<br/>\n    This Endpoint supports / enforces pagination. Pagesize is determined by the <i>limit</i> parameter. \n    You can navigate the results by using the after or before parameters with the corresponding values returned from the previous call.\n    If no <i>after</i> property is returned there are no more results, if no <i>before</i> property is returned there are no previous results.\n    When navigating you also have to pass the same query parameters you passed initially.\n',
        tags: ['intent'],
        parameters: [
          {
            name: 'createdAfter',
            in: 'query',
            description:
              'EN: Filter for intents created on or after this point in time as UTC date-time value<br/>\n    Defined by date-time - [RFC3339](https://xml2rfc.tools.ietf.org/public/rfc/html/rfc3339.html#anchor14).\n',
            schema: {
              type: 'string',
              format: 'date-time',
              example: '2019-12-29T10:22:50Z'
            }
          },
          {
            name: 'createdUntil',
            in: 'query',
            description:
              'EN: Filter for intents created before this point in time as UTC date-time value<br/>\n    Defined by date-time - [RFC3339](https://xml2rfc.tools.ietf.org/public/rfc/html/rfc3339.html#anchor14).\n',
            schema: {
              type: 'string',
              format: 'date-time',
              example: '2019-12-29T10:22:50Z'
            }
          },
          {
            name: 'updatedAfter',
            in: 'query',
            description:
              'EN: Filter for intents updated on or after this point in time as UTC date-time value<br/>\n    Defined by date-time - [RFC3339](https://xml2rfc.tools.ietf.org/public/rfc/html/rfc3339.html#anchor14).\n',
            schema: {
              type: 'string',
              format: 'date-time',
              example: '2019-12-29T10:22:50Z'
            }
          },
          {
            name: 'updatedUntil',
            in: 'query',
            description:
              'EN: Filter for intents updated before this point in time as UTC date-time value<br/>\n    Defined by date-time - [RFC3339](https://xml2rfc.tools.ietf.org/public/rfc/html/rfc3339.html#anchor14).\n',
            schema: {
              type: 'string',
              format: 'date-time',
              example: '2019-12-29T10:22:50Z'
            }
          },
          {
            name: 'status',
            in: 'query',
            description: 'EN: Filter for a certain status.\n',
            schema: {
              allOf: [
                {
                  $ref: '#/components/schemas/IntentStatus'
                }
              ]
            }
          },
          {
            name: 'embed',
            in: 'query',
            description:
              'EN: Size of the result. The basic, flat intent data structure including the process object is always returned (even with this set to NONE).\n    When using PERSONS, ESTATES the persons collection or estates collection object are included\n    respectively. If you need the full intent then ALL is the way to go (also applies as default when completely omitting this parameter)\n',
            schema: {
              type: 'string',
              default: 'NONE',
              enum: ['ALL', 'PERSONS', 'ESTATES', 'NONE']
            }
          },
          {
            name: 'limit',
            in: 'query',
            description:
              'DE: Maximale Anzahl der Datensätze<br/> EN: maximum number of records returned\n',
            schema: {
              type: 'integer',
              maximum: 100,
              minimum: 1,
              default: 10
            }
          },
          {
            name: 'cursorBefore',
            in: 'query',
            description:
              'This is the cursor that points to the start of the page of data that has been returned.\n',
            schema: {
              type: 'string',
              maxLength: 100
            }
          },
          {
            name: 'cursorAfter',
            in: 'query',
            description:
              'This is the cursor that points to the end of the page of data that has been returned.\n',
            schema: {
              type: 'string',
              maxLength: 100
            }
          }
        ],
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Intents'
                }
              }
            },
            description: 'successfully performed query - even though the result might be empty'
          },
          '400': {
            description:
              'DE: Die übergebenen Daten können nicht als Case-ID interpretiert werden.<br/> EN: the data passed to the method can not be interpreted as Case-ID.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized - Missing or invalid authorization',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SimpleErrorResponse'
                }
              }
            }
          },
          '403': {
            description: 'Forbidden - Authorized but not allowed to execute this action.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          }
        }
      }
    },
    '/intents/filter': {
      post: {
        description:
          'Returns a list of intents matching the filters criteria - this endpoint will only be available temporarily and will be replaced by a more general approach in the future',
        summary:
          'Returns a list of intents matching the filters criteria - this endpoint will only be available temporarily and will be replaced by a more general approach in the future',
        deprecated: true,
        operationId: 'filterForIntents',
        tags: ['intent'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/FilterRequest'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/FilterResponse'
                }
              }
            }
          },
          '400': {
            description:
              'DE: Die übergebenen Daten entsprechen nicht dem in der API spec geforderten Format.<br/> EN: the data passed to the method does not correspond to the format required by this API spec.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized - Missing or invalid authorization',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SimpleErrorResponse'
                }
              }
            }
          },
          '403': {
            description: 'Forbidden - Authorized but not allowed to execute this action.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          }
        }
      }
    },
    '/intents/info': {
      get: {
        operationId: 'intentsOfAuthenticatedUser',
        summary: 'IntentInfo for the authenticated customer',
        description:
          'DE: Holt eine Liste mit IntentInfos für alle Intents des angemeldeten Endkunden. Eine leere Liste, wenn der angemeldete User kein Kunde ist.<br/> EN: list all intents of authenticated user - if the user is a customer - or an empty list if the user is no customer\n',
        tags: ['intent'],
        responses: {
          '200': {
            description: 'found the intent',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/IntentInfo'
                  }
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized - Missing or invalid authorization',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SimpleErrorResponse'
                }
              }
            }
          },
          '403': {
            description: 'Forbidden - Authorized but not allowed to execute this action.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          }
        }
      }
    },
    '/intents/intent-info': {
      get: {
        operationId: 'getIntentInfoByCaseId',
        summary: 'get a shallow info object for the intent by caseId',
        description:
          'DE: Holt das IntentInfo Objekt für den Intent mit der caseId. Nur wenn der angemeldete User auf den Intent berechtigt ist. <br/> EN: get a shallow info object of a single intent identified by the caseId. (success of this method is restricted by the performing entities rights to access this intent)\n',
        tags: ['intent'],
        parameters: [
          {
            name: 'caseId',
            in: 'query',
            required: true,
            schema: {
              type: 'integer',
              format: 'int64'
            },
            example: 27158002,
            description:
              'the caseId of the intent (the numerical, human-readable id (formerly known as case-id or app-id))'
          }
        ],
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/IntentInfo'
                }
              }
            },
            description: 'found intent.'
          },
          '400': {
            description:
              'DE: Die übergebenen Daten können nicht als Case-ID interpretiert werden.<br/> EN: the data passed to the method can not be interpreted as Case-ID.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized - Missing or invalid authorization',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SimpleErrorResponse'
                }
              }
            }
          },
          '403': {
            description: 'Forbidden - Authorized but not allowed to execute this action.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          },
          '404': {
            description: 'Not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          }
        }
      }
    },
    '/intents/mine': {
      get: {
        operationId: 'intentsOfAuthenticatedCustomer',
        summary:
          'List of (incomplete) intents for the authenticated customer to obtain the key facts about the intent',
        description:
          'DE: Holt eine Liste mit Key-Facts zu allen Intents des angemeldeten Endkunden. Eine leere Liste, wenn der angemeldete User kein Kunde ist.<br/> EN: list of key-facts for all intents of authenticated user - if the user is a customer - or an empty list if the user is no customer\n',
        tags: ['intent'],
        parameters: [
          {
            name: 'limit',
            in: 'query',
            description:
              'DE: Maximale Anzahl der Datensätze<br/> EN: maximum number of records returned\n',
            schema: {
              type: 'integer',
              maximum: 100,
              minimum: 1,
              default: 10
            }
          },
          {
            name: 'cursorBefore',
            in: 'query',
            description:
              'This is the cursor that points to the start of the page of data that has been returned.\n',
            schema: {
              type: 'string',
              maxLength: 100
            }
          },
          {
            name: 'cursorAfter',
            in: 'query',
            description:
              'This is the cursor that points to the end of the page of data that has been returned.\n',
            schema: {
              type: 'string',
              maxLength: 100
            }
          }
        ],
        responses: {
          '200': {
            description: 'found the intents',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/IntentFacts'
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized - Missing or invalid authorization',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SimpleErrorResponse'
                }
              }
            }
          },
          '403': {
            description: 'Forbidden - Authorized but not allowed to execute this action.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          }
        }
      }
    },
    '/intents/{id}': {
      get: {
        operationId: 'getIntent',
        summary: 'get the intent with this id.',
        description:
          'DE: liefert den durch die ID identifizierten Intent zurück, wenn der Aufrufer auf den Intent berechtigt ist.<br/> EN: get a single intent identified by the id (success of this method is restricted by the performing entities rights to access this intent)\n',
        tags: ['intent'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Intent'
                }
              }
            },
            description: 'found intent'
          },
          '400': {
            description:
              'DE: Die übergebenen Daten entsprechen nicht dem in der API spec geforderten Format.<br/> EN: the data passed to the method does not correspond to the format required by this API spec.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized - Missing or invalid authorization',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SimpleErrorResponse'
                }
              }
            }
          },
          '403': {
            description: 'Forbidden - Authorized but not allowed to execute this action.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          },
          '404': {
            description: 'Not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          }
        }
      },
      patch: {
        operationId: 'patchIntent',
        summary: 'patch an existing intent',
        description:
          'DE: Aktualisiert/Ändert den durch die ID identifizierten Intent indem der **jsonPatch** auf die Datenstruktur des Intent angewendet wird. Der Intent nach Anwenden des Patches muss entsprechend dem Schema für einen Intent valide sein, sonst wird die Anfrage abgewiesen.<br/> EN: *partially* update an existing intent. uses **jsonPatch** format to define the changes. The intent resulting from applying the patch to the existing intent must conform to the validity rules defined in the intent schema, else the call is rejected\n',
        tags: ['intent'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/PatchRequest'
                }
              }
            }
          }
        },
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Intent'
                }
              }
            },
            description: 'patched intent'
          },
          '400': {
            description:
              'DE: Die übergebenen Daten entsprechen nicht dem in der API spec geforderten Format.<br/> EN: the data passed to the method does not correspond to the format required by this API spec.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized - Missing or invalid authorization',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SimpleErrorResponse'
                }
              }
            }
          },
          '403': {
            description: 'Forbidden - Authorized but not allowed to execute this action.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          },
          '404': {
            description:
              'DE: der zu patchende Intent wurde nicht gefunden<br/> EN: could not find the intent to apply the patch to\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          },
          '422': {
            description:
              'DE: Nach Anwenden des Patches entspricht der resultierende Intent nicht mehr den Anforderungen des Intent-Schemas oder passt fachlich nicht mehr.  z.B: Daten widersprüchlich oder unzureichend.<br/> EN: The intent resulting from applying the patch to the existing intent do not correspond to the API spec or can otherwise not be processed as intent.  This might be due to inconsistencies or insufficient data.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          }
        }
      }
    },
    '/intents/{id}/estates/{estateId}': {
      get: {
        operationId: 'getEstate',
        summary: 'Returns an estate for the given estate id and intent id.',
        description:
          'DE: Gibt das Estate Objekt zurück, das durch die estate-id und die intent-id identifiziert wird.<br/> EN: Returns an estate for the given estate id and intent id.\n',
        tags: ['intent'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string'
            },
            example: '6217b94d2140c149349d98ff',
            description: 'the ID of the intent.'
          },
          {
            name: 'estateId',
            in: 'path',
            required: true,
            schema: {
              type: 'string'
            },
            example: 'c55c55ff-cef8-4e2d-acf3-14f869f64c3f',
            description: 'the ID of the estate within the intent.'
          }
        ],
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Estate'
                }
              }
            },
            description: 'found intent.'
          },
          '400': {
            description:
              'DE: Die übergebenen Daten können nicht als Case-ID bzw. Estate-ID interpretiert werden.<br/> EN: the data passed to the method can not be interpreted as Case-ID or Estate-ID respectively.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized - Missing or invalid authorization',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SimpleErrorResponse'
                }
              }
            }
          },
          '403': {
            description: 'Forbidden - Authorized but not allowed to execute this action.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          },
          '404': {
            description: 'Not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          }
        }
      }
    },
    '/intents/{id}/info': {
      get: {
        operationId: 'getIntentInfo',
        summary: 'get a shallow info object for the intent',
        description:
          'DE: Holt das IntentInfo Objekt für den Intent mit der ID. Nur wenn der angemeldete User auf den Intent berechtigt ist.<br/> EN: get a shallow info object of a single intent identified by the id (success of this method is restricted by the performing entities rights to access this intent)\n',
        tags: ['intent'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string'
            },
            example: '6217b94d2140c149349d98ff',
            description: 'the ID of the intent (intent or CaseService-intent id)'
          }
        ],
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/IntentInfo'
                }
              }
            },
            description: 'found intent.'
          },
          '400': {
            description:
              'DE: Die übergebenen Daten können nicht als Intent-ID interpretiert werden.<br/> EN: the data passed to the method can not be interpreted as Intent-ID.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized - Missing or invalid authorization',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SimpleErrorResponse'
                }
              }
            }
          },
          '403': {
            description: 'Forbidden - Authorized but not allowed to execute this action.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          },
          '404': {
            description: 'Not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          }
        }
      }
    },
    '/intents/{id}/process': {
      get: {
        operationId: 'getIntentProcess',
        summary: 'get the process object for the intent',
        description:
          'DE: Holt das process Objekt für den Intent (sofern der Aufrufer berechtigt ist). EN: get the process object of a single intent identified by the id (success of this method is restricted by the performing entities rights to access this intent)\n',
        tags: ['intent'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Process'
                }
              }
            },
            description: 'found intent. (process might be empty.)'
          },
          '400': {
            description:
              'DE: Die übergebenen Daten können nicht als Intent-ID interpretiert werden.<br/> EN: the data passed to the method can not be interpreted as Intent-ID.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized - Missing or invalid authorization',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SimpleErrorResponse'
                }
              }
            }
          },
          '403': {
            description: 'Forbidden - Authorized but not allowed to execute this action.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          },
          '404': {
            description: 'Not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          }
        }
      }
    },
    '/intents/{id}/status-active': {
      put: {
        operationId: 'switchIntentStatus',
        summary: 'switch the intent status to active',
        description:
          'DE: Ändert den Status des Intents. Der Enpdunkt ist limitiert auf den Übergang vom Status IntentStatus.IN_WORK zu IntentStatus.ACTIVE und wird nur dann ausgeführt, wenn der Aufrufer berechtigt ist. EN: Changes the status of the intent. The endpoint is limited to transitioning from IntentStatus.IN_WORK to IntentStatus.ACTIVE status. (Success of this method is restricted by the performing entities rights to access this intent)\n',
        tags: ['intent'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string'
            },
            example: '6217b94d2140c149349d98ff',
            description: 'the ID of the intent (intent or CaseService-intent id)'
          }
        ],
        responses: {
          '204': {
            description:
              'DE: Der Status des Intents wurde erfolgreich geändert. Das Intent hat den Status IntentStatus.ACTIVE    <br/> EN: The status has been changed successfully. The intent has the status IntentStatus.ACTIVE now\n'
          },
          '400': {
            description:
              'DE: Die übergebenen Daten können nicht als Intent-ID interpretiert werden.<br/> EN: the data passed to the method can not be interpreted as Intent-ID.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized - Missing or invalid authorization',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SimpleErrorResponse'
                }
              }
            }
          },
          '403': {
            description: 'Forbidden - Authorized but not allowed to execute this action.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          },
          '404': {
            description: 'Not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          },
          '409': {
            description:
              'DE: Der Status des Intents kann nicht geändert werden, da die Voraussetzungen nicht erfüllt sind <br/> EN: The status of the intent cannot be changed. The requirements are not met.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          }
        }
      }
    },
    '/intents/{id}/termination': {
      put: {
        operationId: 'terminateIntent',
        summary: 'terminate the respective intent',
        description:
          'DE: Beendet das Baufinanzierungs-Vorhaben.<br/> EN: Terminates the mortgage-intent.\n',
        tags: ['intent'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/IntentTerminationRequest'
              }
            }
          }
        },
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Intent'
                }
              }
            },
            description:
              'DE: Das Vorhaben wurde beendet und das Ergebnis ist in der response enthalten.<br/> EN: The Intent was terminated and the result is contained in the response.\n'
          },
          '400': {
            description:
              'DE: Die übergebenen Daten entsprechen nicht dem in der API spec geforderten Format.<br/> EN: the data passed to the method does not correspond to the format required by this API spec.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized - Missing or invalid authentication',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SimpleErrorResponse'
                }
              }
            }
          },
          '403': {
            description:
              'Forbidden - User is authenticated, but not allowed to execute this action.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          },
          '404': {
            description: 'Not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          },
          '409': {
            description:
              'DE: Der Status des Intents kann nicht geändert werden, da die Voraussetzungen nicht erfüllt sind <br/> EN: The status of the intent cannot be changed. The requirements are not met.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          }
        }
      }
    },
    '/intents/{id}/validate': {
      get: {
        operationId: 'validate',
        summary: 'validate the intent according to the current api definition',
        description:
          'DE: Validiert den aktuellen Stand des Intents entsprechend den API- und weitergehender Business Regeln<br/>  EN: Validates the current state of the intent against the current API specs and other business rules\n',
        tags: ['intent'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string'
            },
            example: 1000012345,
            description: 'the ID of the intent (intent-ID or CaseService-intent-ID)'
          }
        ],
        responses: {
          '200': {
            description:
              'DE: Der intent entspricht den aktuell anwendbaren Regeln<br/> EN: The intent conforms to the currently applicable rules\n'
          },
          '400': {
            description:
              'DE: Die übergebenen Daten können nicht als Intent-ID interpretiert werden.<br/> EN: the data passed to the method can not be interpreted as Intent-ID.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized - Missing or invalid authorization',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SimpleErrorResponse'
                }
              }
            }
          },
          '403': {
            description: 'Forbidden - Authorized but not allowed to execute this action.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          },
          '404': {
            description: 'Not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          },
          '422': {
            description:
              'DE: Der Intent verletzt eine oder mehrere der anwendbaren Regeln<br/> EN: The intent fails to validate against the currently applicable urles\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RFC7807Problem'
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    securitySchemes: {
      ApiKey: {
        type: 'apiKey',
        in: 'header',
        name: 'Api-Key',
        description:
          'API keys are unique codes issued by an API provider that allow partners to access specific API resources. By requiring an API key, the provider can ensure that only authorized clients are accessing the API and can prevent potential abuse or unauthorized access.'
      },
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description:
          "JWT stands for JSON Web Token and is a type of bearer token that is commonly used for authentication and authorization purposes. Once retrieved, the token is sent with each request and grants access to the associated resource until it expires or is revoked. Thus, it is a compact, URL-safe means of representing a user's claims to access a resource without providing additional credentials."
      }
    },
    schemas: {
      AbstractBuilding: {
        type: 'object',
        required: ['estateId', 'version', 'address', 'building'],
        description:
          'DE: Gemeinsame Eigenschaften von Gebäuden<br/> EN: common properties of buildings\n',
        properties: {
          construction: {
            description:
              'DE: Bauweise des Gebäudes z.B. SOLID=Massivbauweise, WOOD_STAND=Holzständerbauweise, WOOD=Holzbauweise, TIMBER_FRAMING=Fachwerkbauweise, LOG_BUILDING=Blockhausbauweise, COB=Lehmbauweise. <br/> EN: classification of the construction of the building, possible values are SOLID, CONCRETE_SLAB, WOOD_STAND, WOOD, TIMBER_FRAMING, LOG_BUILDING, COB, OTHER\n',
            example: 'SOLID',
            type: 'string',
            enum: [
              'SOLID',
              'CONCRETE_SLAB',
              'WOOD_STAND',
              'WOOD',
              'LOG_BUILDING',
              'TIMBER_FRAMING',
              'COB',
              'OTHER'
            ]
          },
          unitGroups: {
            type: 'object',
            description:
              'DE: Map der Wohn- und Nutzeinheiten. Der Schlüssel der Map ist jeweils die entsprechende unitGroupId. Die Beschreibung der Einheiten erfolgt in Gruppen.\n    Bei Mehrfamilienhäusern und Wohn-/Geschäftshäusern können beliebig viele existieren, bei sonstigen Häusern maximal zwei, bei Wohnungen maximal eine.\n    Wenn keine Einheiten-Gruppen angegeben werden, wird standardmäßig eine selbstgenutzte, wohnwirtschaftliche Gruppe angelegt.<br/>\nEN: Map of residential and commercial units. The key of the map is the corresponding unitGroupId. The units are described in groups.\n    For APARTMENT_BUILDING and RESIDENTIAL_AND_COMMERCIAL_BUILDING there may be as many as desired, for other houses at most two and for appartments at most one.\n    If no unit groups are specified, one self used, residential unitGroup will be created by default.\n',
            additionalProperties: {
              $ref: '#/components/schemas/UnitGroup'
            }
          },
          specialAttributes: {
            type: 'array',
            nullable: false,
            description:
              'DE: Besonderheiten der Immobilie (z.B. Denkmalschutz, Luxusimmobilie, ...)<br/> EN: special attributes of the estate (e.g. monument protection, luxury, ...)\n',
            items: {
              $ref: '#/components/schemas/SpecialAttribute'
            }
          },
          buildingLease: {
            $ref: '#/components/schemas/BuildingLease'
          },
          yearOfConstruction: {
            type: 'integer',
            minimum: 1000,
            maximum: 2999,
            description:
              'DE: Baujahr. Darf maximal 5 Jahre in der Zukunft liegen.<br/> EN: Year of construction. Must not be more than 5 years in the future\n'
          },
          hasLift: {
            type: 'boolean',
            description: 'DE: Vorhandener Aufzug. <br/> EN: Existing elevator.\n',
            default: false
          },
          valuationOfFittings: {
            type: 'string',
            description:
              'DE: Beurteilung der Austattung der Immobilie (nicht abschließende Aufzählung). Einflussfaktoren sind z. B. verwendete Böden, etc. <br/> EN: Open ended enum contains property configuration (furnishing) details, possible values are (SIMPLE, GOOD, VERY_GOOD).\n',
            example: 'SIMPLE',
            enum: ['SIMPLE', 'GOOD', 'VERY_GOOD']
          },
          flatNr: {
            type: 'string',
            maxLength: 10,
            description:
              'DE: Wohnungsnummer. Nur relevant, wenn die Immobilie eine Eigentumswohnung oder nach WEG geteilt ist.<br/> EN: Flat number. Only relevant if the estate is an apartment or separated according to WEG.\n'
          },
          numberOfFloors: {
            type: 'integer',
            minimum: 0,
            maximum: 100000,
            description:
              'DE: Anzahl der Vollgeschosse (ohne Keller/Dachboden). <br/> EN: Number of floors (without basement/attic).\n'
          },
          salesAllowance: {
            type: 'boolean',
            description: 'DE: Besteht ein Vorkaufsrecht. <br/> EN: Pre-emption right\n'
          },
          energyEfficiencyClassification: {
            type: 'string',
            enum: ['APLUS', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
            description:
              'DE: Energieeffizienzklasse gemäss Energieausweis<br/> EN: energy efficency classification according to certificate of energy consumption\n'
          },
          primaryEnergyDemand: {
            type: 'integer',
            minimum: 0,
            maximum: 100000,
            description:
              'DE: Primärenergiebedarf aktuell (in kWh/m2 pro Jahr)<br/> EN: current primary energy demand (kWh/m2 per year)\n'
          },
          primaryEnergyConsumption: {
            type: 'integer',
            minimum: 0,
            maximum: 100000,
            description:
              'DE: Primärenergieverbrauch aktuell (in kWh/m2 pro Jahr)<br/> EN: current primary energy consumption (kWh/m2 per year)\n'
          },
          carbondioxideEmissions: {
            type: 'integer',
            minimum: 0,
            maximum: 100000,
            description:
              'DE: CO2 Emissionen (in kg/m2 pro Jahr). Geplant (bei Kauf Neubau bzw. Bau) oder aktuell (bei Bestandsobjekten)<br> EN: Carbondioxide emissions (in kg/m2 per year). Planned value for project-types build and buy new or current value for existing estates.\n'
          },
          energyEfficiencyStandard: {
            type: 'string',
            enum: [
              'KFW_EFFIZIENZHAUS_40',
              'KFW_EFFIZIENZHAUS_40PLUS',
              'KFW_EFFIZIENZHAUS_40_MIT_NACHHALTIGKEIT',
              'KFW_EFFIZIENZHAUS_55',
              'KFW_EFFIZIENZHAUS_55PLUS',
              'KFW_EFFIZIENZHAUS_55_MIT_NACHHALTIGKEIT',
              'SONSTIGES'
            ],
            description:
              'DE: Energieeffizienzhausstandards gemäss KFW<br/> EN: energy efficency standard (mostly KFW classifications)\n'
          },
          energyEfficiencyStandardOther: {
            type: 'string',
            maxLength: 4000,
            description:
              'DE: Hinweis zu sonstigem Energieeffizienzhausstandard <br/> EN: Description of other energy efficency standard\n'
          },
          modernisations: {
            type: 'array',
            nullable: false,
            description:
              'DE: Bereits durchgeführte Modernisierungen. Es ist jeweils nur eine Modernisierungsmaßnahme pro Typ (modernisation.type) möglich. Wird mehr als eine Modernisierungsmaßnahme pro Typ gesendet, lehnt das Backend die Abfrage ab.<br/> EN: Modernizations that have already been carried out. Only one modernization per type (modernisation.type) is possible. If more than one modernization action per type are sent, the backend rejects the request.\n',
            items: {
              $ref: '#/components/schemas/Modernisation'
            }
          },
          parkingSpaces: {
            type: 'array',
            nullable: false,
            description: 'DE: Liste der Parkplätze<br/> EN: List of the parking spaces\n',
            items: {
              $ref: '#/components/schemas/ParkingSpace'
            }
          },
          sustainableRentParkingSpaces: {
            type: 'number',
            minimum: 0,
            maximum: 100000000,
            description:
              'DE: Nachhaltige Miete der Stellplätze<br/> EN: sustainable rent of the parking spaces\n'
          }
        },
        allOf: [
          {
            $ref: '#/components/schemas/Estate'
          }
        ]
      },
      AbstractModernisation: {
        type: 'object',
        description:
          'DE: gemeinsame Basis für alle Modernisierungen EN: common base of all modernisations.\n',
        properties: {
          type: {
            type: 'string',
            enum: [
              'INSULATION',
              'ROOF',
              'FACADE',
              'WINDOWS_OR_DOORS',
              'HEAT_PROTECTION',
              'VENTILATION_SYSTEM',
              'ELECTRICS',
              'DIGITAL_ENERGY_OPTIMISATION',
              'HEATING',
              'BATHROOMS',
              'POWER_WATER_HEATINGPIPES',
              'FLOOR_WALL_STAIRCASES',
              'STRUCTURE',
              'OTHER',
              'TOTAL'
            ],
            description:
              'DE: Typ der Modernisierungsmassnahmen<br/> EN: Type of the modernisation\n',
            example: 'INSULATION'
          },
          costs: {
            type: 'number',
            minimum: 0,
            maximum: 100000000,
            description: 'DE: Kosten der Modernisierung<br/> EN: costs of the modernisation\n',
            example: 1000
          },
          totalModernisation: {
            type: 'boolean',
            description:
              'DE: Totalsanierung Ja - Nein. Auswahl Ja erzwingt type TOTAL bzw. Auswahld des type TOTAL erzwingt ein ja hier<br/> EN: is this a total modernisation. True here enforces type TOTAL and type TOTAL enforces yes here.\n',
            example: false,
            default: false
          },
          description: {
            type: 'string',
            maxLength: 4000,
            description:
              'DE: Zusätzliche Beschreibung der Modernisierungsmassnahmen. Nur relevant bei Art OTHER / Sonstiges<br/> EN: Description of modernisations. Only relevant for modernisations of type OTHER.\n'
          }
        }
      },
      AdditionalLoan: {
        type: 'object',
        description:
          'DE: Zusätzlicher Darlehensbedarf. Nur relevant, wenn ein Betrag vorhanden ist.<br/> EN: additional loan. Only relevant if an amount is present.\n',
        properties: {
          amount: {
            description: 'DE: Betrag des benötigten Darlehens<br/> EN: amount of needed loan\n',
            allOf: [
              {
                $ref: '#/components/schemas/EuroAmount'
              }
            ]
          },
          usage: {
            description: 'DE: Verwendungszweck des Darlehens<br/> EN: Usage of needed loan\n',
            type: 'string',
            enum: [
              'WORKING_CAPITAL_LOAN',
              'REPAYMENT_OTHER_LOANS',
              'PREPAYMENT_PENALTY',
              'RENOVATE',
              'OTHER'
            ]
          },
          description: {
            type: 'string',
            maxLength: 400,
            description:
              'DE: Beschreibung des zusätzlichen Darlehensbedarfs<br/> EN: description additional loan need\n'
          }
        }
      },
      Address: {
        type: 'object',
        description:
          'DE: die (postalische) Adresse des Objekts. Enhält auch Meta-Daten zu der Adresse.<br> EN: the postal address of the object. Contains some meta-information for this location\n',
        properties: {
          street: {
            type: 'string',
            maxLength: 85,
            description: 'DE: Straßenname <br/> EN: Street name of the address\n'
          },
          housenumber: {
            type: 'string',
            maxLength: 14,
            description:
              'DE: Hausnummer (kann Buchstaben oder Bereiche enthalten)<br/> EN: House number (might contain letters or ranges)\n',
            example: '42b-c'
          },
          zip: {
            type: 'string',
            minLength: 5,
            maxLength: 5,
            pattern: '^[0-9]*$',
            description: 'DE: Postleitzahl. <br/> EN: Postal code (ZIP dode) of the address.\n'
          },
          city: {
            type: 'string',
            maxLength: 100,
            description: 'DE: Stadt <br/> EN: City\n'
          },
          province: {
            $ref: '#/components/schemas/ProvinceType'
          },
          country: {
            $ref: '#/components/schemas/CountryType'
          },
          inhabitants: {
            type: 'string',
            description:
              'DE: Einstufung der Grösse der Stadt nach Einwohnerzahl.<br/> EN: Classification of the city size according to number of inhabitants.\n',
            enum: [
              'UP_TO_1000',
              'UP_TO_10000',
              'UP_TO_50000',
              'UP_TO_100000',
              'UP_TO_200000',
              'UP_TO_500000',
              'UP_TO_1000000',
              'MORE_THEN_1000000'
            ]
          },
          environment: {
            type: 'string',
            description:
              'DE: Einstufung der Umgebung dieser Adresse (RESIDENTIAL_AREA = reines Wohngebiet, BUSINESS_AREA = überwiegend Gewerbegebiet, MIXED_AREA = Mischgebiet, OUTSIDE_AREA = Einzellage außerhalb des Orts)<br/> EN: Classification of the environment of this address\n',
            enum: ['RESIDENTIAL_AREA', 'BUSINESS_AREA', 'MIXED_AREA', 'OUTSIDE_AREA']
          }
        }
      },
      AnnualFinancialStatementItem: {
        type: 'object',
        allOf: [
          {
            $ref: '#/components/schemas/SelfEmploymentIncomeItem'
          }
        ],
        properties: {
          year: {
            description: 'DE: Jahr (lfd/Vorjahr/Vorvorjahr). <br/> EN: The balance year.\n',
            example: 2022,
            allOf: [
              {
                $ref: '#/components/schemas/Year'
              }
            ]
          },
          sequenceNumber: {
            type: 'integer',
            minimum: 1,
            maximum: 100,
            example: 1,
            description:
              'DE: laufende Nummer. Wird ggf. vor dem Speichern vom Backend gesetzt.  Um Veränderungen vorzubeugen, sollte die sequenceNumber pro SelfEmployment einmalig sein.  Maßgeblich sind die Einträge mit den Sequenznummern 1-3, andernfalls die drei Einträge mit den höchsten Jahreszahlen.<br> EN: sequence. Set by the backend before saving, if necessary. To prevent changes, the sequenceNumber should be unique per selfEmployment. The entries with sequence numbers 1-3 are decisive, otherwise the three entries with the most recent years.\n'
          }
        }
      },
      Apartment: {
        type: 'object',
        description: 'DE: Wohnung<br/> EN: Apartment\n',
        properties: {
          numberOfFlats: {
            type: 'integer',
            minimum: 0,
            maximum: 100000,
            description:
              'DE: Anzahl der Wohnungen im Gebäude<br/> EN: total number of flats in the building\n'
          },
          gardenUsage: {
            type: 'boolean',
            description: 'DE: Sondernutzungsrechte Garten<br/> EN: includes garden usage\n'
          },
          numberOfRooms: {
            type: 'number',
            minimum: 0,
            maximum: 100000,
            description:
              'DE: Anzahl der Räume in der Wohnung<br/> EN: total number of rooms in the apartment\n'
          },
          floor: {
            type: 'string',
            description: 'DE: Stockwerk (Lage der Wohnung)<br/> EN: floor of the apartment\n',
            enum: [
              'BASEMENT',
              'GROUND_FLOOR',
              'UPPER_FLOOR_1',
              'UPPER_FLOOR_2',
              'UPPER_FLOOR_BETWEEN_3_AND_5',
              'UPPER_FLOOR_6_AND_ABOVE'
            ]
          },
          flatsPerStaircase: {
            type: 'integer',
            minimum: 0,
            maximum: 100000,
            description: 'DE: Wohungne je Treppenhaus<br/> EN: number of flats per staircase\n'
          },
          flatsPerHouse: {
            type: 'integer',
            minimum: 0,
            maximum: 100000,
            description: 'DE: Anzahl der Wohnungen je Haus<br/> EN: number of flats per house\n'
          },
          flatsPerDeclarationOfDivision: {
            type: 'integer',
            minimum: 0,
            maximum: 100000,
            description:
              'DE: Anzahl der Wohnungen je Teilungserklärung<br/> EN: number of flats according to declaration of division\n'
          },
          localRefPrice: {
            $ref: '#/components/schemas/ExternalEvaluation'
          }
        },
        allOf: [
          {
            $ref: '#/components/schemas/AbstractBuilding'
          }
        ]
      },
      ApartmentBuilding: {
        type: 'object',
        description:
          'DE: Mehrfamilienhaus (mehr als zwei Einheiten)<br/> EN: Aparmtent building (more than two units)\n',
        properties: {
          numberOfFlats: {
            type: 'integer',
            description:
              'DE: Anzahl der Wohnungen im Gebäude. Darf nicht kleiner als die Summe der Wohnungen in den Unitgroups sein.<br/> EN: total number of flats in the building. Must not be smaller then the sum of the number of units in all unitGroups.\n'
          }
        },
        allOf: [
          {
            $ref: '#/components/schemas/House'
          }
        ]
      },
      Asset: {
        type: 'object',
        description:
          'DE: Ein typisierter Vermögenswert. Nur relevant, wenn Typ und Betrag vorhanden sind.<br/> EN: a typed asset. Only relevant if type and amount are present.\n',
        required: ['type'],
        properties: {
          id: {
            description:
              'DE: Technische ID des Vermögenswerts. (wird in einer zukünftigen Version der API zum Pflichtfeld)<br/> EN: technical ID of the asset (will become mandatory in a future release of the API)\n',
            type: 'string',
            format: 'uuid'
          },
          type: {
            type: 'string',
            nullable: false,
            description:
              'DE: Art des Vermögenswerts<br/>\n    BANK_ACCOUNT = Bank Konto<br/>\n    BUILDINGLOAN = Bausparvertrag<br/>\n    CRYPTO_CURRENCY = Crypto Währungen<br/>\n    LIFEINSURANCES = Lebensversicherungen<br/>\n    SECURITIES_PORTFOLIO = Depot / Wertpapier Vermögen<br/>\n    OTHER = Sonstige Vermögenswerte<br/>\n    EQUITY_CASH = <b>Veraltet, nicht benutzen</b>, wird entfernt\nEN: type of the asset.<br/>\n    BANK_ACCOUNT <br/>\n    BUILDINGLOAN (Building loan savings contract)<br/>\n    CRYPTO_CURRENCY<br/>\n    LIFEINSURANCES<br/>\n    SECURITIES_PORTFOLIO<br/>\n    OTHER (other assets)<br/>\n    EQUITY_CASH - <b>deprecated, do not use</b>, scheduled for removal\n',
            enum: [
              'BANK_ACCOUNT',
              'BUILDINGLOAN',
              'CRYPTO_CURRENCY',
              'LIFEINSURANCES',
              'SECURITIES_PORTFOLIO',
              'OTHER',
              'EQUITY_CASH'
            ]
          },
          amount: {
            $ref: '#/components/schemas/EuroAmount'
          },
          description: {
            type: 'string',
            maxLength: 500,
            description:
              "DE: Nur relevant nur für type 'OTHER' oder 'BUILDING_LOAN'. Bei BuildingLoan: Beschreibung der Bausparkasse, wenn die Option OTHER (\"sonstiges\") unter instituteName gewählt wurde; bei OTHER: Beschreibung des Vermögenswerts.<br/> EN: Only relevant for type 'OTHER' or 'BUILDING_LOAN'. In case of BUILDING_LOAN: description of the issuing institute if the option \"sonstiges\" (= other) was chosen as instituteName; in case of OTHER: description of the asset.\n"
          }
        },
        discriminator: {
          propertyName: 'type',
          mapping: {
            BANK_ACCOUNT: '#/components/schemas/BankAccount',
            BUILDINGLOAN: '#/components/schemas/BuildingLoan',
            CRYPTO_CURRENCY: '#/components/schemas/Asset',
            LIFEINSURANCES: '#/components/schemas/Asset',
            SECURITIES_PORTFOLIO: '#/components/schemas/Asset',
            OTHER: '#/components/schemas/Asset',
            EQUITY_CASH: '#/components/schemas/Asset'
          }
        }
      },
      AuxiliaryIncome: {
        type: 'object',
        description:
          'DE: Informationen über monatliche Nebeneinkunft. Nur relevant, wenn Betrag oder Start-Datum vorhanden sind.<br/> EN: Informations regarding monthly auxiliary income. Only relevant if amount or startDate are present.\n',
        required: ['type'],
        properties: {
          startDate: {
            description:
              'DE: Seit wann die Nebeneinkunft bezogen wird. Das Datum muss in der Vergangenheit liegen oder das aktuelle Datum sein. <br/> EN: Start date for drawing the auxiliary income. The date must be in the past or the current date.\n',
            allOf: [
              {
                $ref: '#/components/schemas/ISODate'
              }
            ]
          }
        },
        allOf: [
          {
            $ref: '#/components/schemas/Income'
          }
        ]
      },
      BankAccount: {
        type: 'object',
        description:
          'DE: Bank-Konto (Giro, Spar, ...) als Vermögenswert. Nur relevant, wenn mindestens Betrag oder eine andere Angabe vorhanden.<br/> EN: Banking account as an asset. Only relevant if at least amount or any other value is present.\n',
        required: ['type'],
        properties: {
          iban: {
            deprecated: true,
            description:
              "DE: Veraltet ! war: IBAN. Leerzeichen werden nach dem Speichern entfernt. IBAN muss valide sein.<br/>\n    Die Bankverbindung für Auszahlung und Einzug befindet sich nun neben den assets unter 'bankDetails'<br/>\nEN: Deprecated ! was: The International Bank Account Number. Whitespaces will be cleaned on save. IBAN must be valid.<br/>\n    The bank details for payout and payments is now next to the assets under 'bankDetails'\n",
            allOf: [
              {
                $ref: '#/components/schemas/Iban'
              }
            ]
          },
          accountOwner: {
            deprecated: true,
            type: 'string',
            maxLength: 100,
            description:
              "DE: Veraltet ! war: Name des Kontobesitzers <br/>\n    Die Bankverbindung für Auszahlung und Einzug befindet sich nun neben den assets unter 'bankDetails'<br/>\nEN: Deprecated ! was: The name of the account owner<br/>\n    The bank details for payout and payments is now next to the assets under 'bankDetails'\n"
          },
          bic: {
            deprecated: true,
            description:
              "DE: Veraltet ! war: BIC <br/>\n    Die Bankverbindung für Auszahlung und Einzug befindet sich nun neben den assets unter 'bankDetails'<br/>\nEN: Deprecated ! was: The Business Identifier Code<br/>\n    The bank details for payout and payments is now next to the assets under 'bankDetails'\n",
            allOf: [
              {
                $ref: '#/components/schemas/Bic'
              }
            ]
          },
          bankName: {
            deprecated: true,
            type: 'string',
            maxLength: 100,
            description:
              "DE: Veraltet ! war: Name der Bank<br/>\n    Die Bankverbindung für Auszahlung und Einzug befindet sich nun neben den assets unter 'bankDetails'<br/>\nEN: Deprecated ! was: The name of the bank<br/>\n    The bank details for payout and payments is now next to the assets under 'bankDetails'\n"
          },
          bankId: {
            deprecated: true,
            type: 'string',
            maxLength: 32,
            description:
              'DE: Veraltet ! Technische ID der Bank in anderen Interhyp-internen Services. Veraltet, da nicht alle Kreditinstitute am Markt in anderen internen services eine rolle spielen.<br/> EN: Deprecated ! Technical ID of the bank in other Interhyp-internal service. Deprecated, because not all institutes on the market are relevant in other internal services.\n'
          },
          selectedForPayments: {
            deprecated: true,
            description:
              "DE: Veraltet ! war: Ausgewählt für Abbuchungen/Lastschriften. Nur ein Konto in der List darf dieses Flag gesetzt haben.<br/>\n    Die Bankverbindung für Auszahlung und Einzug befindet sich nun neben den assets unter 'bankDetails'<br/>\nEN: Deprecated ! was: selected for drafts. Exclusive, only one Bankaccount in the list may have this flag set.<br/>\n    The bank details for payout and payments is now next to the assets under 'bankDetails'\n",
            type: 'boolean'
          },
          selectedForPayout: {
            deprecated: true,
            description:
              "DE: Veraltet ! war: Ausgewählt als Auszahlungskonto für das Darlehen. Nur ein Konto in der List darf dieses Flag gesetzt haben.<br/>\n    Die Bankverbindung für Auszahlung und Einzug befindet sich nun neben den assets unter 'bankDetails'<br/>\nEN: Deprecated ! was: selected for credit payout. Exclusive, only one Bankaccount in the list may have this flag set.<br/>\n    The bank details for payout and payments is now next to the assets under 'bankDetails'\n",
            type: 'boolean'
          }
        },
        allOf: [
          {
            $ref: '#/components/schemas/Asset'
          }
        ]
      },
      BankDetails: {
        type: 'object',
        description:
          'DE: Bankverbindung für Auszahlungen und Einzüge.<br/> EN: Bank account details for loan payout and for payments.\n',
        properties: {
          iban: {
            description:
              'DE: IBAN. Leerzeichen werden nach dem Speichern entfernt. IBAN muss valide sein.<br/> EN: The International Bank Account Number. Whitespaces will be cleaned on save. IBAN must be valid.\n',
            allOf: [
              {
                $ref: '#/components/schemas/Iban'
              }
            ]
          },
          accountOwner: {
            type: 'string',
            maxLength: 100,
            description: 'DE: Name des Kontobesitzers <br/> EN: The name of the account owner\n'
          },
          bic: {
            description: 'DE: BIC <br/> EN: The Business Identifier Code\n',
            allOf: [
              {
                $ref: '#/components/schemas/Bic'
              }
            ]
          },
          bankName: {
            type: 'string',
            maxLength: 100,
            description: 'DE: Name der Bank<br/> EN: The name of the bank\n'
          }
        }
      },
      Bic: {
        type: 'object',
        description: 'DE: BIC <br/> EN: The Business Identifier Code\n',
        required: ['value'],
        properties: {
          value: {
            type: 'string',
            example: 'INGBDEFF',
            pattern: '^[A-Z]{6}[2-9A-Z]{1}[0-9A-Z]{1}([0-9A-Z]{3})?$'
          }
        }
      },
      BridgingLoan: {
        type: 'object',
        required: ['neededAmount', 'reason'],
        description:
          'DE: Information zur Zwischenfinanzierung. <br/>  EN: Details about bridging loan.\n',
        properties: {
          reason: {
            nullable: false,
            $ref: '#/components/schemas/BridgingLoanReason'
          },
          neededAmount: {
            description: 'DE: Zwischenfinanzierungsbetrag. <br/> EN: Bridging loan amount.\n',
            allOf: [
              {
                $ref: '#/components/schemas/EuroAmount'
              }
            ]
          },
          equityAvailabilityDate: {
            description:
              'DE: Verfügbarkeit des Kapitals. <br/> EN: Bridging loan availability date.\n',
            allOf: [
              {
                $ref: '#/components/schemas/ISODate'
              }
            ]
          }
        },
        discriminator: {
          propertyName: 'reason',
          mapping: {
            OPEN_PROPERTY_SALE: '#/components/schemas/OpenPropertySale',
            CLOSED_PROPERTY_SALE: '#/components/schemas/ClosedPropertySale',
            UNAVAILABLE: '#/components/schemas/UnavailableEquity',
            PUBLIC_PRE_FINANCE: '#/components/schemas/BridgingLoan'
          }
        }
      },
      BridgingLoanReason: {
        type: 'string',
        description:
          'DE: Grund für die Zwischenfinanzierung, z.B. OPEN_PROPERTY_SALE, CLOSED_PROPERTY_SALE, UNAVAILABLE, PUBLIC_PRE_FINANCE. <br/> EN: contains bridging loan debt reason, possible values are OPEN_PROPERTY_SALE, CLOSED_PROPERTY_SALE, UNAVAILABLE, PUBLIC_PRE_FINANCE.\n',
        example: 'OPEN_PROPERTY_SALE',
        enum: ['OPEN_PROPERTY_SALE', 'CLOSED_PROPERTY_SALE', 'UNAVAILABLE', 'PUBLIC_PRE_FINANCE']
      },
      BuildingLease: {
        type: 'object',
        description:
          'DE: Information über ein Erbbaurecht. <br/> EN: Estate leasehold (Erbbaurecht) information.\n',
        properties: {
          buildingLessor: {
            type: 'string',
            description:
              'DE: Erbbaurechtgeber, z.B. CHURCH, CITY, PRIVATE_PERSON, COMPANY, OTHER. <br/> EN: building lease owner, possible values are CHURCH, CITY, PRIVATE_PERSON, COMPANY, OTHER.\n',
            enum: ['CHURCH', 'CITY', 'PRIVATE_PERSON', 'COMPANY', 'OTHER']
          },
          buildingLeaseEndDate: {
            type: 'string',
            format: 'date',
            description:
              'DE: Ablaufdatum des Erbbaurechts. <br/> EN: Leasehold ending (expiry) date.\n'
          },
          groundRent: {
            type: 'number',
            minimum: 0,
            maximum: 100000000,
            description: 'DE: Erbbauzins. <br/> EN: Leasehold fees.\n'
          },
          buildingLeaseNoCharge: {
            type: 'boolean',
            description:
              'DE: Erbbaurecht Stillhalteerklärung. <br/> EN: Leasehold declaration of standstill.\n'
          },
          compensationFreePart: {
            type: 'number',
            description:
              'DE: entschädigungsfreier Gebäudewertanteils im Erbbaurecht<br/> EN: compensation free building value part of leasehold\n'
          },
          subOrdination: {
            type: 'boolean',
            description: 'DE: Rangrücktritt. <br/> EN: Subordination (Resignation of priority).\n'
          }
        }
      },
      BuildingLoan: {
        type: 'object',
        description:
          'DE: Bestehender Bausparvertrag, unabhängig ob zuteilungsreif oder in der Ansparphase als Vermögenswert. Amount ist hier das aktuell angesparte Guthaben. Nur relevant, wenn mindestens Betrag oder eine andere Angabe vorhanden.<br/> EN: An existing building loan savings contract as asset. Only relevant if at least amount or any other value is present.\n',
        properties: {
          instituteName: {
            type: 'string',
            maxLength: 100,
            example: 'ALLIANZ_DRESDNER_BAUSPAR_AG',
            description:
              'DE: Name der Bausparkasse. Mögliche Institute sind:<br/>\n    AACHENER_BAUSPARKASSE = Aachener Bausparkasse<br/>\n    ALLIANZ_DRESDNER_BAUSPAR_AG = Allianz Dresdner Bauspar AG<br/>\n    ALTE_LEIPZIGER_BAUSPAR_AG = Alte Leipziger Bauspar AG<br/>\n    BAUSPARKASSE_MAINZ_AG = Bausparkasse Mainz AG<br/>\n    BAUSPARKASSE_SCHWAEBISCH_HALL_AG = Bausparkasse Schwäbisch Hall AG<br/>\n    BHW_DEUTSCHE_BANK_BAUSPAR_AG = BHW - Deutsche Bank Bauspar AG<br/>\n    BSQ_BAUSPAR_AG = BSQ Bauspar AG<br/>\n    DEBEKA_BAUSPARKASSE = Debeka Bausparkasse<br/>\n    DEUTSCHE_BANK_BAUSPAR_AG = Deutsche Bank Bauspar AG<br/>\n    DEUTSCHE_BAUSPARKASSE_BADENIA = Deutsche Bausparkasse Badenia<br/>\n    DEUTSCHER_RING_BAUSPARKASSE_AG = Deutscher Ring Bausparkasse AG<br/>\n    LBS_BAYERISCHE_LANDESBAUSPARKASSE = LBS Bayerische Landesbausparkasse<br/>\n    LBS_BREMEN = LBS Bremen<br/>\n    LBS_HESSEN_THUERINGEN = LBS Hessen Thüringen<br/>\n    LBS_NORDDEUTSCHE = LBS Norddeutsche<br/>\n    LBS_OSTDEUTSCHE = LBS Ostdeutsche<br/>\n    LBS_SAARBRUECKEN = LBS Saarbrücken<br/>\n    LBS_SCHLESWIG_HOLSTEIN_HAMBURG = LBS Schleswig Holstein Hamburg<br/>\n    LBS_SUEDWEST = LBS Südwest<br/>\n    LBS_WESTDEUTSCHE = LBS Westdeutsche<br/>\n    QUELLE_BAUSPAR_AG = Quelle Bauspar AG<br/>\n    SIGNAL_IDUNA_BAUSPAR_AG = Signal Iduna Bauspar AG<br/>\n    START_BAUSPARKASSE = start:bausparkasse<br/>\n    WUESTENROT_BAUSPARKASSE = Wüstenrot Bausparkasse<br/>\n    OTHER = Sonstige<br/>\n<br/> EN: name of the institute\n',
            'x-extensible-enum': [
              'AACHENER_BAUSPARKASSE',
              'ALLIANZ_DRESDNER_BAUSPAR_AG',
              'ALTE_LEIPZIGER_BAUSPAR_AG',
              'BAUSPARKASSE_MAINZ_AG',
              'BAUSPARKASSE_SCHWAEBISCH_HALL_AG',
              'BHW_DEUTSCHE_BANK_BAUSPAR_AG',
              'BSQ_BAUSPAR_AG',
              'DEBEKA_BAUSPARKASSE',
              'DEUTSCHE_BANK_BAUSPAR_AG',
              'DEUTSCHE_BAUSPARKASSE_BADENIA',
              'DEUTSCHER_RING_BAUSPARKASSE_AG',
              'LBS_BAYERISCHE_LANDESBAUSPARKASSE',
              'LBS_BREMEN',
              'LBS_HESSEN_THUERINGEN',
              'LBS_NORDDEUTSCHE',
              'LBS_OSTDEUTSCHE',
              'LBS_SAARBRUECKEN',
              'LBS_SCHLESWIG_HOLSTEIN_HAMBURG',
              'LBS_SUEDWEST',
              'LBS_WESTDEUTSCHE',
              'QUELLE_BAUSPAR_AG',
              'SIGNAL_IDUNA_BAUSPAR_AG',
              'START_BAUSPARKASSE',
              'WUESTENROT_BAUSPARKASSE',
              'OTHER'
            ]
          },
          instituteId: {
            type: 'string',
            maxLength: 32,
            readOnly: true,
            description:
              'DE: Technischer Schlüssel zu der Bausparkasse (providerId). Wird vom Backend gefüllt, sofern zum bei instituteName eingegebenen Wert ein solcher Schlüssel existiert.<br> EN: Technical reference to the institute (providerId). Is filled by the backend if there is a key corresponding to the value entered at instituteName.\n'
          },
          targetSavingsAmount: {
            description:
              'DE: Die Bausparsumme des Bausparvertrags.<br/> EN: The target savings amount of this contract\n',
            allOf: [
              {
                $ref: '#/components/schemas/PositiveEuroAmount'
              }
            ]
          },
          readyForPayout: {
            description:
              'DE: Ist der Bausparvertrag zuteilungsreif<br/> EN: Are the savings amount ready for payout\n',
            type: 'boolean'
          },
          payoutDate: {
            description:
              'DE: Zuteilungszeitpunkt für den Bausparvertrag<br/> EN: Payout date for the savings amount\n',
            allOf: [
              {
                $ref: '#/components/schemas/ISODate'
              }
            ]
          },
          monthlySavingsAmount: {
            description: 'DE: Monatliche Sparrate<br/> EN: Amount saved per month\n',
            allOf: [
              {
                $ref: '#/components/schemas/PositiveEuroAmount'
              }
            ]
          },
          interestRate: {
            description: 'DE: Darlehenszins<br/> EN: Aggreed upon interest rate for the mortgage\n',
            example: 1.25,
            allOf: [
              {
                $ref: '#/components/schemas/PositivePercentage'
              }
            ]
          },
          amortisationEnd: {
            description:
              'DE: Das Enddatum der Tilgungsphase <br/> EN: end date of the amortisation\n',
            allOf: [
              {
                $ref: '#/components/schemas/ISODate'
              }
            ]
          },
          contractNumber: {
            description: 'DE: Vertragsnummer<br/> EN: Contract number\n',
            type: 'string',
            maxLength: 100,
            example: 'ALV-42424242'
          },
          creditBurden: {
            description:
              'DE: Zins- und Tilgungsbeitrag alias Darlehensrate. Beinhaltet Zins & Tilgung.<br/> EN: Credit burden. Includes interest and repayment.\n',
            allOf: [
              {
                $ref: '#/components/schemas/PositivePeriodicalEuroAmount'
              }
            ]
          },
          accountBalanceAtAllocation: {
            description: 'DE: Guthaben bei Zuteilung.<br/> EN: Account balance at allocation.\n',
            allOf: [
              {
                $ref: '#/components/schemas/PositiveEuroAmount'
              }
            ]
          },
          creditAmount: {
            description:
              'DE: Darlehensbetrag (wenn Bausparer als Bauspardarlehen in Anspruch genommen werden soll)<br/> EN: amount of the loan.\n',
            allOf: [
              {
                $ref: '#/components/schemas/PositiveEuroAmount'
              }
            ]
          },
          thirdPartyOwner: {
            description:
              'DE: Ist eine andere Person als die bei der der Bausparer angelegt wurde Inhaber? EN: Is the owner other than the person with whom the building loan was created?\n',
            type: 'boolean'
          },
          thirdPartyOwnerName: {
            type: 'string',
            maxLength: 200,
            description:
              'DE: Name des Inhabers. Nur relevant, falls thirdPartyOwner gesetzt ist EN: name of owner. Only relevant if thirdPartyOwner equals true\n'
          },
          closingFee: {
            description: 'DE: einmalige Kosten im Abschlussjahr.<br/> EN: closing fee.\n',
            allOf: [
              {
                $ref: '#/components/schemas/PositiveEuroAmount'
              }
            ]
          }
        },
        allOf: [
          {
            $ref: '#/components/schemas/Asset'
          }
        ]
      },
      BusinessLine: {
        type: 'string',
        maxLength: 32,
        description:
          'DE: Branche der Tätigkeit, mögliche Ausprägungen: AUTOMOTIVE               = Automotive FINANCES                 = Banken und Versicherungen CONSTRUCTION_INDUSTRY    = Baugewerbe EDUCATION                = Bildung und Erziehung CONSULTING_AND_ADVISORY  = Consulting und Beratung ENERGY                   = Energieversorgung EROTIC_INDUSTRY          = Erotikbranche FINANCIAL_SERVICES       = Finanzdienstleistungen GASTRONOMY               = Gastronomie HEALTH_SERVICE           = Gesundheitswesen WHOLE_AND_RETAIL_SALE    = Groß- und Einzelhandel HANDCRAFT                = Handwerk HOTEL_INDUSTRY           = Hotelgewerbe REAL_ESTATE              = Immobilienvermittlung IT_AND_PROGRAMMING       = IT und Programmierung CAR_DEALER               = Kfz-Händler CAR_REPAIR               = Kfz-Werkstatt KIOSK                    = Kiosk CHURCH                   = Kirchlicher Träger COURIER_SERVICE          = Kurierdienst AGRICULTURE              = Landwirtschaft LOGISTIC                 = Logistik MEDIA_INDUSTRY           = Medien PUBLIC_SERVICE           = Öffentlicher Dienst DATING_SERVICE           = Partnervermittlung PRODUCTION_AND_INDUSTRY  = Produktion und Industrie FITNESS                  = Sonnen- und Fitnessstudio SERVICES                 = Dienstleistungen HAULIER                  = Spedition GAS_STATION              = Tankstelle TAXI                     = Taxiunternehmen TOURISM                  = Tourismus TRANSPORT                = Transport ADMINISTRATION           = Verwaltung VIDEO_STORE              = Videothek OTHER                    = Sonstige. <br/> EN: contains values for the business line, possible values are AUTOMOTIVE, FINANCES, CONSTRUCTION_INDUSTRY, EDUCATION, CONSULTING_AND_ADVISORY, ENERGY, EROTIC_INDUSTRY, FINANCIAL_SERVICES, GASTRONOMY, HEALTH_SERVICE, WHOLE_AND_RETAIL_SALE, HANDCRAFT, HOTEL_INDUSTRY, REAL_ESTATE, IT_AND_PROGRAMMING, CAR_DEALER, CAR_REPAIR, KIOSK, CHURCH, COURIER_SERVICE, AGRICULTURE, LOGISTIC, MEDIA_INDUSTRY, PUBLIC_SERVICE, DATING_SERVICE, PRODUCTION_AND_INDUSTRY, FITNESS, SERVICES, HAULIER, GAS_STATION, TAXI, TOURISM, TRANSPORT, ADMINISTRATION, VIDEO_STORE, OTHER.\n',
        example: 'AGRICULTURE',
        'x-extensible-enum': [
          'AUTOMOTIVE',
          'FINANCES',
          'CONSTRUCTION_INDUSTRY',
          'EDUCATION',
          'CONSULTING_AND_ADVISORY',
          'ENERGY',
          'EROTIC_INDUSTRY',
          'FINANCIAL_SERVICES',
          'GASTRONOMY',
          'HEALTH_SERVICE',
          'WHOLE_AND_RETAIL_SALE',
          'HANDCRAFT',
          'HOTEL_INDUSTRY',
          'REAL_ESTATE',
          'IT_AND_PROGRAMMING',
          'CAR_DEALER',
          'CAR_REPAIR',
          'KIOSK',
          'CHURCH',
          'COURIER_SERVICE',
          'AGRICULTURE',
          'LOGISTIC',
          'MEDIA_INDUSTRY',
          'PUBLIC_SERVICE',
          'DATING_SERVICE',
          'PRODUCTION_AND_INDUSTRY',
          'FITNESS',
          'SERVICES',
          'HAULIER',
          'GAS_STATION',
          'TAXI',
          'TOURISM',
          'TRANSPORT',
          'ADMINISTRATION',
          'VIDEO_STORE',
          'OTHER'
        ]
      },
      Child: {
        type: 'object',
        description:
          'DE: beschreibt ein Kind (Im Umfang der Daten reduzierte Person) <br/> EN: a child is a segment of the data of a person\n',
        properties: {
          personId: {
            type: 'string',
            format: 'uuid',
            description:
              'DE: eindeutiger Schlüssel (ID), der die Person (hier: das Kind) identifiziert <br/> EN: unique id referencing this person\n'
          },
          birthDate: {
            description:
              'DE: Geburtsdatum des Kindes. Das Datum muss in der Vergangenheit liegen oder das aktuelle Datum sein. <br/> EN: Date of birth of the child. The date must be in the past or the current date.\n',
            allOf: [
              {
                $ref: '#/components/schemas/ISODate'
              }
            ]
          },
          firstName: {
            type: 'string',
            maxLength: 100,
            description: 'DE: Vorname des Kindes. <br/> EN: First name of the child.\n'
          },
          lastName: {
            type: 'string',
            maxLength: 100,
            description: 'DE: Nachname der Kindes. <br/> EN: Last name of the child.\n'
          },
          childAllowanceEntitled: {
            type: 'boolean',
            default: true,
            description:
              'DE: ist das Kind zum Bezug von Kindergeld berechtigt <br/> EN: flag indicating whether this child is entitled to receive governmental child allowance\n'
          }
        }
      },
      ClosedPropertySale: {
        required: ['reason'],
        description:
          'DE: Information zur Zwischenfinanzierung in Zusammenhang mit einem abgeschlossenen Immobilienverkauf. <br/> EN: Bridging debt associated with a closed property sale.\n',
        allOf: [
          {
            $ref: '#/components/schemas/BridgingLoan'
          }
        ]
      },
      CommonAddress: {
        type: 'object',
        title: 'CommonAddress',
        description:
          'DE: Adresse mit Angabe von Land, Stadt und PLZ. Bundesland, Straße und Straßennummer sind optional. <br/> EN: Address object: Country, city and zip are required, province, street and housenumber are optional.\n',
        properties: {
          street: {
            type: 'string',
            maxLength: 85,
            nullable: true
          },
          housenumber: {
            type: 'string',
            maxLength: 14,
            nullable: true
          },
          zip: {
            type: 'string'
          },
          city: {
            type: 'string',
            maxLength: 100
          },
          province: {
            type: 'string',
            description:
              'DE: Gebiet des Landes (Bundesland, Staat) in ISO 3166-2 Format. Besteht aus zwei Codes getrennt durch Bindestrich. (https://de.wikipedia.org/wiki/ISO_3166-2)<br/> EN: Subdivision of a country (provinces, states) in ISO_3166-2 format. Two parts, separated by a hyphen. (https://en.wikipedia.org/wiki/ISO_3166-2).\n',
            pattern: '^[A-Z]{2,2}-[0-9A-Z]{1,3}$'
          },
          country: {
            description:
              'DE: Zwei-Buchstaben Länder-Code in ISO 3166-1-alpha-2 Format. (https://de.wikipedia.org/wiki/ISO-3166-1-Kodierliste). <br/> EN: Two-letter Code for each country defined in ISO 3166-1-alpha-2 format. (https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n',
            type: 'string',
            pattern: '^[A-Z]{2}$'
          }
        }
      },
      Contact: {
        type: 'object',
        description:
          'DE: eine Kontaktmöglichkeit. Nur relevant, wenn Typ und Wert vorhanden sind.<br/> EN: defines a means of contact. Only relevant if type and value are present.\n',
        required: ['type', 'value'],
        properties: {
          type: {
            type: 'string',
            description:
              'DE: Typ des Kontakts (MOBILE = Mobilfunknummer, MOBILE_WORK = geschäftliche/dienstliche/Arbeits- Mobilfunknummer  LANDLINE = Festnetznummer, PHONE = Telephonnumer ohne Typ, EMAIL = Email-Adresse). <br/> EN: Type of the contact, possible values are MOBILE, MOBILE_WORK, LANDLINE, PHONE, EMAIL.\n',
            enum: ['PHONE', 'LANDLINE', 'MOBILE', 'MOBILE_WORK', 'EMAIL']
          },
          value: {
            description:
              'DE: Wert des Kontakts, je nach Typ Mobil- oder Festnetztelefonnummer oder Email-Adresse. Werte von Kontakten vom Typ PHONE, LANDLINE, MOBILE oder MOBILE_WORK dürfen nicht länger als 35 Zeichen sein.<br/> EN: Details of the contact, depending on type might be telephone number or an email address. Values of contacts of type PHONE, LANDLINE, MOBILE or MOBILE_WORK type must not be longer than 35 characters.\n',
            example: '+49 160 123456 or max@mustermann.de',
            type: 'string',
            maxLength: 100
          },
          preferred: {
            deprecated: true,
            description: '<b>ATTENTION will be removed without notice</b>',
            type: 'boolean',
            default: false
          }
        }
      },
      CountryCode: {
        type: 'object',
        description:
          'DE: Ländercode nach ISO_3166-1_alpha-2 (https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). <br/> EN: Official ISO_3166-1_alpha-2 (https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code.\n',
        required: ['value'],
        properties: {
          value: {
            type: 'string',
            example: 'DE',
            enum: [
              'AD',
              'AE',
              'AF',
              'AG',
              'AL',
              'AM',
              'AO',
              'AR',
              'AT',
              'AU',
              'AW',
              'AZ',
              'BA',
              'BB',
              'BD',
              'BE',
              'BF',
              'BG',
              'BH',
              'BI',
              'BJ',
              'BM',
              'BN',
              'BO',
              'BR',
              'BS',
              'BT',
              'BW',
              'BY',
              'BZ',
              'CA',
              'CD',
              'CF',
              'CG',
              'CH',
              'CI',
              'CL',
              'CM',
              'CN',
              'CO',
              'CR',
              'CU',
              'CV',
              'CY',
              'CZ',
              'DE',
              'DJ',
              'DK',
              'DM',
              'DO',
              'DZ',
              'EC',
              'EE',
              'EG',
              'ER',
              'ES',
              'ET',
              'FI',
              'FJ',
              'FM',
              'FR',
              'GA',
              'GB',
              'GD',
              'GE',
              'GF',
              'GH',
              'GM',
              'GN',
              'GQ',
              'GR',
              'GT',
              'GW',
              'GY',
              'HN',
              'HR',
              'HT',
              'HU',
              'ID',
              'IE',
              'IL',
              'IN',
              'IQ',
              'IR',
              'IS',
              'IT',
              'JM',
              'JO',
              'JP',
              'KE',
              'KG',
              'KH',
              'KI',
              'KM',
              'KN',
              'KP',
              'KR',
              'KW',
              'KY',
              'KZ',
              'LA',
              'LB',
              'LC',
              'LI',
              'LK',
              'LR',
              'LS',
              'LT',
              'LU',
              'LV',
              'LY',
              'MA',
              'MC',
              'MD',
              'ME',
              'MG',
              'MH',
              'MK',
              'ML',
              'MM',
              'MN',
              'MR',
              'MT',
              'MU',
              'MV',
              'MW',
              'MX',
              'MY',
              'MZ',
              'NA',
              'NE',
              'NG',
              'NI',
              'NL',
              'NO',
              'NP',
              'NR',
              'NZ',
              'OM',
              'PA',
              'PE',
              'PG',
              'PH',
              'PK',
              'PL',
              'PS',
              'PT',
              'PW',
              'PY',
              'QA',
              'RO',
              'RS',
              'RU',
              'RW',
              'SA',
              'SB',
              'SC',
              'SD',
              'SE',
              'SG',
              'SI',
              'SK',
              'SL',
              'SM',
              'SN',
              'SO',
              'SR',
              'ST',
              'SV',
              'SY',
              'SZ',
              'TD',
              'TG',
              'TH',
              'TJ',
              'TL',
              'TM',
              'TN',
              'TO',
              'TR',
              'TT',
              'TV',
              'TW',
              'TZ',
              'UA',
              'UG',
              'US',
              'UY',
              'UZ',
              'VA',
              'VC',
              'VE',
              'VN',
              'VU',
              'WS',
              'XK',
              'XX',
              'YE',
              'ZA',
              'ZM',
              'ZW'
            ]
          }
        }
      },
      CountryType: {
        type: 'string',
        default: 'DE',
        description:
          'DE: Länder-Code (Teil der Adresse) nach ISO_3166-1_alpha-2 (https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). <br/> EN: Official ISO_3166-1_alpha-2 (https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the address.\n',
        enum: [
          'XK',
          'PS',
          'PT',
          'PW',
          'PY',
          'QA',
          'AD',
          'AE',
          'AF',
          'AG',
          'AL',
          'AM',
          'AO',
          'AR',
          'AT',
          'AU',
          'AW',
          'AZ',
          'RO',
          'BA',
          'BB',
          'RS',
          'BD',
          'BE',
          'RU',
          'BF',
          'BG',
          'RW',
          'BH',
          'BI',
          'BJ',
          'BM',
          'BN',
          'BO',
          'SA',
          'SB',
          'BR',
          'SC',
          'BS',
          'SD',
          'BT',
          'SE',
          'SG',
          'BW',
          'SI',
          'BY',
          'BZ',
          'SK',
          'SL',
          'SM',
          'SN',
          'SO',
          'CA',
          'SR',
          'CD',
          'ST',
          'SV',
          'CF',
          'CG',
          'CH',
          'CI',
          'SY',
          'SZ',
          'CL',
          'CM',
          'CN',
          'CO',
          'CR',
          'TD',
          'CU',
          'CV',
          'TG',
          'TH',
          'CY',
          'CZ',
          'TL',
          'TM',
          'TN',
          'TO',
          'TR',
          'TT',
          'DE',
          'TV',
          'TW',
          'DJ',
          'TZ',
          'DK',
          'DM',
          'DO',
          'UA',
          'UG',
          'TJ',
          'DZ',
          'EC',
          'US',
          'EE',
          'EG',
          'UY',
          'UZ',
          'VA',
          'ER',
          'VC',
          'ES',
          'ET',
          'VE',
          'VN',
          'VU',
          'FI',
          'FJ',
          'FM',
          'FR',
          'GA',
          'GB',
          'WS',
          'GD',
          'GE',
          'GF',
          'GH',
          'GM',
          'GN',
          'GQ',
          'GR',
          'GT',
          'GW',
          'GY',
          'XX',
          'HN',
          'HR',
          'HT',
          'YE',
          'HU',
          'ID',
          'IE',
          'IL',
          'IN',
          'ZA',
          'IQ',
          'IR',
          'IS',
          'IT',
          'ZM',
          'ZW',
          'JM',
          'JO',
          'JP',
          'KE',
          'KG',
          'KH',
          'KI',
          'KM',
          'KN',
          'KP',
          'KR',
          'KW',
          'KY',
          'KZ',
          'LA',
          'LB',
          'LC',
          'LI',
          'LK',
          'LR',
          'LS',
          'LT',
          'LU',
          'LV',
          'LY',
          'MA',
          'MC',
          'MD',
          'ME',
          'MG',
          'MH',
          'MK',
          'ML',
          'MM',
          'MN',
          'MR',
          'MT',
          'MU',
          'MV',
          'MW',
          'MX',
          'MY',
          'MZ',
          'NA',
          'NE',
          'NG',
          'NI',
          'NL',
          'NO',
          'NP',
          'NR',
          'NZ',
          'OM',
          'PA',
          'PE',
          'PG',
          'PH',
          'PK',
          'PL'
        ]
      },
      CreditLiability: {
        type: 'object',
        description: 'DE: ein Ratenkredit<br/> EN: a consumer credit\n',
        required: ['type'],
        properties: {
          repay: {
            type: 'boolean',
            default: true,
            description:
              'DE: Flag, ob die Ablösung des Kredites geplant ist. <br/> EN: Flag indicates that the loan is planed to be repayed.\n'
          },
          residualDebt: {
            description: 'DE: Aktuelle Restschuld. <br/> EN: Current remaining debt.\n',
            allOf: [
              {
                $ref: '#/components/schemas/PositiveEuroAmount'
              }
            ]
          },
          creditLiabilityType: {
            description:
              'DE: Art des Kredits (\n    CONSUMER_CREDIT=Konsumentenkredit,\n    CAR_CREDIT=Autokredit,\n    LINE_OF_CREDIT=Rahmenkredit,\n    CALL_CREDIT=Abrufkredit,\n    BUSINESS_CREDIT=Geschäftskredit,\n    CREDIT_CARD=Kreditkarte,\n    EMPLOYEE_LOAN=Arbeitgeberdarlehen\n    ZERO_PERCENT_FINANCING=0%-Finanzierung,\n    BALLOON_FINANCING=Ballonfinanzierung,\n    BLANK_MORTGAGE=Blanko-Bauspardarlehen,\n    EDUCATION_LOAN=Bildungskredit,\n    SUBSTITUTE_SECURITY=Ersatzsicherheit,\n    SMALL_LOAN=Kleindarlehen )<br/>\nEN: type of liability\n',
            type: 'string',
            'x-extensible-enum': [
              'CONSUMER_CREDIT',
              'CAR_CREDIT',
              'LINE_OF_CREDIT',
              'CALL_CREDIT',
              'BUSINESS_CREDIT',
              'CREDIT_CARD',
              'EMPLOYEE_LOAN',
              'ZERO_PERCENT_FINANCING',
              'BALLOON_FINANCING',
              'BLANK_MORTGAGE',
              'EDUCATION_LOAN',
              'SUBSTITUTE_SECURITY',
              'SMALL_LOAN'
            ]
          }
        },
        allOf: [
          {
            $ref: '#/components/schemas/Liability'
          }
        ]
      },
      Currency: {
        type: 'string',
        title: 'Currency',
        description:
          'DE: 3-Buchstaben-Währungscode gemäß ISO-4217. (https://de.wikipedia.org/wiki/ISO_4217)<br/> EN: 3 letter currency code as defined by ISO-4217. (https://en.wikipedia.org/wiki/ISO_4217)\n',
        default: 'EUR',
        example: 'USD',
        pattern: '^[A-Z]{3}$',
        'x-extensible-enum': [
          'AED',
          'AFN',
          'ALL',
          'AMD',
          'ANG',
          'AOA',
          'ARS',
          'AUD',
          'AWG',
          'AZN',
          'BAM',
          'BBD',
          'BDT',
          'BGN',
          'BHD',
          'BIF',
          'BMD',
          'BND',
          'BOB',
          'BOV',
          'BRL',
          'BSD',
          'BTN',
          'BWP',
          'BYN',
          'BZD',
          'CAD',
          'CDF',
          'CHE',
          'CHF',
          'CHW',
          'CLF',
          'CLP',
          'CNY',
          'COP',
          'COU',
          'CRC',
          'CUC',
          'CUP',
          'CVE',
          'CZK',
          'DJF',
          'DKK',
          'DOP',
          'DZD',
          'EGP',
          'ERN',
          'ETB',
          'EUR',
          'FJD',
          'FKP',
          'GBP',
          'GEL',
          'GHS',
          'GIP',
          'GMD',
          'GNF',
          'GTQ',
          'GYD',
          'HKD',
          'HNL',
          'HRK',
          'HTG',
          'HUF',
          'IDR',
          'ILS',
          'INR',
          'IQD',
          'IRR',
          'ISK',
          'JMD',
          'JOD',
          'JPY',
          'KES',
          'KGS',
          'KHR',
          'KMF',
          'KPW',
          'KRW',
          'KWD',
          'KYD',
          'KZT',
          'LAK',
          'LBP',
          'LKR',
          'LRD',
          'LSL',
          'LYD',
          'MAD',
          'MDL',
          'MGA',
          'MKD',
          'MMK',
          'MNT',
          'MOP',
          'MRU',
          'MUR',
          'MVR',
          'MWK',
          'MXN',
          'MXV',
          'MYR',
          'MZN',
          'NAD',
          'NGN',
          'NIO',
          'NOK',
          'NPR',
          'NZD',
          'OMR',
          'PAB',
          'PEN',
          'PGK',
          'PHP',
          'PKR',
          'PLN',
          'PYG',
          'QAR',
          'RON',
          'RSD',
          'RUB',
          'RWF',
          'SAR',
          'SBD',
          'SCR',
          'SDG',
          'SEK',
          'SGD',
          'SHP',
          'SLE',
          'SLL',
          'SOS',
          'SRD',
          'SSP',
          'STN',
          'SVC',
          'SYP',
          'SZL',
          'THB',
          'TJS',
          'TMT',
          'TND',
          'TOP',
          'TRY',
          'TTD',
          'TWD',
          'TZS',
          'UAH',
          'UGX',
          'USD',
          'USN',
          'UYI',
          'UYU',
          'UYW',
          'UZS',
          'VED',
          'VES',
          'VND',
          'VUV',
          'WST',
          'XAF',
          'XCD',
          'XDR',
          'XOF',
          'XPF',
          'XSU',
          'XUA',
          'YER',
          'ZAR',
          'ZMW',
          'ZWL'
        ]
      },
      CurrentAddress: {
        type: 'object',
        description:
          'DE: Die aktuelle Wohnaddresse der Person. Deutschland wird als Default-Land gesetzt, falls das Feld leergelassen wird.<br> EN: The current living address of the person. If left empty, the country will be set to Germany.\n',
        allOf: [
          {
            $ref: '#/components/schemas/CommonAddress'
          }
        ]
      },
      Debtor: {
        type: 'object',
        description:
          'DE: Ein Darlehensnehmer eines bestehenden Darlehens. Entweder eine Referenz zu einer Person des Intents oder ein kleines Datenobjekt, was einen Dritten beschreibt.<br/> EN: A debtor of an existing loan. Either a reference to a person of the intent or a small data object that describes a third-party person.\n',
        required: ['debtorId', 'type'],
        properties: {
          debtorId: {
            type: 'string',
            format: 'uuid',
            description:
              'DE: Eindeutiger Schlüssel (ID), der den Darlehensnehmer identifiziert.<br/>  EN: Unique id referencing this debtor.\n'
          },
          type: {
            type: 'string',
            description:
              'DE: Art des Darlehensnehmers, mögliche Ausprägungen sind INTENT_PERSON_DEBTOR (Person des Intents) und THIRD_PARTY_DEBTOR (Dritter).<br/> EN: Type of the debtor, possible values are INTENT_PERSON_DEBTOR (person of the intent) and THIRD_PARTY_DEBTOR (third-party person).\n',
            example: 'INTENT_PERSON_DEBTOR',
            enum: ['INTENT_PERSON_DEBTOR', 'THIRD_PARTY_DEBTOR'],
            nullable: false
          }
        },
        discriminator: {
          propertyName: 'type',
          mapping: {
            INTENT_PERSON_DEBTOR: '#/components/schemas/IntentPersonDebtor',
            THIRD_PARTY_DEBTOR: '#/components/schemas/ThirdPartyDebtor'
          }
        }
      },
      DepartmentOne: {
        type: 'object',
        description:
          'DE: Grundbuch Abteilung I (Bestandsverzeichnis)<br/> EN: Registry Department One\n',
        properties: {
          departmentOneId: {
            type: 'string',
            format: 'uuid',
            description:
              'DE: technische ID der Grundbuch-Abteilung I <br/> EN: technical ID of the first section of the land register\n'
          },
          sequence: {
            type: 'string',
            maxLength: 100,
            description:
              'DE: Laufende Nummer eines Grundstücks/Eigentum. <br/> EN: Serial number of the property.\n'
          },
          commonPropertyShare: {
            type: 'number',
            minimum: 0,
            maximum: 100000000,
            description:
              'DE: Miteigentumsanteil (https://de.wikipedia.org/wiki/Miteigentumsanteil). EN: Co-ownership share (https://de.wikipedia.org/wiki/Miteigentumsanteil).\n'
          },
          commonPropertyTotal: {
            type: 'number',
            minimum: 0,
            maximum: 100000000,
            description: 'DE: Summe der Miteigentumsanteile. EN: Total Co-ownership share.\n'
          },
          parcel: {
            type: 'string',
            maxLength: 100,
            pattern: '^[0-9]*$',
            description:
              'DE: Flur. Nur Zahlen sind zulässig. <br/> EN: Land parcel. Only numbers are allowed.\n'
          },
          parcelDesc: {
            type: 'string',
            maxLength: 500,
            description: 'DE: Flurstück. <br/> EN: parcel number.\n'
          },
          parcelSize: {
            type: 'number',
            minimum: 0,
            maximum: 100000000,
            description:
              'DE: Größe des Flurstücks. <br/> DE: Size of the land belonging to the parcel number.\n'
          },
          usageRights: {
            type: 'boolean',
            description:
              'DE: Sondernutzungsrechte die im Grundbuch vermerkt sind.<br/> EN: special usage rights granted in the registry\n',
            default: false
          },
          combinedWith: {
            type: 'array',
            nullable: false,
            description:
              'DE: Sammlung von Sondereigentümern (https://de.wikipedia.org/wiki/Sondereigentum) die mit diesem Miteigentum verbunden sind.<br/> EN: Collection of special properties (inventory units) associated with this co-ownership.\n',
            items: {
              $ref: '#/components/schemas/SpecialProperty'
            }
          }
        }
      },
      DepartmentThree: {
        type: 'object',
        description:
          'DE: Grundbuch - Abteilung III EN: Represents a third section of the land registry\n',
        properties: {
          departmentThreeId: {
            type: 'string',
            format: 'uuid',
            description:
              'DE: technische ID der Grundbuch-Abteilung III <br/> EN: technical ID of the third section of the land register\n'
          },
          sequence: {
            type: 'string',
            maxLength: 32,
            description: 'DE: laufende Nummer EN: Sequence number\n'
          },
          typeOfBurden: {
            type: 'string',
            description:
              'DE: Art der Belastung: LAND_CHARGE = Grundschuld, MORTGAGE = Hypothek <br/> EN: Type of Burden\n',
            enum: ['LAND_CHARGE', 'MORTGAGE']
          },
          creditor: {
            type: 'string',
            maxLength: 100,
            description: 'DE: Gläubiger der Grundschuld EN: Reference to the creditor\n'
          },
          rank: {
            type: 'string',
            maxLength: 50,
            description: 'DE: Rang EN: Rank\n'
          },
          newRank: {
            type: 'string',
            maxLength: 50,
            description: 'DE: neuer Rang EN: new Rank\n'
          },
          nominalAmount: {
            type: 'number',
            minimum: 0,
            maximum: 100000000,
            description: 'DE: Nominalbetrag EN: Nominal Amount\n'
          },
          interestPercentage: {
            type: 'number',
            minimum: 0,
            maximum: 100,
            description:
              'DE: dinglicher Zins EN: The interest (percentage) represents the maximum claim of the land charge creditor\n'
          },
          ancillaryServices: {
            type: 'number',
            minimum: 0,
            maximum: 100,
            description: 'DE: Nebenleistungen EN: Ancillary charges\n'
          },
          asPrimary: {
            type: 'boolean',
            description: 'DE: Vorlast EN: Prior charge\n'
          },
          residualDebt: {
            type: 'number',
            minimum: 0,
            maximum: 100000000,
            description: 'DE: Restschuld EN: Residual debt\n'
          },
          asSecurity: {
            type: 'boolean',
            description: 'DE: wird Grundschuld abgetreten EN: Assignment to a third party\n'
          },
          execSubmission: {
            type: 'boolean',
            description: 'DE: Abtretung nach §800 ZPO EN: Assignment to a third party by §800 ZPO\n'
          },
          oneTimeValuation: {
            type: 'boolean',
            description: 'DE: Einmalvalutierung EN: One-time valuation\n'
          },
          securityType: {
            type: 'string',
            description:
              'DE: Art der Abtretung: CERTIFICATE = Brief, LAND_REGISTER = Buch <br/> EN: Type of assignment to a third party\n',
            enum: ['CERTIFICATE', 'LAND_REGISTER']
          },
          securityAmount: {
            type: 'number',
            minimum: 0,
            maximum: 100000000,
            description:
              'DE: Abzutretender Betrag EN: Amount of money by assigment to a third party\n'
          },
          allLiable: {
            type: 'boolean',
            description: 'DE: Haftung aller Darlehensnehmer EN: Liability of all borrowers\n'
          }
        }
      },
      DepartmentTwo: {
        type: 'object',
        required: ['registrySubordinate'],
        description:
          'DE: Wertmindernde Vorlast (Abt. II)<br/> EN: Loads or restriction (entry from the second section of the land register sheet).\n',
        properties: {
          departmentTwoId: {
            type: 'string',
            format: 'uuid',
            description:
              'DE: technische ID der Grundbuch-Abteilung II <br/> EN: technical ID of the second section of the land register\n'
          },
          chargeType: {
            type: 'string',
            description:
              'DE: Art der Vorlast: DEMOLITION = Abbruchrecht, SEWAGE = Abwässer, DISCHARGE = Auflassungsvormerkung, MINING = Ausbeuten von Bodenbestandsteilen, RAILROAD = Bahngleis, BUILDING_RESTRICTION = Baubeschränkung, BUILDING_INTERDICTION = Bebauungsverbot , USAGE_RESTRITION = Benutzungsbeschränkung, USAGE_RIGHT = Benutzungsrecht, MINING_DAMAGE_RENOUNCEMENT = Bergschadenverzicht, SOIL_PROTECTION_NOTE = Bodenschutzvermerk, DRILL_AND_PROSPECTION_RIGHT = Bohr- & Schürfrecht, BREWERY_RIGHT = Brauereirecht, HISTORICAL_MONUMENT_PROTECTION_NOTE = Denkmalschutzvermerk, DISPOSSESSION_NOTE = Enteignungsvermerk, WINDOW_CLOSING_RIGHT = Fensterschließrecht, FISHING_AND_FOREST_RIGHT = Fischerei- & Forstnutzungsrecht, GASTRONOMY_RIGHT = Gaststättenbetriebsrecht, BUILDING_USAGE_RIGHT = Gebäudenutzungsrecht, BUSINESS_LIMITATION = Gewerbebetriebsbeschränkung, HIGH_VOLTAGE_LINE_RIGHT = Hochspannungsleitungsrecht, LIQUIDATION_NOTE = Konkursvermerk, LIFE_ESTATE = Leibgeding, LIFE_ANNUITY = Leibrente, SUBSTITUTIONAL_HEIR_NOTE = Nacherbenvermerk, LEGACY_ADMINISTRATION_NOTE = Nachlassverwaltungsvermerk, USUFRUCT = Nießbrauch, REPURCHASE_RIGHT = Rückkaufsrecht, RETENTION_NOTE = Rücklassungsvormerkung, RETENTION_NOTE_FOR_MUNICIPALITY = Rücklassungsvormerkung für die Gemeinde, DAM_STRUCTURE = Stauanlage, SUPPORTING_STRUCTURE_RIGHT = Stützrecht, GAS_STATION_RIGHT = Tankstellenrecht, TANSFORMER_STATION_RIGHT = Trafostationsrecht, WILL_EXECUTION_NOTE = Testamentsvollstreckungsvermerk, REALLOCATION_NOTE = Umlegungsvermerk, SALE_LIMITATION_FOR_SURVEY_OFFICE = Veräußerungsbeschränkung für LVA, DISPOSAL_LIMITATION = Verfügungsbeschränkung, SETTLEMENT_NOTE_OWNER = Vergleichsvermerk (Eigentümer), SETTLEMENT_NOTE_BUYER = Vergleichsvermerk (Erwerber), IMMISSION_CONTROL_RENOUNCEMENT = Verzicht auf Abwehrrechte gegenüber Immissionen, NEIGHBOUR_AUTHORIZATION_RENOUNCEMENT = Verzicht auf nachbarrecht. Befugnisse, RIGHT_OF_FIRST_REFUSAL = Vorkaufsrecht, HOUSING_TENURE = Wohnrecht, OCCUPANCY_RIGHT = Wohnbelegungsrecht, ADMINISTRATIVE_NOTICE = Zwangsverwaltungsvermerk, COURT_AUCTION_NOTE = Zwangsversteigerungsvermerk <br> EN: Type of load or restriction\n',
            enum: [
              'DEMOLITION',
              'SEWAGE',
              'DISCHARGE',
              'MINING',
              'RAILROAD',
              'BUILDING_RESTRICTION',
              'BUILDING_INTERDICTION',
              'USAGE_RESTRITION',
              'USAGE_RIGHT',
              'MINING_DAMAGE_RENOUNCEMENT',
              'SOIL_PROTECTION_NOTE',
              'DRILL_AND_PROSPECTION_RIGHT',
              'BREWERY_RIGHT',
              'HISTORICAL_MONUMENT_PROTECTION_NOTE',
              'DISPOSSESSION_NOTE',
              'WINDOW_CLOSING_RIGHT',
              'FISHING_AND_FOREST_RIGHT',
              'GASTRONOMY_RIGHT',
              'BUILDING_USAGE_RIGHT',
              'BUSINESS_LIMITATION',
              'HIGH_VOLTAGE_LINE_RIGHT',
              'LIQUIDATION_NOTE',
              'LIFE_ESTATE',
              'LIFE_ANNUITY',
              'SUBSTITUTIONAL_HEIR_NOTE',
              'LEGACY_ADMINISTRATION_NOTE',
              'USUFRUCT',
              'REPURCHASE_RIGHT',
              'RETENTION_NOTE',
              'RETENTION_NOTE_FOR_MUNICIPALITY',
              'DAM_STRUCTURE',
              'SUPPORTING_STRUCTURE_RIGHT',
              'GAS_STATION_RIGHT',
              'TANSFORMER_STATION_RIGHT',
              'WILL_EXECUTION_NOTE',
              'REALLOCATION_NOTE',
              'SALE_LIMITATION_FOR_SURVEY_OFFICE',
              'DISPOSAL_LIMITATION',
              'SETTLEMENT_NOTE_OWNER',
              'SETTLEMENT_NOTE_BUYER',
              'IMMISSION_CONTROL_RENOUNCEMENT',
              'NEIGHBOUR_AUTHORIZATION_RENOUNCEMENT',
              'RIGHT_OF_FIRST_REFUSAL',
              'HOUSING_TENURE',
              'OCCUPANCY_RIGHT',
              'ADMINISTRATIVE_NOTICE',
              'COURT_AUCTION_NOTE'
            ]
          },
          registrySubordinate: {
            type: 'boolean',
            description: 'DE: Rangrücktritt. <br/> EN: Subordination (Resignation of priority).\n',
            default: false
          }
        }
      },
      EconomicEvaluationItem: {
        type: 'object',
        allOf: [
          {
            $ref: '#/components/schemas/SelfEmploymentIncomeItem'
          }
        ],
        properties: {
          month: {
            type: 'string',
            pattern: '^[0-9]{2}/[0-9]{4}$',
            maxLength: 7,
            minLength: 7,
            description:
              'DE: Monat, für den die BWA gilt, im Format MM/YYYY<br/> EN: month the Economic Evaluation has been performed for\n',
            example: '01/2022'
          }
        }
      },
      Employment: {
        type: 'object',
        description:
          'DE: Beschreibt ein Beschäftigungsverhältnis inklusive der daraus resultierenden Einkommen <br/> EN: Describes an employment including the generated income\n',
        allOf: [
          {
            $ref: '#/components/schemas/Occupation'
          }
        ],
        properties: {
          jobDescription: {
            type: 'string',
            maxLength: 100,
            description:
              'DE: Stellenbeschreibung der Tätigkeit. <br/> EN: The description/name of the job.\n'
          },
          inProbation: {
            description: 'DE: Noch in der Probezeit<br/> EN: Employment on probation\n',
            type: 'boolean'
          },
          endOfProbationDate: {
            description: 'DE: Ende der Probezeit<br/> EN: End of the probation period\n',
            allOf: [
              {
                $ref: '#/components/schemas/ISODate'
              }
            ]
          },
          fixedTermContract: {
            description:
              'DE: Wahr, wenn der Vertrag zeitlich befristet ist. <br/> EN: True, if the contract is temporal limited.\n',
            type: 'boolean',
            default: false
          },
          fixedTermEndDate: {
            description:
              'DE: Datum, an dem der Vertrag endet. <br/> EN: End date of the contract.\n',
            allOf: [
              {
                $ref: '#/components/schemas/ISODate'
              }
            ]
          },
          income: {
            $ref: '#/components/schemas/EmploymentIncome'
          }
        }
      },
      EmploymentIncome: {
        type: 'object',
        description:
          'DE: Enthält alle Einkommensinformationen für das Beschäftigungsverhältnis<br/> EN: encapsulates all income information for the employment\n',
        properties: {
          netIncome: {
            description: 'DE: Nettoeinkommen pro Monat<br/> EN: net income per month\n',
            allOf: [
              {
                $ref: '#/components/schemas/PositiveEuroAmount'
              }
            ]
          },
          grossIncome: {
            description: 'DE: Bruttoeinkommen pro Monat<br/> EN: gross income per month\n',
            allOf: [
              {
                $ref: '#/components/schemas/PositiveEuroAmount'
              }
            ]
          },
          numberOfPaymentsPerYear: {
            type: 'number',
            maximum: 24,
            minimum: 0,
            description:
              'DE: Anzahl der Gehaltszahlungen pro Jahr<br/> EN: Number of payments per year\n',
            example: 13.5
          },
          variableIncome: {
            type: 'array',
            nullable: false,
            description:
              'DE: Liste von variablen Einkünften. In dieser Liste darf für jeden Typ des variablen Einkommens nur ein Eintrag vorhanden sein. Überzählige Einträge werden gelöscht.<br/> EN: List of variable incomes. The list may contain between 0 and 1 entries for each type of variable income. Excess entries will be deleted.\n',
            items: {
              $ref: '#/components/schemas/VariableIncome'
            }
          }
        }
      },
      Estate: {
        type: 'object',
        required: ['estateId', 'address', 'type'],
        properties: {
          type: {
            type: 'string',
            description:
              'DE: Art des Estates, mögliche Ausprägungen APARTMENT=Wohnung, DETACHED_HOUSE=Einfamilienhaus, SEMI_DETACHED_HOUSE=Doppelhaushälfte, TWO_FAMILY_HOUSE=Zweifamilienhaus, END_TERRACE_HOUSE=Reiheneckhaus, MID_TERRACE_HOUSE=Reihenmittelhaus, APARTMENT_BUILDING=Mehrfamilienhaus, RESIDENTIAL_AND_COMMERCIAL_BUILDING=Wohn_und_Geschäftshaus, PROPERTY=Nur_Grundstück . <br/> EN: contains property type details, possible values are APARTMENT, DETACHED_HOUSE, SEMI_DETACHED_HOUSE, TWO_FAMILY_HOUSE, END_TERRACE_HOUSE, MID_TERRACE_HOUSE, APARTMENT_BUILDING, RESIDENTIAL_AND_COMMERCIAL_BUILDING, PROPERTY, COMMERCIAL_PROPERTY.\n',
            example: 'APARTMENT',
            enum: [
              'APARTMENT',
              'DETACHED_HOUSE',
              'SEMI_DETACHED_HOUSE',
              'TWO_FAMILY_HOUSE',
              'END_TERRACE_HOUSE',
              'MID_TERRACE_HOUSE',
              'APARTMENT_BUILDING',
              'RESIDENTIAL_AND_COMMERCIAL_BUILDING',
              'PROPERTY'
            ],
            nullable: false
          },
          estateId: {
            type: 'string',
            description:
              'DE: ID der Immobilie. Wird bei der Anlage eines estates vom Service generiert und gesetzt.<br/> EN: ID of the estate. Is generated and set by the service when the estate is created.\n'
          },
          companyId: {
            type: 'string',
            description: 'DE: ID der Company des Kunden. <br/> EN: company id of the customer.\n'
          },
          created: {
            type: 'string',
            format: 'date-time',
            readOnly: true,
            description:
              'DE: Zeitstempel der Erstellung des Datensatzes.<br/> EN: the date/time data for this estate was created\n'
          },
          modified: {
            type: 'string',
            format: 'date-time',
            readOnly: true,
            description:
              'DE: Zeitstempel der Veränderung des Datensatzes.<br/> EN: the date/time data for this estate was modified\n'
          },
          origin: {
            $ref: '#/components/schemas/EstateOrigin'
          },
          address: {
            $ref: '#/components/schemas/Address'
          },
          landArea: {
            type: 'number',
            minimum: 0,
            maximum: 100000,
            description: 'DE: Grundstücksgröße. <br/> EN: Property size.\n'
          },
          externalMarketValue: {
            $ref: '#/components/schemas/ExternalEvaluation'
          },
          stdGroundValue: {
            $ref: '#/components/schemas/ExternalEvaluation'
          },
          registry: {
            $ref: '#/components/schemas/Registry'
          },
          liableProperties: {
            type: 'array',
            nullable: false,
            description:
              'DE: Mithaftende Grundstücke. Zu einem Objekt können noch Grundstücke gehören (Garten o.ä.) die einen eigenen Grundbucheintrag haben aber immer im Zusammenhang mit dem Gebäude veräussert werden. Die Grundbucheinträge zu diesen werden hier erfasst.<br/> EN: Liable properties are properties belonging to the estate but having an own registry entry. these entries are contained within this list.\n',
            items: {
              $ref: '#/components/schemas/Registry'
            }
          }
        },
        discriminator: {
          propertyName: 'type',
          mapping: {
            APARTMENT: '#/components/schemas/Apartment',
            DETACHED_HOUSE: '#/components/schemas/House',
            SEMI_DETACHED_HOUSE: '#/components/schemas/House',
            TWO_FAMILY_HOUSE: '#/components/schemas/House',
            END_TERRACE_HOUSE: '#/components/schemas/House',
            MID_TERRACE_HOUSE: '#/components/schemas/House',
            APARTMENT_BUILDING: '#/components/schemas/ApartmentBuilding',
            RESIDENTIAL_AND_COMMERCIAL_BUILDING:
              '#/components/schemas/ResidentialAndCommercialBuilding',
            PROPERTY: '#/components/schemas/PlotOfLand'
          }
        }
      },
      EstateCosts: {
        type: 'object',
        required: ['type'],
        description: 'DE: Typisierte Kosten der Immobilie<br/> EN: typed costs of the estate\n',
        properties: {
          type: {
            type: 'string',
            description:
              'DE: Art der Kosten. Mögliche Ausprägungen sind: CONSTRUCTION (Baukosten), PURCHASE (Kaufpreis), TAX (Grunderwerbssteuer), BROKER (Makler-Provision), NOTARY (Notar- und Grundbuchkosten), INVENTORY (Mobiliar-/Inventarkosten), LAND (Grundstückspreis), INCIDENTALS (Baunebenkosten), DESTRUCTION (Abrisskosten), OUTSIDE (Kosten für Außenanlagen), RENOVATION (Renovierungskosten, nicht relevant bei Finanzierungsgründen Kauf Neubau und eigenes Bauvorhaben), EXTRA_EQUIPMENT (Sonderausstattung, nur relevant bei Finanzierungsgrund Kauf Neubau), OTHER (Sonstige Kosten, nur hier ist die Beschreibung relevant)<br/> EN: type of costs. Possible values are CONSTRUCTION, PURCHASE, TAX, BROKER, NOTARY, INVENTORY, LAND, INCIDENTALS, DESTRUCTION, OUTSIDE, RENOVATION (not relevant for project types BUY_NEW and BUILD), EXTRA_EQUIPMENT (only relevant for project type BUY_NEW), OTHER.\n',
            enum: [
              'CONSTRUCTION',
              'PURCHASE',
              'TAX',
              'BROKER',
              'NOTARY',
              'INVENTORY',
              'LAND',
              'INCIDENTALS',
              'DESTRUCTION',
              'OUTSIDE',
              'RENOVATION',
              'EXTRA_EQUIPMENT',
              'OTHER'
            ]
          },
          amount: {
            type: 'number',
            minimum: 0,
            maximum: 100000000,
            description: 'DE: Betrag in Euro<br/> EN: amount in Euro\n'
          },
          percentage: {
            type: 'number',
            minimum: 0,
            maximum: 100,
            description:
              'DE: Prozentualer Anteil vom gesamten Preis<br/> EN: percentage of total price\n'
          },
          valueEntryFormat: {
            type: 'string',
            readOnly: true,
            description:
              'DE: Wie der Wert eingegeben wurde (als Betrag oder prozentualer Anteil)<br/> EN: How the value was entered (as amount or percentage)\n',
            enum: ['AMOUNT', 'PERCENTAGE']
          },
          description: {
            type: 'string',
            maxLength: 400,
            description:
              "DE: Beschreibung der Kosten, relevant nur für type 'OTHER'<br/> EN: description of costs, relevant only for type 'OTHER'\n"
          }
        }
      },
      EstateFact: {
        type: 'object',
        readOnly: true,
        description: 'DE: Kurzbeschreibung der Immobilie EN: short facts regarding the estate\n',
        properties: {
          estateId: {
            type: 'string',
            readOnly: true,
            description: 'DE: id der Immobilie. <br> EN: id of estate.\n'
          },
          projectType: {
            readOnly: true,
            description:
              'DE: Finanzierungsgründe, z.B. BUY_NEW, BUY_EXISTING, BUILD, REFINANCE, RENOVATE, RAISE_CAPITAL. <br/> EN: financing reason, possible values are BUY_NEW, BUY_EXISTING, BUILD, REFINANCE, RENOVATE, RAISE_CAPITAL.<br/>\n',
            allOf: [
              {
                $ref: '#/components/schemas/FinancingReason'
              }
            ]
          },
          type: {
            type: 'string',
            description:
              'DE: Art des Estates, mögliche Ausprägungen APARTMENT=Wohnung, DETACHED_HOUSE=Einfamilienhaus, SEMI_DETACHED_HOUSE=Doppelhaushälfte, TWO_FAMILY_HOUSE=Zweifamilienhaus, END_TERRACE_HOUSE=Reiheneckhaus, MID_TERRACE_HOUSE=Reihenmittelhaus, APARTMENT_BUILDING=Mehrfamilienhaus, RESIDENTIAL_AND_COMMERCIAL_BUILDING=Wohn_und_Geschäftshaus, PROPERTY=Nur_Grundstück . <br/> EN: contains property type details, possible values are APARTMENT, DETACHED_HOUSE, SEMI_DETACHED_HOUSE, TWO_FAMILY_HOUSE, END_TERRACE_HOUSE, MID_TERRACE_HOUSE, APARTMENT_BUILDING, RESIDENTIAL_AND_COMMERCIAL_BUILDING, PROPERTY, COMMERCIAL_PROPERTY.\n',
            example: 'APARTMENT',
            enum: [
              'APARTMENT',
              'DETACHED_HOUSE',
              'SEMI_DETACHED_HOUSE',
              'TWO_FAMILY_HOUSE',
              'END_TERRACE_HOUSE',
              'MID_TERRACE_HOUSE',
              'APARTMENT_BUILDING',
              'RESIDENTIAL_AND_COMMERCIAL_BUILDING',
              'PROPERTY'
            ]
          },
          address: {
            description:
              'DE: die (postalische) Adresse des Objekts.<br/> EN: the postal address of the object.\n',
            allOf: [
              {
                $ref: '#/components/schemas/CommonAddress'
              }
            ]
          },
          usage: {
            type: 'string',
            nullable: false,
            enum: ['SELF', 'RENT', 'MIXED'],
            description:
              'DE: Nutzung der Immobilie (SELF=Eigennutzung, RENT=vermieten oder MIXED=teilweise vermieten)<br/>  EN: Usage of this group'
          }
        }
      },
      EstateOrigin: {
        type: 'object',
        properties: {
          additionalInformationSource: {
            type: 'string',
            description:
              'DE: Quelle der Objektinformationen (für type=PLATFORM) <br/> EN: Source of the estate information (for type PLATFORM)\n',
            enum: ['IMMOSCOUT', 'IMMOWELT', 'IMMONET', 'SCOPERTY', 'PROPERTY_DEVELOPER', 'OTHER']
          },
          additionalInformationDetails: {
            type: 'string',
            maxLength: 4000,
            description:
              'DE:Detail zur Quelle, z.B. Link zu dem Objekt auf der Platform EN: e.g. id of or link to this estate in the platform\n'
          },
          type: {
            type: 'string',
            description: 'DE: Herkunftstyp der Objektinformationen<br/> EN: Type of origin\n',
            enum: ['PLATFORM', 'MANUAL', 'ESTATEDB']
          },
          imageUrl: {
            type: 'string',
            maxLength: 2048,
            description:
              'DE: URL eines Bildes der Immobilie<br/> EN: url of an image characterising this estate\n'
          },
          date: {
            type: 'string',
            format: 'date-time',
            readOnly: true,
            description:
              'DE: Zeitstempel des Imports der Immobilieninformationen<br/> EN: timestamp of the import of the estate informations\n'
          }
        }
      },
      EstateParams: {
        type: 'object',
        description:
          'DE: Kapselt ein Estate-Service Estate Objekte um die Immobilie im Kontext der Baufinanzierung zu repräsentieren.<br> EN: encapsulates an estate-service estate object to enrich it in the context of the mortgage intent\n',
        required: ['estateId', 'ownership'],
        properties: {
          estateId: {
            type: 'string',
            readOnly: true,
            description:
              'DE: id der zugrundeliegenden Immobilie. Unveränderliches Duplikat zu estateParams.estate.estateId. Ist immer vorhanden. Muss bei create gesetzt werden, Wert wird aber ignoriert und von estateParams.estate.estateId genommen. Die estateId wird vom System beim create erstellt, als Platzhalter muss ein beliebiger alpha-numerischer string verwendet werden.<br> EN: id of estate. Readonly Duplicate of estateParams.estate.estateId. Is always present. Must be set on create, but value is ignored and taken from estateParams.estate.estateId. The estateId is created by the system during create, any alpha-numeric string must be used as a placeholder.\n'
          },
          projectType: {
            description:
              'DE: Finanzierungsgründe, z.B. BUY_NEW, BUY_EXISTING, BUILD, REFINANCE, RENOVATE, RAISE_CAPITAL. <br/>\n    Diese sind abhängig von der ownership: BUY_NEW; BUY_EXISTING und BUILD bedingen ownership=TO_ACQUIRE, \n    REFINANCE, RENOVATE, RAISE_CAPITAL bedingen ownership=OWNED.\n    ProjectType muss gesetzt sein wenn ownership=TO_ACQUIRE ist. Kann null sein, wenn ownership=OWNED ist. \n    ProjectType null bedeutet, für diese Immobilie wird keine Finanzierung benötigt, sie kann aber ggf. als Zusatzsicherheit eingesetzt werden kann.<br/>\nEN: financing reason, possible values are BUY_NEW, BUY_EXISTING, BUILD, REFINANCE, RENOVATE, RAISE_CAPITAL.<br/>\n    There is a dependency between projectType and ownership. BUY_NEW; BUY_EXISTING and BUILD require an ownership of TO_ACQUIRE,\n    REFINANCE, RENOVATE, RAISE_CAPITAL require an ownership of OWNED. Only in combination with ownership OWNED the projectType\n    may be null. This denotes owned estates for which no financing is wanted/required. These may still serve\n    as collateral in a financing of another object.\n',
            allOf: [
              {
                $ref: '#/components/schemas/FinancingReason'
              }
            ]
          },
          externalEstateId: {
            description:
              'DE: Beliebige ID der Immobilie in einem Partner System<br> EN: Arbitrary id of the estate in a partners systems\n',
            type: 'string',
            maxLength: 100,
            example: 'ASDF-10001 B'
          },
          plannedBuyDecisionDate: {
            type: 'string',
            format: 'date',
            description: 'DE: geplantes Entscheidungsdatum<br/> EN: planned decision date\n'
          },
          wantedPayoutDate: {
            type: 'string',
            format: 'date',
            description: 'DE: gewünschtes Auszahlungsdatum<br/> EN: wanted payout date\n'
          },
          state: {
            type: 'string',
            default: 'ACTIVE',
            readOnly: true,
            description:
              'DE: technischer Status der Immobilie. Nur an Immobilien im Status ACTIVE sollten Änderungen vorgenommen werden.<br/> EN: technical state of estate. Only ACTIVE should be edited\n',
            enum: ['ACTIVE', 'DELETED']
          },
          selected: {
            type: 'boolean',
            default: false,
            description:
              'DE: Technisches Kennzeichen für Immobilien die zum Altsystem synchronisiert werden sollen.  Darf nur bei einer Immobilie  in der Liste der Immobilien gesetzt werden. Diese Immobilie muss das shouldBeFinanced Flag gesetzt und einen Finanzierungsgrund haben.  Dieses Flag kann in API Aufrufen ignoriert werden, es hat nur für die Datenerfassung UI Bedeutung<br/> EN: flag indicating this estate has been selected for synchronisation with the monolith. May only be set on one estate in the List of estates and  this estate must also have the shouldBefinanced flag set to true and must contain a projectType. It is intended for use by the moduleIntentData UI.\n'
          },
          ownership: {
            type: 'string',
            default: 'TO_ACQUIRE',
            nullable: false,
            description:
              'DE: Kennzeichen ob die Immobilie erworben werden soll oder sich schon im Besitzt befindet<br/> EN: discerns wether this an estate the customer might buy/build or an estate that the customer already owns\n',
            enum: ['TO_ACQUIRE', 'OWNED']
          },
          shouldBeFinanced: {
            type: 'boolean',
            default: true,
            description:
              'DE: Kennzeichen ob für diese Immobilie eine Finanzierung benötigt wird. Nur für Immobilien, die sich bereits im Besitz befinden. EN: flag indicating whether a mortgage is required for this object. May only be false for estates with ownership=OWNED\n'
          },
          name: {
            type: 'string',
            maxLength: 400,
            description:
              'DE: Benutzerdefinierter Name der Immobilie<br/> EN: user defined name of this estate\n'
          },
          estimatedMarketValue: {
            description:
              'DE: geschätzter Marktwert der Immobilie<br/> EN: estimation of a market value for this estate\n',
            allOf: [
              {
                $ref: '#/components/schemas/PositiveEuroAmount'
              }
            ]
          },
          externalMarketValueEstimationSource: {
            $ref: '#/components/schemas/EstimationSource'
          },
          payout: {
            $ref: '#/components/schemas/Payout'
          },
          estate: {
            $ref: '#/components/schemas/Estate'
          },
          costs: {
            type: 'object',
            description:
              'DE: Map der typisierten Kosten für das Vorhaben. Der Schlüssel der Map ist der Typ der Kosten. Siehe Enum EstateCosts.type<br/> EN: Map of typed costs for the intent. The key of the map is the type of the costs. See enum EstateCosts.type\n',
            additionalProperties: {
              $ref: '#/components/schemas/EstateCosts'
            }
          },
          createdDate: {
            description:
              'DE: Datum der Erstellung des Datensatzes<br/> EN: date this estate data was created\n',
            allOf: [
              {
                $ref: '#/components/schemas/ISODateTime'
              }
            ]
          },
          futureModernisations: {
            type: 'array',
            nullable: false,
            items: {
              $ref: '#/components/schemas/FutureModernisation'
            },
            description:
              'DE: Liste der geplanten Modernisierungen<br/> EN: list of all future modernisatios\n'
          },
          valueAddingModernisationAmount: {
            description:
              'DE: Anteil der Summe der geplanten Modernisierungsmassnahmen, der Wertsteigernd ist. Darf die Summe der Beträge der geplanten Modernisierungen nicht übersteigen<br/> EN: Part of the future modernisations that increases the value of the real estate. May not be larger than the sum of amounts of future modernisations.\n',
            allOf: [
              {
                $ref: '#/components/schemas/PositiveEuroAmount'
              }
            ]
          },
          primaryEnergyDemandAfterModernisation: {
            type: 'integer',
            minimum: 0,
            maximum: 100000,
            description:
              'DE: Primärenergiebedarf nach Modernisierung (in kWh/m2 pro Jahr) - nicht relevant bei Grundstücken, sowie bei den Finanzierungsgründen Bau, Kauf Neubau<br/> EN: primary energy demand after modernisation (kWh/m2 per year) - not relevant for plots of land and financing reasons build, buy new building\n'
          },
          energyEfficiencyClassificationAfterModernisation: {
            type: 'string',
            enum: ['APLUS', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
            description:
              'DE: Energieeffizienzklasse gemäss Energieausweis nach Modernisierung - nicht relevant bei Grundstücken, sowie bei den Finanzierungsgründen Bau, Kauf Neubau<br/> EN: energy efficency classification according to certificate of energy consumption after modernisation - not relevant for plots of land and financing reasons build, buy new building\n'
          },
          primaryEnergyConsumptionAfterModernisation: {
            type: 'integer',
            minimum: 0,
            maximum: 100000,
            description:
              'DE: Primärenergieverbrauch nach Modernisierung (in kWh/m2 pro Jahr) - nicht relevant bei Grundstücken, sowie bei den Finanzierungsgründen Bau, Kauf Neubau<br/> EN: primary energy consumption after modernisation (kWh/m2 per year) - not relevant for plots of land and financing reasons build, buy new building\n'
          },
          carbondioxideEmissionsAfterModernisation: {
            type: 'integer',
            minimum: 0,
            maximum: 100000,
            description:
              'DE: CO2 Emissionen (in kg/m2 pro Jahr) nach Modernisierung - nicht relevant bei Grundstücken, sowie bei den Finanzierungsgründen Bau, Kauf Neubau<br> EN: Carbondioxide emissions (in kg/m2 per year) after modernisation - not relevant for plots of land and financing reasons build, buy new building\n'
          },
          specialAttributesAcquisition: {
            type: 'array',
            nullable: false,
            description:
              'DE: Besonderheiten beim Erwerb. EN: Special attributes for acquisition.\n',
            items: {
              $ref: '#/components/schemas/SpecialAttributesAcquisition'
            }
          },
          amortisationStart: {
            type: 'string',
            format: 'date',
            description: 'DE: Tilgungsbeginn<br/> EN: start of amortisation\n'
          },
          inspected: {
            type: 'boolean',
            description:
              'DE: Wurde die Immobilie bereits besichtigt?<br/> EN: has the estate already been inspected?\n'
          },
          existingLoans: {
            type: 'array',
            nullable: false,
            description:
              'DE: Bestehende Darlehen für diese Immobilie. Bei Immobilien, die nur als Immobilienvermögen erfasst werden, können aktuell maximal 3 bestehende Darlehen pro Immobilie angegeben werden.<br/> EN: Existing loans for this property. For properties, that are entered only as assets, currently max. 3 existing loans per property can be entered.\n',
            items: {
              $ref: '#/components/schemas/ExistingLoan'
            }
          },
          equityDeposit: {
            type: 'number',
            minimum: 0,
            maximum: 100000000,
            description:
              'DE: Bereits geleistete Anzahlung, (ausgen. Grundstück)  <br/> EN: already paid deposit (Except for land property)\n'
          }
        },
        discriminator: {
          propertyName: 'ownership',
          mapping: {
            TO_ACQUIRE: '#/components/schemas/InitialIntentEstateParams',
            OWNED: '#/components/schemas/FollowupIntentEstateParams'
          }
        }
      },
      EstimationSource: {
        type: 'string',
        description:
          'DE: Quelle für die Bewertung/Einschätzung<br/> EN: the source of the estimation of marketValue, sustainableRent, etc.\n',
        enum: [
          'STANDARD_GROUND_VALUE_MAP',
          'EVALUATION_TEAM',
          'HVB_EXPERTISE',
          'IMMOSCOUT',
          'IMMOPOOL',
          'LBS_ON_SITE',
          'PLOETZ',
          'IVD_GUIDE',
          'BANK_LOCAL',
          'CITY',
          'OTHER',
          'SPRENGNETTER',
          'ING_OBJECT_VALUATION',
          'ON_GEO',
          'VDP_RESEARCH'
        ]
      },
      EuroAmount: {
        type: 'object',
        description: 'DE: Betrag in Euro<br/> EN: Amount of money in Euro.\n',
        required: ['value'],
        properties: {
          value: {
            type: 'number',
            minimum: -100000000,
            maximum: 100000000
          }
        }
      },
      ExistingLoan: {
        type: 'object',
        description:
          'DE: Bestehendes Darlehen<br/> EN: an existing loan (mortgage) that is to be replaced / extended with the current intent\n',
        properties: {
          existingLoanId: {
            type: 'string',
            format: 'uuid',
            description:
              'DE: technische ID des bestehenden Darlehens<br/> EN: technical ID of the existing loan\n'
          },
          sequenceNumber: {
            type: 'string',
            maxLength: 32,
            description: 'DE: laufende Nummer<br> EN: sequence\n'
          },
          contractNumber: {
            type: 'string',
            maxLength: 100,
            description: 'DE: Vertragsnummer<br/> EN: contract number\n'
          },
          rankRegister: {
            type: 'string',
            maxLength: 50,
            description: 'DE: Rang im Grundbuch<br/> EN: rank in land registry\n'
          },
          providerId: {
            type: 'string',
            maxLength: 32,
            description:
              'DE: technischer Schlüssel zu dem Darlehensgeber<br> EN: technical reference to the provider\n'
          },
          customProviderName: {
            type: 'string',
            maxLength: 200,
            description:
              'DE: Manuelle Angabe des Darlehensgebers, wenn der technische Schlüssel nicht bekannt ist<br/> EN: the user can enter the name of the credit provider here if the providerId is not known or does not match any known provider. Should be empty if providerId is set.\n'
          },
          debitorCode: {
            type: 'string',
            maxLength: 9,
            description: 'DE: Kontonummer des Darlehenskontos<br/> EN: mortgage account number\n'
          },
          debitorBic: {
            type: 'string',
            maxLength: 11,
            description: 'DE: BIC des Darlehensgebers<br/> EN: BIC of mortgage provider\n'
          },
          subsidyLoan: {
            type: 'boolean',
            description:
              'DE: Förderdarlehen Kennzeichen<br/> EN: is this a (public) subsidiary loan (e.g. KfW or other programmes)\n'
          },
          originalDebt: {
            type: 'number',
            minimum: 0,
            maximum: 100000000,
            description: 'DE: ursprünglicher Darlehensbetrag<br/> EN: original debt amount\n'
          },
          residualDebt: {
            type: 'number',
            minimum: 0,
            maximum: 100000000,
            description: 'DE: Restschuld<br/> EN: remaining debt\n'
          },
          fullPayoutDate: {
            type: 'string',
            format: 'date',
            description: 'DE: Datum der Vollauszahlung<br/> EN: date of full payout\n'
          },
          currentBurden: {
            type: 'number',
            minimum: 0,
            maximum: 100000000,
            description: 'DE: aktuelle Monatsrate<br/> EN: current monthly burden\n'
          },
          futureBurden: {
            type: 'number',
            minimum: 0,
            maximum: 100000000,
            description:
              'DE: vereinbarte zukünftige Monatsrate<br/> EN: agreed upon future monthly burden\n'
          },
          interestFixPercentage: {
            type: 'number',
            minimum: 0,
            maximum: 100,
            description: 'DE: Sollzins<br/> EN: fixed interest in percent\n'
          },
          interestFixPeriod: {
            type: 'number',
            description: 'DE: Sollzinsbindung in Jahren<br/> EN: fixed interest period in years\n'
          },
          interestFixEndDate: {
            type: 'string',
            format: 'date',
            description:
              'DE: Ende der Sollzinsbindung<br/> EN: end date of the fixed interest period\n'
          },
          loanTermEndDate: {
            type: 'string',
            format: 'date',
            description:
              'DE: Ende der Darlehenslaufzeit (bei gleichbleibendem Zins)<br/> EN: end date of the loan term\n'
          },
          forward: {
            type: 'boolean',
            description:
              'DE: Kennzeichen dieses Darlehen soll umgeschuldet werden. Wenn dieses Flag gesetzt ist, wird das Feld "forwardDate" verpflichtend.<br/> EN: flag that this loan shall be replaced. If this flag is set, the field "forwardDate" becomes mandatory.\n'
          },
          forwardDate: {
            type: 'string',
            format: 'date',
            description:
              'DE: Datum der Anschlussfinanzierung<br/> EN: date this loan is to be replaced\n'
          },
          forwardType: {
            deprecated: true,
            type: 'string',
            description:
              'DE: [DEPRECATED] Dieses Feld ist nicht mehr relevant und wird in Zukunft entfernt (Alte beschreibung war: Art der Ablösung. FOLLOW_UP_FINANCING = Anschlussfinanzierung, EQUITY = Ablösung aus EK)<br/> EN: [DEPRECATED] This field is not relevant anymore and will be removed in the future - (old description was: type of replacement)\n',
            enum: ['FOLLOW_UP_FINANCING', 'EQUITY']
          },
          canceled: {
            type: 'boolean',
            description:
              'DE: Kennzeichen dass das Darlehen schon gekündigt wurde<br/> EN: was the loan canceled?\n'
          },
          cancelationDate: {
            type: 'string',
            format: 'date',
            description:
              'DE: Datum der Kündigung. Darf nicht in der Zukunft liegen.<br/> EN: date this loan was canceled. Must not be a future date.\n'
          },
          cancelationPeriod: {
            type: 'string',
            description:
              'DE: vereinbarte Kündigungsfrist (MONTHLY_AT_END_OF_MONTH = monatlich zum ende des monats,\n    MONTHLY_TO_THE_DAY = monatlich tagesgenau, THREE_MONTHLY_AT_END_OF_QUARTER = 3 monatlich zum Quartalsende,\n    THREE_MONTHLY_TO_THE_DAY = 3 monatlich tagesgenau)<br>\nEN: cancelation period\n',
            enum: [
              'MONTHLY_AT_END_OF_MONTH',
              'MONTHLY_TO_THE_DAY',
              'THREE_MONTHLY_AT_END_OF_QUARTER',
              'THREE_MONTHLY_TO_THE_DAY'
            ]
          },
          debtors: {
            type: 'object',
            description:
              'DE: Die Darlehensnehmer des bestehenden Darlehens. Der Schlüssel der Map ist die debtorId.<br/> EN: The debtors of the existing loan. The key of the map is the debtorId.\n',
            maxProperties: 4,
            additionalProperties: {
              $ref: '#/components/schemas/Debtor'
            }
          }
        }
      },
      Expense: {
        type: 'object',
        description:
          'DE: Eine typisierte Ausgabe, monatlich oder jährlich. Nur relevant, wenn Typ und Betrag vorhanden sind. Je Typ ist nur eine Ausgabe zulässig. Wird mehr als eine Ausgabe des gleichen Typs gesendet, lehnt das Backend die Anfrage ab.<br/> EN: one form of expenses, might have a monthly (default) or yearly frequency. Only relevant if type and amount are present. Only one expense is allowed per type. If more than one expense of the same type is sent, the backend rejects the request.\n',
        required: ['type', 'amount'],
        properties: {
          type: {
            type: 'string',
            enum: [
              'LIFEINSURANCE_BURDEN',
              'HEALTHINSURANCE_BURDEN',
              'DISABILITYINSURANCE_BURDEN',
              'ACCIDENTINSURANCE_BURDEN',
              'CHILD_CARE_BURDEN',
              'ADDITIONAL_BURDEN',
              'CHILD_ALIMONY',
              'MARITAL_ALIMONY',
              'FAMILY_ALIMONY',
              'SEPARATION_ALIMONY',
              'RENT'
            ]
          },
          amount: {
            $ref: '#/components/schemas/PositivePeriodicalEuroAmount'
          },
          endDate: {
            description:
              'DE: ein Enddatum für die Ausgabe. Nur für die Unterhaltszahlungen (CHILD_ALIMONY, MARITAL_ALIMONY, FAMILY_ALIMONY, SEPARATION_ALIMONY)<br/> EN: an end date for the expenses. Only possible for the alimony payments (CHILD_ALIMONY, MARITAL_ALIMONY, FAMILY_ALIMONY, SEPARATION_ALIMONY)\n',
            allOf: [
              {
                $ref: '#/components/schemas/ISODate'
              }
            ]
          },
          isTemporary: {
            description:
              'DE: Wenn wahr, dann ist das eine temporäre Ausgabe, die irgendwann weg fällt.<br> EN: If true this expense is temporary and will cease sometime\n',
            type: 'boolean',
            default: false
          },
          isExemptable: {
            type: 'boolean',
            deprecated: true,
            description:
              'flag necessary to support legacy ui. Will be removed without further notice.'
          }
        }
      },
      ExternalEvaluation: {
        type: 'object',
        description:
          'DE: Bewertung des Objekts (Schätzung oder Bewertung durch Objektbewerter)<br/> EN: information around a proven estimated or evaluated value (like market value, lcal ref price, standard ground value etc.)\n',
        properties: {
          value: {
            type: 'number',
            minimum: 0,
            maximum: 100000000,
            description: 'DE: Ermittelter Wert<br/> EN: Evaluated value\n'
          },
          date: {
            type: 'string',
            format: 'date',
            description:
              'DE: Datum der Bewertung. Das Datum muss in der Vergangenheit liegen oder das aktuelle Datum sein.<br/> EN: Date of the evaluation. The date must be in the past or the current date.\n'
          },
          source: {
            $ref: '#/components/schemas/EstimationSource'
          },
          contact: {
            type: 'string',
            maxLength: 100,
            description:
              'DE: Name des Kontakts der für die Bewertung verantwortlich ist<br/> EN: Contact responsible for the evaluation/estimation\n'
          },
          phone: {
            type: 'string',
            maxLength: 100,
            description: 'DE: Telefonnumer des Kontakts<br/> EN: Phone number of the contact.\n'
          }
        }
      },
      FilterRequest: {
        type: 'object',
        description:
          'DE: Filter-Kriterien für Anträge, die zurückgegeben werden sollen.<br/> EN: filter criteria for intents, that shall be returned\n',
        required: ['createdAfter', 'createdBefore', 'companyIds', 'states'],
        properties: {
          createdAfter: {
            $ref: '#/components/schemas/ISODateTime',
            nullable: false,
            description:
              'DE: gibt nur Anträge zurück, deren Erstellungsdatum nach diesem Wert liegt.<br/> EN: only returns intents with a created date after this value\n'
          },
          createdBefore: {
            $ref: '#/components/schemas/ISODateTime',
            nullable: false,
            description:
              'DE: gibt nur Anträge zurück, deren Erstellungsdatum vor diesem Wert liegt.<br/> EN: only returns intents with a created date before this value\n'
          },
          companyIds: {
            type: 'array',
            nullable: false,
            minItems: 1,
            description:
              'DE: gibt nur Anträge zurück, deren companyId eine der übergebenen Werte ist.<br/> EN: only returns intents with one of the given companyIds\n',
            items: {
              type: 'string',
              maxLength: 16,
              nullable: false
            }
          },
          states: {
            type: 'array',
            nullable: false,
            minItems: 1,
            description:
              'DE: gibt nur Anträge zurück, deren Status einer der übergebenen Werte ist.<br/> EN: only returns intents with one of the given status-values\n',
            items: {
              $ref: '#/components/schemas/IntentStatus',
              nullable: false
            }
          }
        }
      },
      FilterResponse: {
        type: 'object',
        required: ['count', 'intents'],
        properties: {
          count: {
            type: 'integer',
            format: 'int32',
            nullable: false,
            description:
              'DE: Anzahl der zurückgegebenen Anträge.<br/> EN: number of returned intents\n'
          },
          intents: {
            type: 'array',
            nullable: false,
            items: {
              $ref: '#/components/schemas/FilteredIntent'
            }
          }
        }
      },
      FilteredIntent: {
        type: 'object',
        required: ['intentId', 'caseId'],
        properties: {
          caseId: {
            type: 'string',
            description: 'DE: caseId des Antrags.<br/> EN: caseId of the intent\n'
          },
          intentId: {
            type: 'string',
            description: 'DE: intentId des Antrags.<br/> EN: intentId of the intent\n'
          },
          process: {
            type: 'object',
            $ref: '#/components/schemas/Process'
          }
        }
      },
      FinancingReason: {
        type: 'string',
        description:
          'DE: Finanzierungsgründe, z.B. BUY_NEW, BUY_EXISTING, BUILD, REFINANCE, RENOVATE, RAISE_CAPITAL. <br/> EN: financing reason, possible values are BUY_NEW, BUY_EXISTING, BUILD, REFINANCE, RENOVATE, RAISE_CAPITAL.\n',
        example: 'BUY_EXISTING',
        enum: ['BUY_NEW', 'BUY_EXISTING', 'BUILD', 'REFINANCE', 'RENOVATE', 'RAISE_CAPITAL']
      },
      FollowupIntentEstateParams: {
        type: 'object',
        description:
          'DE: Zusatzinformationen für im Besitz befindliche Immobilien<br/> EN: additional-process info for estate in followup intents\n',
        properties: {
          neededLoan: {
            $ref: '#/components/schemas/NeededLoan'
          },
          price: {
            description:
              'DE: Ursprünglicher Kaufpreis der Immobilie. <br/> EN: Initial property purchase price.\n',
            allOf: [
              {
                $ref: '#/components/schemas/PositiveEuroAmount'
              }
            ]
          },
          year: {
            description:
              'DE: Jahr des Kaufes / der Fertigstellung. <br/> EN: Year of payment / Year of completion.\n',
            allOf: [
              {
                $ref: '#/components/schemas/Year'
              }
            ]
          },
          additionalLoan: {
            $ref: '#/components/schemas/AdditionalLoan'
          }
        },
        allOf: [
          {
            $ref: '#/components/schemas/EstateParams'
          }
        ]
      },
      ForcedSale: {
        type: 'object',
        description:
          'DE: Informationen zur Zwangsversteigerung<br/> EN: additional info for forced sale\n',
        properties: {
          previousOwner: {
            type: 'string',
            description: 'DE: vorhergehender Besitzer<br> EN: previous owner\n',
            enum: ['FAMILY_MEMBER', 'OTHER']
          },
          certifiedValue: {
            type: 'number',
            minimum: 0,
            maximum: 100000000,
            description:
              'DE: Verkehrswert der Immobilie<br/> EN: certified value (i.e. expected minimum bid)\n'
          },
          maximumBid: {
            type: 'number',
            minimum: 0,
            maximum: 100000000,
            description: 'DE: Maximalgebot<br/> EN: maximum bid\n'
          },
          date: {
            type: 'string',
            format: 'date',
            description: 'DE: Datum der Auktion<br/> EN: date of auction\n'
          }
        }
      },
      FutureModernisation: {
        type: 'object',
        description:
          'DE: Zukünftige Modernisierungen, die mit finanziert werden sollen. Nicht relevant, wenn es sich lediglich um ein Grundstück handelt oder der Finanzierungsgrund Eigenes Bauvorhaben, Kauf Neubau oder Kapitalbeschaffung ist.<br/> EN: Future modernisations (financing to be included). Not relevant for estates with type PROPERTY or project type BUILD, BUY_NEW or RAISE_CAPITAL.\n',
        properties: {
          energyEfficiencyStandard: {
            type: 'string',
            description:
              'DE: Energieeffizienz Standard nach KfW<br/> EN: energy efficiency standard according to KfW\n',
            enum: [
              'KFW_EFFIZIENZHAUS_40',
              'KFW_EFFIZIENZHAUS_55',
              'KFW_EFFIZIENZHAUS_70',
              'KFW_EFFIZIENZHAUS_85',
              'KFW_EFFIZIENZHAUS_100',
              'KFW_EFFIZIENZHAUS_DENKMAL',
              'OTHER'
            ]
          },
          energyEfficiencyDescription: {
            type: 'string',
            maxLength: 4000,
            description:
              'DE: Beschreibung falls OTHER als standard ausgewählt wird<br> EN: description if OTHER is the standard\n'
          },
          replacingExistingOilHeating: {
            type: 'boolean',
            description:
              'DE: Wird eine existierende Ölheizung ersetzt Ja - Nein\n    Relevant falls die Modernisierung vom Typ HEATING ist<br/>\nEN: flag indicating  an existing oil heating is replaced\n'
          },
          newHeatingType: {
            type: 'string',
            enum: [
              'GAS_CONDENSING_HEATING',
              'GAS_HYBRID_HEATING',
              'SOLAR_THERMAL_HEATING',
              'HEAT_PUMP',
              'BIOMASS_HEATING',
              'HYBRID_HEATING_WITH_RENEWABLE_ENERGY',
              'BUILDING_NETWORK_25_PERCENTAGE_RENEWABLE',
              'BUILDING_NETWORK_55_PERCENTAGE_RENEWABLE',
              'OTHER'
            ],
            description:
              'DE: Typ der neuen Heizungs\n    Relevant falls die Modernisierung vom Typ HEATING ist<br/>\nEN: type of new heating\n'
          },
          newHeatingDescription: {
            type: 'string',
            maxLength: 4000,
            description:
              'DE: Relevant falls bei newOilHeatingType OTHER ausgewählt wird<br/> EN: description of new heating if type OTHER is selected\n'
          },
          kfwRelevant: {
            type: 'boolean',
            description:
              'DE: KFW Förderungsrelevante Modernisierung<br/> EN: modernisation has an impact on KfW subsidies\n'
          },
          renewableEnergyClass: {
            type: 'boolean',
            description: 'DE: Erneuerbare Energien Klasse<br/> EN: renewable energy class\n'
          }
        },
        allOf: [
          {
            $ref: '#/components/schemas/AbstractModernisation'
          }
        ]
      },
      HistoricalCountryCode: {
        type: 'string',
        description:
          'DE: Ländercode nach ISO3166-1 AlphaCode2 and ISO3166-3 AlphaCode4 um auch historische Länder abzubilden ( Geburtsland )<br/> EN: types based on ISO3166-1 AlphaCode2 and ISO3166-3 AlphaCode4 to maintain all historical countries. (country of birth)\n',
        example: 'DE',
        enum: [
          'AD',
          'AE',
          'AF',
          'AG',
          'AI',
          'AIDJ',
          'AL',
          'AM',
          'ANHH',
          'AO',
          'AQ',
          'AR',
          'AS',
          'AT',
          'AU',
          'AW',
          'AX',
          'AZ',
          'BA',
          'BB',
          'BD',
          'BE',
          'BF',
          'BG',
          'BH',
          'BI',
          'BJ',
          'BL',
          'BM',
          'BN',
          'BO',
          'BQ',
          'BQAQ',
          'BR',
          'BS',
          'BT',
          'BUMM',
          'BV',
          'BW',
          'BY',
          'BYAA',
          'BZ',
          'CA',
          'CC',
          'CD',
          'CF',
          'CG',
          'CH',
          'CI',
          'CK',
          'CL',
          'CM',
          'CN',
          'CO',
          'CR',
          'CSHH',
          'CSXX',
          'CTKI',
          'CU',
          'CV',
          'CW',
          'CX',
          'CY',
          'CZ',
          'DDDE',
          'DE',
          'DJ',
          'DK',
          'DM',
          'DO',
          'DYBJ',
          'DZ',
          'EC',
          'EE',
          'EG',
          'EH',
          'ER',
          'ES',
          'ET',
          'FI',
          'FJ',
          'FK',
          'FM',
          'FO',
          'FQHH',
          'FR',
          'GA',
          'GB',
          'GD',
          'GE',
          'GEHH',
          'GF',
          'GG',
          'GH',
          'GI',
          'GL',
          'GM',
          'GN',
          'GP',
          'GQ',
          'GR',
          'GS',
          'GT',
          'GU',
          'GW',
          'GY',
          'HK',
          'HM',
          'HN',
          'HR',
          'HT',
          'HU',
          'HVBF',
          'ID',
          'IE',
          'IL',
          'IM',
          'IN',
          'IO',
          'IQ',
          'IR',
          'IS',
          'IT',
          'JE',
          'JM',
          'JO',
          'JP',
          'JTUM',
          'KE',
          'KG',
          'KH',
          'KI',
          'KM',
          'KN',
          'KP',
          'KR',
          'KW',
          'KY',
          'KZ',
          'LA',
          'LB',
          'LC',
          'LI',
          'LK',
          'LR',
          'LS',
          'LT',
          'LU',
          'LV',
          'LY',
          'MA',
          'MC',
          'MD',
          'ME',
          'MF',
          'MG',
          'MH',
          'MIUM',
          'MK',
          'ML',
          'MM',
          'MN',
          'MO',
          'MP',
          'MQ',
          'MR',
          'MS',
          'MT',
          'MU',
          'MV',
          'MW',
          'MX',
          'MY',
          'MZ',
          'NA',
          'NC',
          'NE',
          'NF',
          'NG',
          'NHVU',
          'NI',
          'NL',
          'NO',
          'NP',
          'NQAQ',
          'NR',
          'NU',
          'NZ',
          'OM',
          'PA',
          'PCHH',
          'PE',
          'PF',
          'PG',
          'PH',
          'PK',
          'PL',
          'PM',
          'PN',
          'PR',
          'PS',
          'PT',
          'PUUM',
          'PW',
          'PY',
          'PZPA',
          'QA',
          'RE',
          'RHZW',
          'RO',
          'RS',
          'RU',
          'RW',
          'SA',
          'SB',
          'SC',
          'SD',
          'SE',
          'SG',
          'SH',
          'SI',
          'SJ',
          'SK',
          'SKIN',
          'SL',
          'SM',
          'SN',
          'SO',
          'SR',
          'SS',
          'ST',
          'SUHH',
          'SV',
          'SX',
          'SY',
          'SZ',
          'TC',
          'TD',
          'TF',
          'TG',
          'TH',
          'TJ',
          'TK',
          'TL',
          'TM',
          'TN',
          'TO',
          'TPTL',
          'TR',
          'TT',
          'TV',
          'TW',
          'TZ',
          'UA',
          'UG',
          'UM',
          'US',
          'UY',
          'UZ',
          'VA',
          'VC',
          'VDVN',
          'VE',
          'VG',
          'VI',
          'VN',
          'VU',
          'WF',
          'WKUM',
          'WS',
          'XK',
          'XX',
          'YDYE',
          'YE',
          'YT',
          'YUCS',
          'ZA',
          'ZM',
          'ZRCD',
          'ZW'
        ]
      },
      House: {
        type: 'object',
        description: 'DE: Haus<br/> EN: house\n',
        properties: {
          buildingVolume: {
            type: 'number',
            minimum: 0,
            maximum: 100000,
            description: 'DE: Umbauter Raum<br/> EN: building volume\n'
          },
          grossArea: {
            type: 'number',
            description:
              'DE: Bruttogrundfläche, für Objektbewertung<br/> EN: gross area of the house\n'
          },
          areaBuiltOn: {
            type: 'number',
            description:
              'DE: überbaute Grundfläche, für Objektbewertung<br/> EN: area covered by the building\n'
          },
          specialFeaturesOfConstruction: {
            type: 'string',
            description:
              'DE: Besonderheiten der Bauart. NO_SPECIFICS: Keine Besonderheiten, PREFABRICATED_HOUSE: Fertighaus, GROW_HOUSE: Ausbauhaus, SELF_BUILD_HOUSE: Bausatzhaus.<br/> EN: special features of construction.\n',
            enum: ['NO_SPECIFICS', 'PREFABRICATED_HOUSE', 'GROW_HOUSE', 'SELF_BUILD_HOUSE']
          },
          prefabricationCertified: {
            title: 'prefabricationCertified',
            type: 'boolean',
            description:
              'DE: Flag das anzeigt ob der Fertighaushersteller zertifiziert ist. Nur relevant, wenn specialFeaturesOfConstruction = PREFABRICATED_HOUSE oder GROW_HOUSE.<br/> EN: Flag indicating whether the manufacturer of the prefabricated house is certified. Only relevant if specialFeaturesOfConstruction = PREFABRICATED_HOUSE or GROW_HOUSE.\n'
          },
          roof: {
            $ref: '#/components/schemas/Roof'
          },
          condition: {
            type: 'string',
            description:
              'DE: Zustand der Immobilie ( neuwertig, gepflegt, ...).<br/> DE: condition of estate\n',
            enum: [
              'AS_NEW',
              'WELL_KEPT',
              'SLIGHT_RENOVATION_NEEDED',
              'MODERNISATION_NEEDED',
              'PARTIAL_RENOVATION_NEEDED',
              'TOTAL_RENOVATION_NEEDED'
            ]
          },
          attic: {
            type: 'string',
            description:
              'DE: Typisierung des Dachgeschosses (ausgebaut, ausbaufähig, ...).<br/> EN: typisation of the attic.\n',
            enum: ['EXPANDED', 'EXPANDABLE', 'NOT_EXPANDABLE']
          },
          basement: {
            type: 'string',
            description:
              'DE: Details zum Keller, z.B DEVELOPED=voll_unterkellert, PARTIALY_DEVELOPED=teil_unterkellert, NONE=nicht_unterkellert. <br/> EN: Enum contains basement details, possible values are DEVELOPED, PARTIALY_DEVELOPED, NONE.\n',
            example: 'DEVELOPED',
            enum: ['DEVELOPED', 'PARTIALLY_DEVELOPED', 'NONE']
          },
          basementArea: {
            type: 'number',
            minimum: 0,
            maximum: 100000,
            description: 'DE: Kellerfläche<br/> EN: Basement area\n'
          },
          basementResidentialUse: {
            type: 'string',
            description:
              'DE: Angabe, ob der Keller für eine Wohnnutzung ausgebaut ist, mögliche Werte: DEVELOPED=voll_ausgebaut, PARTIALY_DEVELOPED=teils_ausgebaut und NONE=nicht_ausgebaut. <br/> EN: Specification whether the basement is developed for residential usage, possible values are DEVELOPED, PARTIALY_DEVELOPED, and NONE.\n',
            example: 'DEVELOPED',
            enum: ['DEVELOPED', 'PARTIALLY_DEVELOPED', 'NONE']
          }
        },
        allOf: [
          {
            $ref: '#/components/schemas/AbstractBuilding'
          }
        ]
      },
      Household: {
        type: 'object',
        description:
          'DE: Ein Haushalt. Die householdId wird von Personen des Intents (siehe intent.personParams) in person.householdId referenziert, wenn diese im jeweiligen Haushalt wohnen. \n    Jede Intent-Person wohnt in genau einem Haushalt.\n    Für einen Haushalt, in dem eine Person des Intents gemeinsam mit ihrem Kind und einer weiteren Person, die nicht Intent-Person ist, wohnt, ergibt sich folgende Konstellation:\n    additionalPersons: 1, numberOfPersonsIncludingChildren: 3, numberOfPersons: 2.\n    Für ein kinderloses Ehepaar, welches gemeinsam in einem Zwei-Personen-Haushalt wohnt und beide Personen als Intent-Personen hinterlegt hat, ergibt sich:\n    additionalPersons: 0, numberOfPersonsIncludingChildren: 2, numberOfPersons: 2.\nEN: a household joining persons\n',
        required: ['householdId'],
        properties: {
          householdId: {
            type: 'string',
            format: 'uuid'
          },
          additionalPersons: {
            description:
              'DE: Anzahl weiterer erwachsener Personen, die in diesem Haushalt leben und nicht in den Personen des Intents enthalten sind. EN: Number of additional persons who living are in this household and are neither a person of this intent nor a child.\n',
            type: 'integer',
            format: 'int64',
            minimum: 0,
            maximum: 100,
            default: 0
          },
          numberOfPersonsIncludingChildren: {
            description:
              'DE: Anzahl der Personen, die in diesem Haushalt leben. Kinder werden hierbei mitgezählt. EN: Number of persons living in this household -- including children.\n',
            readOnly: true,
            type: 'integer',
            format: 'int64',
            default: 0
          },
          numberOfPersons: {
            description:
              'DE: Anzahl der Personen, die in diesem Haushalt leben. Kinder werden hierbei nicht mitgezählt. Veraltet, nicht benutzen! Wird in einem kommenden Release entfernt. EN: Number of persons living in this household -- excluding children. Deprecated, do not use! Will be removed in a future release.\n',
            deprecated: true,
            readOnly: true,
            type: 'integer',
            format: 'int64',
            default: 0
          }
        }
      },
      ISODate: {
        type: 'string',
        format: 'date',
        description:
          'DE: Datum, Syntax nach <a href=https://tools.ietf.org/html/rfc3339#section-5.6>RFC 3339</a><br/> EN: Date according to <a href=https://tools.ietf.org/html/rfc3339#section-5.6>RFC 3339</a>\n',
        example: '2019-12-29T00:00:00Z'
      },
      ISODateTime: {
        description:
          'DE: Datum, Syntax nach <a href=https://tools.ietf.org/html/rfc3339#section-5.6>RFC 3339</a><br/> EN: Date according to <a href=https://tools.ietf.org/html/rfc3339#section-5.6>RFC 3339</a>\n',
        type: 'string',
        format: 'date-time',
        example: '2021-01-30T08:30:00Z'
      },
      Iban: {
        type: 'object',
        description: 'DE: IBAN <br/> EN: The International Bank Account Number\n',
        required: ['value'],
        properties: {
          value: {
            type: 'string',
            maxLength: 42,
            example: 'DE46 5002 1000 0010 1303 83',
            pattern: String.raw`^[A-Z]{2}\s?[0-9]{2}(?:\s?[A-Za-z0-9]{1,4}){2,8}$`
          }
        }
      },
      Income: {
        type: 'object',
        description:
          'DE: Typisiertes monatliches Einkommen.<br/> EN: Basic typed monthly income.\n',
        required: ['type'],
        properties: {
          type: {
            description:
              '<b>ATTENTION: do not use NET_SALARY and SELF_EMPLOYED, they are to be removed without notice</b><br/> DE: Art des Einkommens (\n    PENSIONS = Renten und Pensionen, \n    CHILD_ALLOWANCE = Kindergeld,\n    PARENTAL_MONEY = Elterngeld,\n    RENTAL = Einkommen aus Vermietung, \n    CAPITAL_YIELDS = Regelmässige Kapitalerträge (Zinsen, Dividenden),\n    SHAREHOLDINGS = Regelmässige Einkünfte aus Beteiligungen (GmbH-Anteil),\n    OTHER = Sonstiges Einkünfte,\n    CHILD_ALIMONY = Kindesunterhalt, \n    MARITAL_ALIMONY = Ehegattenunterhalt,\n    FAMILY_ALIMONY = Familienunterhalt,\n    SEPARATION_ALIMONY = Trennungsunterhalt,\n    AUXILIARY = Nebeneinkünfte\n)<br/> EN: type of income (\n    PENSIONS = Pensions, CHILD_ALLOWANCE = child allowance,\n    PARENTAL_MONEY = parental money,\n    RENTAL = Income from renting out owned properties, \n    CAPITAL_YIELDS = recurrent income from investments (interests, dividends)\n    SHAREHOLDINGS = recurrent income from participations in companies (shares in GmbH),\n    OTHER = income from other sources,\n    CHILD_ALIMONY = child alimony,\n    MARITAL_ALIMONY = marital alimony,\n    FAMILY_ALIMONY = family alimony, \n    SEPARATION_ALIMONY = separation alimony,\n    AUXILIARY = auxiliary income\n).\n',
            type: 'string',
            nullable: false,
            enum: [
              'PENSIONS',
              'CHILD_ALLOWANCE',
              'RENTAL',
              'SHAREHOLDINGS',
              'CAPITAL_YIELDS',
              'OTHER',
              'PARENTAL_MONEY',
              'CHILD_ALIMONY',
              'MARITAL_ALIMONY',
              'FAMILY_ALIMONY',
              'SEPARATION_ALIMONY',
              'AUXILIARY',
              'NET_SALARY',
              'SELF_EMPLOYED'
            ]
          },
          amount: {
            $ref: '#/components/schemas/PositiveEuroAmount'
          },
          numberOfPaymentsPerYear: {
            type: 'number',
            description:
              'This field is to be removed in the near future without warning. All values are monthly.',
            deprecated: true
          }
        },
        discriminator: {
          propertyName: 'type',
          mapping: {
            PENSIONS: '#/components/schemas/PensionIncome',
            CHILD_ALLOWANCE: '#/components/schemas/Income',
            RENTAL: '#/components/schemas/Income',
            SHAREHOLDINGS: '#/components/schemas/Income',
            CAPITAL_YIELDS: '#/components/schemas/Income',
            OTHER: '#/components/schemas/Income',
            PARENTAL_MONEY: '#/components/schemas/ParentalMoneyIncome',
            CHILD_ALIMONY: '#/components/schemas/Income',
            MARITAL_ALIMONY: '#/components/schemas/Income',
            FAMILY_ALIMONY: '#/components/schemas/Income',
            SEPARATION_ALIMONY: '#/components/schemas/Income',
            NET_SALARY: '#/components/schemas/Income',
            SELF_EMPLOYED: '#/components/schemas/Income',
            AUXILIARY: '#/components/schemas/AuxiliaryIncome'
          }
        }
      },
      Individual: {
        type: 'object',
        description:
          'DE: eine Person inkl. Einkommens- und Finanzstatus-Daten <br/> EN: a person including its income/expenses and financial situation\n',
        required: ['personId'],
        properties: {
          personId: {
            type: 'string',
            format: 'uuid',
            description:
              'DE: Eindeutiger Schlüssel (ID), der die Person identifiziert. <br/> EN: unique id referencing this person\n'
          },
          createdDate: {
            description:
              'DE: Datum der Erstellung des Datensatzes<br/> EN: date this person data was created\n',
            allOf: [
              {
                $ref: '#/components/schemas/ISODateTime'
              }
            ]
          },
          modifiedDate: {
            description:
              'DE: Datum der letzten Änderung des Datensatzes<br/> EN: date this person data was last changed\n',
            allOf: [
              {
                $ref: '#/components/schemas/ISODateTime'
              }
            ]
          },
          gender: {
            type: 'string',
            description: 'DE: Geschlecht der Person <br/> EN: gender of the person\n',
            enum: ['M', 'F', 'D']
          },
          title: {
            type: 'string',
            description:
              'DE: Akademischer Titel der Person <br/> EN: academic title of the person\n',
            enum: ['DR', 'PH_D', 'PD_DR', 'PROF', 'PROF_DR']
          },
          firstName: {
            type: 'string',
            maxLength: 100,
            description: 'DE: Vorname der Person. <br/> EN: First name of the person.\n'
          },
          lastName: {
            type: 'string',
            maxLength: 100,
            description: 'DE: Nachname der Person. <br/> EN: Last name of the person.\n'
          },
          birthName: {
            type: 'string',
            maxLength: 100,
            description: 'DE: Geburtsname der Person. <br/> EN: Name at birth of the person.\n'
          },
          address: {
            $ref: '#/components/schemas/CurrentAddress'
          },
          formerAddresses: {
            type: 'array',
            nullable: false,
            description:
              'DE: Liste früherer Addressen mit Angaben zum Zeitraum, an denen die Person in den letzten Jahren gewohnt hat. Die aktuelle Wohnaddresse ist nicht Bestandteil der Liste<br/> EN: List of addresses the person has lived on in the last years. The current Address should not be part of this list.\n',
            items: {
              allOf: [
                {
                  $ref: '#/components/schemas/LivingAddress'
                }
              ]
            }
          },
          birthDate: {
            description:
              'DE: Geburtsdatum der Person. Das Datum muss in der Vergangenheit liegen oder das aktuelle Datum sein. <br/> EN: Date of birth of the person. The date must be in the past or the current date.\n',
            allOf: [
              {
                $ref: '#/components/schemas/ISODate'
              }
            ]
          },
          birthPlace: {
            type: 'string',
            maxLength: 100,
            example: 'London',
            description: 'DE: Geburtsort der Person. <br/> EN: The birth place of the person.\n'
          },
          birthCountry: {
            description: 'DE: Geburtsland der Person. <br/> EN: Country of birth of the person.\n',
            allOf: [
              {
                $ref: '#/components/schemas/HistoricalCountryCode'
              }
            ]
          },
          firstNationality: {
            description:
              'DE: Staatsangehörigkeit der Person. <br/> EN: Nationality (country) of the Person.\n',
            allOf: [
              {
                $ref: '#/components/schemas/CountryCode'
              }
            ]
          },
          secondNationality: {
            description:
              'DE: zweite Staatsangehörigkeit der Person (sofern vorhanden) <br/> EN: Country of an optional second nationality.\n',
            allOf: [
              {
                $ref: '#/components/schemas/CountryCode'
              }
            ]
          },
          thirdNationality: {
            description:
              'DE: dritte Staatsangehörigkeit der Person (sofern vorhanden) <br/> EN: Country of an optional third nationality.\n',
            allOf: [
              {
                $ref: '#/components/schemas/CountryCode'
              }
            ]
          },
          residencePermitTemporary: {
            type: 'boolean',
            description:
              'DE: hat die Person nur eine befristete Aufenthaltserlaubnis? (nur relevant, wenn keine EU-Staatsangehörigkeit vorhanden)<br/> EN: does the person only have a temporary residence permit (only relevant if no EU-nationality is present)\n'
          },
          residencePermitExpiryDate: {
            description:
              'DE: Ablaufdatum einer befristeten Aufenthaltserlaubnis (nur relevant, wenn Aufenthaltserlaubnis befristet)<br/> EN: expiry date of the residence permit (only relevant if residence permit is temporary)\n',
            allOf: [
              {
                $ref: '#/components/schemas/ISODate'
              }
            ]
          },
          blueCard: {
            type: 'boolean',
            description:
              'DE: hat die Person eine "Blue-Card" (nur relevant, wenn Aufenthaltserlaubnis befristet) <br/> EN: does the person have a "Blue-Card" (only relevant if residence permit is temporary)\n'
          },
          taxId: {
            type: 'string',
            minLength: 11,
            maxLength: 11,
            pattern: '^[0-9]*$',
            description:
              'DE: Deutsche Steueridentifikationsnummer der Person. <br/> EN: German tax identification number.\n'
          },
          contacts: {
            description:
              'DE: Liste der Kontaktmöglichkeiten der Person <br/> EN: List of possibilities to contact the person\n',
            type: 'array',
            nullable: false,
            items: {
              $ref: '#/components/schemas/Contact'
            }
          },
          maritalStatus: {
            type: 'string',
            description:
              'DE: Familienstand der Person (\n    SINGLE = ledig, \n    MARRIED = verheiratet,\n    REGISTERED_PARTNER = eingetragene lebenspartnerschaft, \n    WIDOWED = verwitwet, \n    DIVORCED = geschieden, \n    SEPARATED = getrennt,\n    COHABITING = zusammen lebend)<br/>\nEN: Marital status\n',
            example: 'SINGLE',
            enum: [
              'SINGLE',
              'MARRIED',
              'REGISTERED_PARTNER',
              'WIDOWED',
              'DIVORCED',
              'SEPARATED',
              'COHABITING'
            ]
          },
          maritalPropertyStatus: {
            type: 'string',
            description:
              'DE: Beschreibung des ehelichen Güterstandes (\n    COMMUNITY_OF_ACQUESTS_AND_GAINS = Zugewinngemeinschaft, \n    SEPARATION_OF_PROPERTY = Gütertrennung, \n    ABSOLUTE_COMMUNITY_PROPERTY = Gütergemeinschaft\n). Nur relevant, wenn Familienstand verheiratet, eingetragene lebenspartnerschaft oder getrennt<br/> EN: Matrimonial property status. Only relevant if maritalStatus MARRIED, REGISTERED_PARTNER or SEPARATED\n',
            enum: [
              'COMMUNITY_OF_ACQUESTS_AND_GAINS',
              'SEPARATE_PROPERTY',
              'ABSOLUTE_COMMUNITY_PROPERTY'
            ]
          },
          housingSituation: {
            type: 'string',
            description:
              'DE: Art der derzeitigen Wohnsituation (\n    RENT=zur Miete, \n    MORTGAGE_REPAYMENT=im Eigentum mit Darlehensrate, \n    PAID_PROPERTY=im abbezahlten Eigentum, \n    RENT_FREE=mietfrei bei den Eltern/Partner<br/>\nEN:  current housing/accomodation types\n',
            example: 'RENT',
            enum: ['RENT', 'MORTGAGE_REPAYMENT', 'PAID_PROPERTY', 'RENT_FREE']
          },
          numberOfCars: {
            description: 'DE: Anzahl der Fahrzeuge im Besitz<br/> EN: Number of cars owned\n',
            type: 'integer',
            minimum: 0,
            maximum: 100
          },
          children: {
            type: 'array',
            nullable: false,
            description: 'DE: Kinder der Person <br/> EN: children of the person\n',
            items: {
              $ref: '#/components/schemas/Child'
            }
          },
          householdId: {
            type: 'string',
            format: 'uuid',
            description:
              'DE: ID des Haushalts, in dem die Person lebt <br/> EN: id of the household this person lives in.\n'
          },
          employments: {
            description:
              'DE: Map der (aktuellen) Beschäftigungsverhältnisse der Person. Darf aktuell maximal zwei Elemente enthalten, jeweils maximal ein nicht-selbstständiges und ein selbstständiges. Werden mehr als zwei Beschäftigungsverhältnisse geschickt oder mehr als ein nicht-selbstständiges/selbstständiges, lehnt das Backend die Anfrage ab. Key der map ist die employmentId.<br/> EN: Map of (current) employments of this person. The list may currently contain a maximum of two elements, with at most 1 Employment and 1 SelfEmployment. If more than two employments, more than one SelfEmployment or more than one Employment are sent, the backend rejects the request. Key of the map is the employmentId.\n',
            type: 'object',
            additionalProperties: {
              $ref: '#/components/schemas/Occupation'
            },
            maxProperties: 2
          },
          mainOccupationId: {
            description:
              "DE: ID des Hauptbeschäftigungsverhältnisses der Person. Muss eine employmentId aus der Collection employments (s.o.) sein. Falls das Feld nicht oder ungültig befüllt ist, wird es vom Backend auf die employmentId des Beschäftigungsverhältnisses mit dem höchsten Einkommen gesetzt.<br/> EN: ID of the person's main employment. Must be an employmentId from the collection employments (see above). If the field is not or invalidly filled, the backend will set it to the employmentId of the employment with the highest income.\n",
            type: 'string',
            format: 'uuid'
          },
          nonEmploymentIncome: {
            description:
              'DE: Einkommen, das nicht aus einem Beschäftigungsverhältnis kommt.<br/> EN: Income not resulting from an employment.\n',
            allOf: [
              {
                $ref: '#/components/schemas/NonEmploymentIncome'
              }
            ]
          },
          totalGrossIncomeLastYear: {
            description:
              'DE: Bruttoeinkommen des Vorjahres (gesamt)<br/> EN: Total gross income of the previous year\n',
            allOf: [
              {
                $ref: '#/components/schemas/PositiveEuroAmount'
              }
            ]
          },
          taxableIncomePastYears: {
            description:
              'DE: Map des zu versteuernden Einkommens vergangener Jahre. Der Schlüssel der Map ist das Jahr. <br/> EN: Map of taxable incomes of past years. The key of the map is the year.\n',
            type: 'object',
            additionalProperties: {
              $ref: '#/components/schemas/TaxableIncome'
            }
          },
          expenses: {
            description:
              'DE: Map der Ausgaben. Der Schlüssel der Map ist der Typ der Ausgabe. Siehe Expense.type<br/> EN: Map of expenses. The key of the map is the type of the costs. See enum EstateCosts.type\n',
            type: 'object',
            additionalProperties: {
              $ref: '#/components/schemas/Expense'
            }
          },
          creditLiabilities: {
            description:
              'DE: Map der Verbindlichkeiten aus Darlehen und Krediten. Der Schlüssel der Map ist die ID.<br/> EN: Map of liabilities (credits and leasing contracts). The key of the map is the id.\n',
            type: 'object',
            nullable: false,
            additionalProperties: {
              $ref: '#/components/schemas/Liability'
            }
          },
          liabilities: {
            description:
              'DE: Liste von Verbindlichkeiten, die nicht aus Kredit/Leasing oder Darlehen stammen.<br> EN: List of liabilities (non-credit)\n',
            type: 'array',
            nullable: false,
            items: {
              $ref: '#/components/schemas/SimpleLiability'
            }
          },
          assets: {
            description:
              'DE: Map der Vermögenswerte. Der Schlüssel der Map ist die ID.<br/> EN: Map of assets. The key of the map is the id.\n',
            type: 'object',
            nullable: false,
            additionalProperties: {
              $ref: '#/components/schemas/Asset'
            }
          },
          bankDetails: {
            $ref: '#/components/schemas/BankDetails'
          },
          schufa: {
            $ref: '#/components/schemas/Schufa'
          },
          unionMember: {
            type: 'boolean',
            description:
              'DE: Kennzeichen das Person Mitglied in einer Gewerkschaft oder einem Verband ist.<br/> EN: Flag indicating this Person is member of an Union.\n'
          },
          unionInfo: {
            $ref: '#/components/schemas/UnionInfo'
          },
          externalCustomerId: {
            type: 'string',
            maxLength: 100,
            description:
              'DE: Externe Kundennummer des Kunden in der Kundenverwaltung des betreuenden Partners<br/> EN: external customer id assigned to this customer in the customer management system of the partner advising this customer.\n'
          },
          employeeId: {
            type: 'string',
            maxLength: 100,
            description:
              "DE: Mitarbeiternummer des Kunden, die im Rahmen einer Mitarbeiterfinazierung erfasst wird <br/> EN: The customer's employee number, which is used as part of employee financing\n"
          }
        }
      },
      InitialIntentEstateParams: {
        type: 'object',
        required: ['estate'],
        description:
          'DE: Zusatzinformationen für zu erwerbende Immobilien<br/> EN: additional-process info for estate in initial intents\n',
        properties: {
          buildingCompletionDate: {
            type: 'string',
            format: 'date',
            description: 'DE: Fertigstellungsdatum<br/> EN: bulding completion date\n'
          },
          buildingStartDate: {
            type: 'string',
            format: 'date',
            description: 'DE: Baubeginn<br/> EN: start of construction\n'
          },
          priceLandPaid: {
            description:
              'DE: Bereits bezahlter Grundstückspreis in Euro - relevant bei Bau<br/> EN: Already paid purchase price for the building site in Euro - relevant for construction of buildings\n',
            allOf: [
              {
                $ref: '#/components/schemas/PositiveEuroAmount'
              }
            ]
          },
          loanInRegister: {
            type: 'boolean',
            description:
              'DE: Sind bereits Darlehen im Grundbuch eingetragen? - relevant bei Bau mit bereits bezahltem Grundstückspreis<br/> EN: Are there already any loans in the land register? - relevant for construction with already paid purchase price for the building site\n'
          },
          purchasePriceDue: {
            type: 'string',
            format: 'date',
            description: 'DE: Fälligkeit des Kaufpreises<br/> EN: due date of purchase price\n'
          },
          explicitNotaryDate: {
            type: 'string',
            format: 'date',
            description: 'DE: Datum des Notartermins<br/> EN: date of notary appointment\n'
          },
          isForcedSale: {
            type: 'boolean',
            description:
              'DE: Kennzeichen für Zwangsversteigerung<br/> EN: flag for forced sale (auction)\n'
          },
          forcedSale: {
            $ref: '#/components/schemas/ForcedSale'
          },
          constructionCostInvoice: {
            type: 'string',
            description:
              'DE: Die Instanz, mit welcher die Abrechnung der Baukosten erfolgt. PROPERTY_DEVELOPER = Bautraeger, GENERAL_CONTRACTOR = Generalunternehmer, ARCHITECT = Architekt, INDIVIDUAL_TRADES = Einzelgewerkvergabe <br/> EN: The instance to which the construction costs are charged\n',
            enum: ['PROPERTY_DEVELOPER', 'GENERAL_CONTRACTOR', 'ARCHITECT', 'INDIVIDUAL_TRADES']
          }
        },
        allOf: [
          {
            $ref: '#/components/schemas/EstateParams'
          }
        ]
      },
      Intent: {
        type: 'object',
        description:
          'DE: Ein Baufinanzierungs-Vorhaben eines Kunden/einer Kundengruppe. Ein Baufinanzierungsvorhaben besteht aus einer Sammlung von Immobilien (estates)\n    die an der Finanzierung beteiligt sein können (als Finanzierungsobjekt oder Zusatzsicherheit oder Vermögenswert)\n    und Personen die als Darlehensnehmer oder Familienangehörige der Darlehensnehmer beteiligt sind<br/>\nEN: An Intent describes the real-estate mortgage project. It consists mainly of a collection of estates with different roles (financing object, additional security, equity)\n    and a collection of persons which might be involved as applicants or their family members\n',
        required: ['process'],
        properties: {
          caseId: {
            type: 'integer',
            format: 'int64',
            readOnly: true,
            description:
              'DE: Menschen lesbare ID dieses Vorhabens. Entspricht der bekannten Antragsnummer.<br/> EN: human readable id of the intent. Same as appId in Monolith\n'
          },
          id: {
            type: 'string',
            maxLength: 24,
            readOnly: true,
            deprecated: true,
            description:
              'DE: technische, alphanumerische ID dieses Vorhabens. Wird serverseitig generiert.<br/>\n    Veraltet, stattdessen "intentId" verwenden<br/>\nEN: technical, aplhanumerical id of this intent. is generated serverside.<br/>\n    Deprecated, use "intentId" instead\n'
          },
          intentId: {
            type: 'string',
            maxLength: 24,
            readOnly: true,
            description:
              "DE: technische ID dieses Vorhabens. Wird serverseitig generiert.<br/>\n    Enthält bei Intents, deren Entstehung vor dem EOL des Case-Service liegt, deren numerische intentId, ansonsten die neue, alphanumerische intentId.<br/>\nEN: technical id of this intent. is generated serverside.<br/>\n    For Intents, which are created before Case-Service's EOL, it contains their numerical intentId, otherwise the new, alphanumerical intentId.\n"
          },
          externalId: {
            type: 'string',
            maxLength: 100,
            description:
              'DE: externe ID des Vorhabens in einem externen Partner System<br/> EN: external ID of the intent in an external system of a partner\n'
          },
          personParams: {
            type: 'object',
            description:
              'DE: Liste der beteiligten Personen als Map/Dictionary nach PersonId<br/>\n    Um neue Werte hinzuzufügen muss eine PersonId im Format UUID generiert werden und im Pfad zur Addressierung \n    der neu erzeugten Person verwendet werden. Diese PersonId muss sich auch in der person im Attribut PersonId wieder finden.<br/>\nEN: List of persons involved in this intent as Map/Dictionary by PersonId<br>\n    To create a new person a personId must be generated as UUID and used in the path to denote the newly created person \n    which in turn must contain this new personId as PersonId property in the person object.\n',
            additionalProperties: {
              $ref: '#/components/schemas/PersonParams'
            }
          },
          personRelations: {
            type: 'array',
            nullable: false,
            description:
              'DE: Liste der Beziehungen zwischen den beteiligten Personen.<br/> EN: List of relations between the involved parties\n',
            items: {
              $ref: '#/components/schemas/Relationship'
            }
          },
          households: {
            type: 'array',
            nullable: false,
            description:
              'DE: Liste der Haushalte in denen die Personen leben.<br/> EN: List of households the persons live in\n',
            items: {
              $ref: '#/components/schemas/Household'
            }
          },
          process: {
            $ref: '#/components/schemas/Process'
          },
          estates: {
            type: 'object',
            description:
              'DE: Liste der Immobilien die an dem Vorhaben beteiligt sind (als Finanzierungsobjekt oder Zusatzsicherheit oder Vermögenswert)\n    als Map/Dictionary nach EstateId<br/>\n    Um neue Werte hinzuzufügen muss eine EstateId generiert werden und im Pfad zur Adressierung \n    des neu erzeugten Estate verwendet werden. Diese EstateId muss sich auch im estate im Attribut EstateId wieder finden.\n    Wird hier ein nicht numerisches Format (z.B als Platzhalter) verwendet, dann wird diese ID durch eine numerische ID ersetzt.<br/>\nEN: List of real estates involved in this intent, as financing object, additional security or equity as Map/Dictionary by EstateId<br/>\n    To create a new estate an estate id has to be generated and used in the path to address this estate. The same\n    estate id has to be set to the estate.estateId property. If a non-numeric id is used as placeholder then it will be replaced by a newly generated id\n',
            additionalProperties: {
              $ref: '#/components/schemas/EstateParams'
            }
          },
          variants: {
            type: 'array',
            readOnly: true,
            description:
              'DE: Liste der Varianten von Personen und Immobilien Kombinationen mit denen die Finanzierung berechnet wurde. Veränderung über Zinssuche.<br/> EN: List of variants of person and estate combinations for which a mortgage has been calculated\n',
            items: {
              $ref: '#/components/schemas/Variant'
            }
          },
          createdAt: {
            readOnly: true,
            description:
              'DE: Zeitpunkt der Erstellung des Datensatzes<br/> EN: Timestamp when the aggregate was created\n',
            allOf: [
              {
                $ref: '#/components/schemas/ISODateTime'
              }
            ]
          },
          modifiedAt: {
            readOnly: true,
            description:
              'DE: Zeitpunkt der letzten Änderung des Datensatzes<br/> EN: Timestamp when the aggregate was last modified\n',
            allOf: [
              {
                $ref: '#/components/schemas/ISODateTime'
              }
            ]
          },
          version: {
            readOnly: true,
            type: 'integer',
            format: 'int64',
            description:
              'DE: Version des Datensatzes, beginnend bei 0 und inkrementiert bei jeder Änderung des Datensatzes<br/> EN: Incrementing long starting with 0 which is updated with each update of the aggregate\n'
          }
        }
      },
      IntentCreationParameters: {
        type: 'object',
        description:
          'DE: Zusätzliche Angaben für den Erstellungsprozess eines Intents.<br/> EN: additional information for the creation-process of an intent.\n',
        properties: {
          suppressDataProtectionMail: {
            type: 'boolean',
            default: false,
            description:
              'DE: kann gesetzt werden, um den Versand der Datenschutz-Informations-Mail zu unterdrücken, obwohl er für die Company konfiguriert ist, z.B. beim Import bestehender Datensätze, wenn den Kunden die Datenschutz-informationen bereits übermittelt wurden. Ist für die Company das Versenden von Datenschutzinformationen nicht konfiguriert, hat dieses Feld keine Auswirkungen.<br/> EN: can be set to suppress the sending of an e-mail with the data protection information, e.g. on import of existing data, if customers already received the data-protection-information.\n'
          },
          initialAssignee: {
            type: 'string',
            format: 'uuid',
            description:
              'DE: Weist das Vorhaben einem Berater zu. Wird dies nicht gesetzt, wird das Vorhaben dem aufrufenden Nutzer zugewiesen, sofern dies kein technischer Nutzer ist.<br/> EN: Assigns the intent to an advisor. If this property is not set, the intent is assigned to the calling user, unless this is a technical user.\n'
          }
        }
      },
      IntentCreationRequest: {
        type: 'object',
        description:
          'DE: Beim Anlegen eines Intents können optional auch noch zusätzliche Angaben für den Erstellungsprozess in einem Objekt mitgegeben werden.<br/> EN: On creation of an Intent, additional information for the creation-process can optionally be given in an object.\n',
        required: ['intent'],
        properties: {
          intent: {
            $ref: '#/components/schemas/Intent'
          },
          intentCreationParameters: {
            $ref: '#/components/schemas/IntentCreationParameters'
          }
        }
      },
      IntentFact: {
        type: 'object',
        description:
          'DE: Key-Fact zu einem Baufinanzierungs-Vorhaben eines Kunden/einer Kundengruppe. Ein Baufinanzierungsvorhaben besteht aus einer Sammlung von Immobilien (estates)\n    die an der Finanzierung beteiligt sein können (als Finanzierungsobjekt oder Zusatzsicherheit oder Vermögenswert)\n    und Personen die als Darlehensnehmer oder Familienangehörige der Darlehensnehmer beteiligt sind<br/>\nEN: Key-facts regarding a customers real-estate mortgage project. It consists mainly of a collection of estates with different roles (financing object, additional security, equity)\n    and a collection of persons which might be involved as applicants or their family members\n',
        properties: {
          intentId: {
            type: 'string',
            maxLength: 24,
            readOnly: true,
            description:
              'DE: technische ID dieses Vorhabens.<br/> EN: technical id of this intent.\n'
          },
          readOnly: {
            type: 'boolean',
            default: true,
            readOnly: true,
            description:
              'DE: Kennzeichen für ein nicht mehr veränderliches Vorhaben. <br/> EN: flag indicating that this intent is not changeable.\n'
          },
          persons: {
            type: 'array',
            readOnly: true,
            description:
              'DE: Liste der beteiligten Personen mit Status ACTIVE.<br/> EN: List of persons with state ACTIVE involved in this intent\n',
            items: {
              $ref: '#/components/schemas/PersonFact'
            }
          },
          estates: {
            type: 'array',
            readOnly: true,
            description:
              'DE: Liste der Immobilien die an dem Vorhaben als Finanzierungsobjekt beteiligt sind, aufsteigend nach Erstellungszeitpunkt sortiert.\n    Ohne Zusatzsicherheiten und weiteem Immobilienvermögen<br/>\nEN: List of real estates involved in this intent, as financing object. Ordered ascending by creation time. Without estates not available for financing.\n',
            items: {
              $ref: '#/components/schemas/EstateFact'
            }
          },
          created: {
            readOnly: true,
            description:
              'DE: Zeitpunkt der Erstellung des Vorhabens<br/> EN: Timestamp when the intent was created\n',
            allOf: [
              {
                $ref: '#/components/schemas/ISODateTime'
              }
            ]
          }
        }
      },
      IntentFacts: {
        type: 'object',
        description:
          'DE: Objekt zur seitenweisen Rückgabe von IntentFact Listen<br/> EN: Encapsulates the pageable return of intent-fact lists\n',
        required: ['data', 'paging'],
        properties: {
          data: {
            type: 'array',
            description: 'DE: Liste der Intents<br/> EN: List of intents\n',
            items: {
              $ref: '#/components/schemas/IntentFact'
            }
          },
          paging: {
            $ref: '#/components/schemas/Paging'
          }
        }
      },
      IntentInfo: {
        type: 'object',
        readOnly: true,
        description:
          'DE: Dünnes, technisches Abbild des Vorhabens. Enthält nur die IDs und Prozess-Informationen<br/> EN: shallow object holding the identifiers of intents. might be used for lazyloading of intent-lists\n',
        required: ['intentId'],
        properties: {
          intentId: {
            type: 'string',
            maxLength: 24,
            readOnly: true,
            description:
              "DE: technische ID dieses Vorhabens. Wird serverseitig generiert.<br/>\n    Enthält bei Intents, deren Entstehung vor dem EOL des Case-Service liegt, deren numerische intentId, ansonsten die neue, alphanumerische intentId.<br/>\nEN: technical id of this intent. is generated serverside.<br/>\n    For Intents, which are created before Case-Service's EOL, it contains their numerical intentId, otherwise the new, alphanumerical intentId.\n"
          },
          caseId: {
            type: 'integer',
            format: 'int64',
            description:
              'DE: Menschen lesbare ID dieses Vorhabens. Entspricht der bekannten Antragsnummer.<br/> EN: human readable id of the intent. Same as appId in Monolith\n'
          },
          id: {
            deprecated: true,
            type: 'string',
            description:
              'DE: technische ID dieses Vorhaben. Wird serverseitig generiert.<br/>\n    Veraltet, stattdessen "intentId" verwenden<br/>\nEN: technical id of this intent. is generated serverside may not be set in new intents.\n    this id is used as path parameter upon manipulation of this intent\n    Deprecated, use "intentId" instead\n'
          },
          caseServiceIntentId: {
            deprecated: true,
            type: 'string',
            description:
              'DE: numerische ID im Case-Service<br/>\n    Veraltet, stattdessen "intentId" verwenden<br/>\nEN: numeric intentId from caseService.\n    Deprecated, use "intentId" instead\n'
          },
          intentServiceIntentId: {
            deprecated: true,
            type: 'string',
            description:
              'DE: technische ID dieses Vorhaben. Wird serverseitig generiert.<br/>\n    Veraltet, stattdessen "intentId" verwenden<br/>\nEN: technical id of this intent. is generated serverside may not be set in new intents.\n    this id is used as path parameter upon manipulation of this intent\n    Deprecated, use "intentId" instead\n'
          },
          moduleIntentDataV2: {
            type: 'boolean',
            description:
              'DE: Kennzeichen, dass dieses Vorhaben die neue Datenerfassung nutzt<br/> EN: flag indicating the participation of this intent in the new data entry via moduleIntentDataV2.\n'
          },
          process: {
            $ref: '#/components/schemas/Process'
          }
        }
      },
      IntentPersonDebtor: {
        type: 'object',
        description:
          'DE: Ein Darlehensnehmer, der als Person des Intents erfasst ist. Enthält lediglich eine Referenz auf die Person<br/> EN: A debtor who is a person of the intent. Only consists of a reference to the person.\n',
        required: ['personId'],
        properties: {
          personId: {
            type: 'string',
            format: 'uuid',
            description:
              'DE: PersonId der entsprechenden Person.<br/>  EN: PersonId of the corresponding person.\n',
            nullable: false
          }
        },
        allOf: [
          {
            $ref: '#/components/schemas/Debtor'
          }
        ]
      },
      IntentStatus: {
        type: 'string',
        description:
          'DE: (technischer) Status des Vorhabens<br/> EN: (technical) state of the intent\n',
        example: 'ACTIVE',
        enum: [
          'IN_WORK',
          'ACTIVE',
          'ON_HOLD_BY_CUSTOMER',
          'DELETED',
          'BID_ACCEPTED',
          'SUBMITTED_TO_BANK',
          'ON_HOLD_BY_BANK',
          'POSITIVE',
          'NEGATIVE'
        ]
      },
      IntentTerminationDetails: {
        type: 'object',
        description:
          'DE: Bei beendeten Intents: Angaben, die bei der Beendigung des Intents gemacht wurden.<br/> EN: For teminated intents: Information that was given on termination of the intent.\n',
        properties: {
          type: {
            $ref: '#/components/schemas/TerminationType'
          },
          reason: {
            $ref: '#/components/schemas/TerminationReason'
          },
          details: {
            $ref: '#/components/schemas/TerminationDetails'
          },
          terminatedAt: {
            description: 'DE: Zeitpunkt der Beendigung<br/> EN: Time of termination\n',
            allOf: [
              {
                $ref: '#/components/schemas/ISODateTime'
              }
            ]
          }
        }
      },
      IntentTerminationParameters: {
        type: 'object',
        description:
          'DE: Angaben bei der Beendigung eines Intents.<br/> EN: information regarding the termination of an intent.\n',
        required: ['type', 'reason'],
        properties: {
          type: {
            $ref: '#/components/schemas/TerminationType'
          },
          reason: {
            $ref: '#/components/schemas/TerminationReason'
          },
          details: {
            $ref: '#/components/schemas/TerminationDetails'
          }
        }
      },
      IntentTerminationRequest: {
        type: 'object',
        description:
          'DE: Beim Beenden eines Vorhabens müssen Angaben zum Veranlasser, den Gründen und sonstige Details mitgegeben werden.<br/> EN: When terminating an intent, information about the originator, the reason and other details must be supplied.\n',
        properties: {
          intentTerminationParameters: {
            $ref: '#/components/schemas/IntentTerminationParameters'
          }
        }
      },
      Intents: {
        type: 'object',
        description:
          'DE: Objekt zur seitenweise Rückgabe von Intent Listen<br/> EN: Encapsulates the pageable return of intent lists\n',
        required: ['data', 'paging'],
        properties: {
          data: {
            type: 'array',
            description: 'DE: Liste der Intents<br/> EN: List of intents\n',
            items: {
              $ref: '#/components/schemas/Intent'
            }
          },
          paging: {
            $ref: '#/components/schemas/Paging'
          }
        }
      },
      LeasingLiability: {
        type: 'object',
        description: 'DE: ein Leasing Vertrag (Leasing Kredit)<br/> EN: a leasing contract\n',
        required: ['type'],
        properties: {
          amount: {
            description:
              'DE: Listenpreis des geleasten Objektes.<br/> EN: Official price of the leasing item.\n',
            allOf: [
              {
                $ref: '#/components/schemas/PositiveEuroAmount'
              }
            ]
          },
          residualDebt: {
            description:
              'DE: Aktuelle Restschuld. Nicht verwenden, der Wert wird ignoriert oder ggf. gelöscht.  Das Feld existiert nur zur Wahrung der Kompatibilität der API und wird in einem künftigen Release entfernt. <br/> EN: Current remaining debt. Do not use, the value will be ignored or deleted if necessary.  The field exists only to maintain API compatibility and will be removed in a future release.\n',
            deprecated: true,
            allOf: [
              {
                $ref: '#/components/schemas/EuroAmount'
              }
            ]
          },
          leasingLiabilityType: {
            description:
              'DE: Art des Leasingvertrags (\n    PRIVATE=privat,\n    BUSINESS=gewerblich )<br/>\nEN: type of liability\n',
            type: 'string',
            enum: ['PRIVATE', 'BUSINESS']
          }
        },
        allOf: [
          {
            $ref: '#/components/schemas/Liability'
          }
        ]
      },
      Liability: {
        type: 'object',
        description:
          'DE: Basisklasse für eine Verbindlichkeit.<br/> EN: base for a typed liability.\n',
        required: ['type', 'id'],
        properties: {
          type: {
            description:
              'DE: Art der Verbindlichkeit (\n    LEASING=Leasingvertrag,\n    CREDIT=Verbraucherkredit)<br/>\nEN: type of liability\n',
            type: 'string',
            nullable: false,
            enum: ['LEASING', 'CREDIT']
          },
          id: {
            description:
              'DE: Technische ID der Verbindlichkeit.<br/> EN: technical ID of the liability\n',
            type: 'string',
            format: 'uuid'
          },
          provider: {
            description: 'DE: Darlehensgeber/Leasingfirma.<br/> EN: Credit or Leasing company.\n',
            type: 'string',
            maxLength: 100
          },
          providerId: {
            deprecated: true,
            description:
              'DE: Veraltet ! ID des Darlehensgeberns/der Leasingfirma.<br> EN: Deprecated ! ID of the credit or leasing company.\n',
            type: 'string'
          },
          burden: {
            description:
              'DE: Monatliche Rate für diese Verbindlichkeit<br/> EN: monthly payment for this liability\n',
            allOf: [
              {
                $ref: '#/components/schemas/PositivePeriodicalEuroAmount'
              }
            ]
          },
          contractNumber: {
            type: 'string',
            maxLength: 100,
            description:
              'DE: Vertragsnummer dieser Verbindlichkeit<br/> EN: contract number of this liability\n'
          },
          endOfContract: {
            description:
              'DE: Ablaufdatum des zugrundeliegenden Vertrags. Nicht für Rahmenkredit (LINE_OF_CREDIT) relevant.<br/>  EN: end date of the contract. Only relevant if creditLiabilityType is not LINE_OF_CREDIT.\n',
            allOf: [
              {
                $ref: '#/components/schemas/ISODate'
              }
            ]
          },
          sequenceNumber: {
            type: 'integer',
            minimum: 0,
            maximum: 100,
            description:
              'DE: laufende Nummer. Wird vor dem Speichern vom Backend gesetzt und ggf. verändert. Um Veränderungen vorzubeugen,  sollte die sequenceNumber pro Intent einmalig sein.<br> EN: sequence. Set by the backend before saving and changed if necessary. To prevent changes, the sequenceNumber should be unique per intent.\n'
          }
        },
        discriminator: {
          propertyName: 'type',
          mapping: {
            LEASING: '#/components/schemas/LeasingLiability',
            CREDIT: '#/components/schemas/CreditLiability'
          }
        }
      },
      LivingAddress: {
        type: 'object',
        description:
          'DE: Adresse des aktuellen oder eines früheren Wohnorts<br/> EN: address of the living place, current or past.\n',
        properties: {
          fromDate: {
            description:
              'DE: Beginn des Gültigkeitszeitraums dieser Adresse (= Einzugsdatum)<br/> EN: Begin of validity of this address (= date of moving in)\n',
            allOf: [
              {
                $ref: '#/components/schemas/ISODate'
              }
            ]
          },
          toDate: {
            description:
              'DE: Ende des Gültigkeitszeitraums dieser Adresse (= Auszugsdatum). Wenn leer, dann ist dies noch die aktuelle Adresse.<br/> EN: Begin of validity of this address (= date of moving in). If empty this is the current living address.\n',
            allOf: [
              {
                $ref: '#/components/schemas/ISODate'
              }
            ]
          }
        },
        allOf: [
          {
            $ref: '#/components/schemas/CommonAddress'
          }
        ]
      },
      Modernisation: {
        type: 'object',
        description:
          'DE: Beschreibung einer einzelnen Modernisierungsmassnahme nach Fertigstellung der Immobilie.<br/> \n    Typ und Jahr der Modernisierung müssen angegeben sein.<br/> \n    Mögliche Typen: INSULATION = Isolation / Wärmedämmung, ROOF = Dach,\n    FACADE = Fassade, WINDOWS_OR_DOORS = Fenster / Außentüren, HEAT_PROTECTION = Wärmeschutz, VENTILATION_SYSTEM = Lüftungsanlagen,\n    ELECTRICS = Elektrik, DIGITAL_ENERGY_OPTIMISATION = Digitale Systeme zur Energieoptimierung, HEATING = Heizung, BATHROOMS = Bäder, WCs,\n    POWER_WATER_HEATINGPIPES = Strom (Ab-)Wasser, Heizungsleitung-/körper, FLOOR_WALL_STAIRCASES =Bodenbeläge, Wandbekleidung, Treppenhaus,\n    STRUCTURE = Raumaufteilung, OTHER  = Sonstiges.<br/>\nEN: Description of single modernisation after construction completion. Type has to be specified.\n',
        required: ['type'],
        properties: {
          year: {
            type: 'integer',
            minimum: 1000,
            maximum: 2999,
            description:
              'DE: Jahr in dem die Modernisierung durchgeführt wurde<br/> EN: Year of the modernisations\n',
            example: 1999
          }
        },
        allOf: [
          {
            $ref: '#/components/schemas/AbstractModernisation'
          }
        ]
      },
      NeededLoan: {
        type: 'object',
        description:
          'DE: benötigtes Darlehen. Nur relevant, wenn ein Betrag vorhanden ist.<br/> EN: needed loan. Only relevant if an amount is present.\n',
        properties: {
          amount: {
            description: 'DE: Betrag des benötigten Darlehens<br/> EN: amount of needed loan\n',
            allOf: [
              {
                $ref: '#/components/schemas/PositiveEuroAmount'
              }
            ]
          },
          usage: {
            description: 'DE: Verwendungszweck des Darlehens<br/> EN: Usage of needed loan\n',
            type: 'string',
            enum: [
              'WORKING_CAPITAL_LOAN',
              'REPAYMENT_OTHER_LOANS',
              'PREPAYMENT_PENALTY',
              'REGENERATIVE_ENERGYSYSTEM',
              'RENOVATE',
              'BUY',
              'BUILD',
              'REFINANCE',
              'OTHER'
            ]
          },
          description: {
            type: 'string',
            maxLength: 4000,
            description:
              'DE: Beschreibung für Verwendungszweck=OTHER<br/> EN: description for usage=OTHER\n'
          }
        }
      },
      NonEmploymentIncome: {
        type: 'object',
        description:
          'DE: Container für monatliches Einkommen, das nicht aus einem Beschäftigungsverhältnis resultiert. Nur relevant, wenn Typ und Betrag vorhanden sind. Je Typ ist nur ein Einkommen zulässig. Wird mehr als ein Einkommen des gleichen Typs gesendet, lehnt das Backend die Anfrage ab. Alle Angaben sind pro Monat.<br/> EN: All monthly income not resulting from an employment. Only relevant if type and amount are present. Only one income is allowed per type. If more than one income of the same type is sent, the backend rejects the request. All values are per month.\n',
        properties: {
          income: {
            description:
              'DE: Liste der verschiedenen Einkommenstypen.<br/> EN: List of different income types\n',
            type: 'array',
            nullable: false,
            items: {
              $ref: '#/components/schemas/Income'
            }
          }
        }
      },
      Occupation: {
        type: 'object',
        required: ['employmentId', 'type'],
        properties: {
          employmentId: {
            type: 'string',
            format: 'uuid',
            description:
              'DE: Technische ID des Beschäftigungsverhältnisses. Beim Anlegen eines neuen Beschäftigungsverhältnisses, einfach eine UUID generieren und mitschicken. (https://de.wikipedia.org/wiki/UUID)<br/> EN: Technical ID of the employment. When creating a new occupation, just generate a UUID for it and send it. (https://en.wikipedia.org/wiki/UUID)\n'
          },
          type: {
            nullable: false,
            description: 'DE: Typ der Tätigkeit<br> EN: Type of occupation\n',
            allOf: [
              {
                $ref: '#/components/schemas/OccupationType'
              }
            ]
          },
          businessLine: {
            description:
              'DE: Branche des Auftraggebers/Arbeitgebers. <br/> EN: Business line of the employer.\n',
            allOf: [
              {
                $ref: '#/components/schemas/BusinessLine'
              }
            ]
          },
          employer: {
            type: 'string',
            maxLength: 100,
            description:
              'DE: Name des Auftraggebers/Arbeitgebers. <br/> EN: The name of the employer.\n'
          },
          sideline: {
            description:
              'DE: Flag um anzuzeigen, ob es sich bei dieser Tätigkeit um eine Nebentätigkeit handelt<br/> EN: Flag indicating whether this employment is a side job\n',
            type: 'boolean'
          },
          startDate: {
            description:
              'DE: Beginn des Beschäftigungsverhältnis. Nur wenn sideline=false. Das Datum muss in der Vergangenheit liegen oder das aktuelle Datum sein.<br/> EN: Start date of the employment. Only if sideline=false. The date must be in the past or the current date.\n',
            allOf: [
              {
                $ref: '#/components/schemas/ISODate'
              }
            ]
          },
          shareQuota: {
            description: 'DE: Beteiligungsquote<br/> EN: Share quota\n',
            allOf: [
              {
                $ref: '#/components/schemas/PositivePercentage'
              }
            ]
          },
          incomeCurrency: {
            $ref: '#/components/schemas/Currency'
          },
          shortTimeWork: {
            description:
              'DE: aktuell in Kurzarbeit<br/> EN: currently on short-time work (governmental subsidised reduction of work)\n',
            type: 'boolean',
            default: false
          },
          crossBorderCommuter: {
            type: 'boolean',
            description:
              'DE: Wahr, wenn die Person Grenzgänger ist. <br/> EN: True, if applicant is cross-border commuter.\n',
            default: false
          }
        },
        discriminator: {
          propertyName: 'type',
          mapping: {
            EMPLOYEE: '#/components/schemas/Employment',
            WORKER: '#/components/schemas/Employment',
            UNEMPLOYED: '#/components/schemas/Employment',
            OFFICIAL: '#/components/schemas/Employment',
            PARENTAL_LEAVE: '#/components/schemas/ParentalLeave',
            FREELANCER: '#/components/schemas/SelfEmployment',
            MARGINALLY_EMPLOYED: '#/components/schemas/Employment',
            STOCKHOLDER: '#/components/schemas/Employment',
            HOUSE_WIFE_OR_HUSBAND: '#/components/schemas/Employment',
            PERSON_OF_INDEPENDENT_MEANS: '#/components/schemas/Employment',
            SELF_EMPLOYED_WITH_BALANCING: '#/components/schemas/SelfEmployment',
            SELF_EMPLOYED_WITHOUT_BALANCING: '#/components/schemas/SelfEmployment',
            PENSIONER: '#/components/schemas/Employment',
            STUDENT: '#/components/schemas/Employment',
            SOLDIER: '#/components/schemas/Employment',
            EXECUTIVE: '#/components/schemas/Employment'
          }
        }
      },
      OccupationType: {
        type: 'string',
        description:
          'DE: Beschreibung der Beschäftigungsart (zum Beispiel: \n  EMPLOYEE = ANGESTELLTE/R, \n  WORKER = ARBEITER/IN, \n  UNEMPLOYED = ARBEITSLOSE/R, \n  OFFICIAL = BEAMTE/R, \n  PARENTAL_LEAVE = ELTERNZEIT, \n  FREELANCER = FREIBERUFLER/IN, \n  MARGINALLY_EMPLOYED = GERINFÜGIG BESCHÄFTIGT, \n  STOCKHOLDER  = GESCHÄFTSF. GESELLSCHAFTER/IN, \n  HOUSE_WIFE_OR_HUSBAND = HAUSMANN/FRAU,\n  PERSON_OF_INDEPENDENT_MEANS = PRIVATIER/E, \n  SELF_EMPLOYED_WITH_BALANCING = SELBSTSTÄNDIGE/R (bilanzierend), \n  SELF_EMPLOYED_WITHOUT_BALANCING = SELBSTSTÄNDIGE/R (nicht bil.), \n  PENSIONER = RENTNER/IN oder PENSIONÄR/IN, \n  STUDENT = STUDENT/IN, \n  SOLDIER = SOLDAT/IN, \n  EXECUTIVE = VORSTAND/VORSTÄNDIN). <br/>\nEN: Type of employment, possible values are EMPLOYEE, WORKER, UNEMPLOYED, OFFICIAL, PARENTAL_LEAVE, FREELANCER, MARGINALLY_EMPLOYED, STOCKHOLDER, HOUSE_WIFE_OR_HUSBAND, PERSON_OF_INDEPENDENT_MEANS, SELF_EMPLOYED_WITH_BALANCING, SELF_EMPLOYED_WITHOUT_BALANCING, PENSIONER, STUDENT, SOLDIER, EXECUTIVE.\n',
        example: 'EMPLOYEE',
        enum: [
          'EMPLOYEE',
          'WORKER',
          'UNEMPLOYED',
          'OFFICIAL',
          'PARENTAL_LEAVE',
          'FREELANCER',
          'MARGINALLY_EMPLOYED',
          'STOCKHOLDER',
          'HOUSE_WIFE_OR_HUSBAND',
          'PERSON_OF_INDEPENDENT_MEANS',
          'SELF_EMPLOYED_WITH_BALANCING',
          'SELF_EMPLOYED_WITHOUT_BALANCING',
          'PENSIONER',
          'STUDENT',
          'SOLDIER',
          'EXECUTIVE'
        ]
      },
      OpenPropertySale: {
        type: 'object',
        required: ['reason'],
        description:
          'DE: Information zur Zwischenfinanzierung in Zusammenhang mit einem Immobilienverkauf. <br/> EN: Information about bridging debt associated with property sale.\n',
        properties: {
          debtAmount: {
            description: 'DE: Aktuelle Grundschuldhöhe. <br/> EN: Current debt amount.\n',
            allOf: [
              {
                $ref: '#/components/schemas/EuroAmount'
              }
            ]
          },
          residualDebt: {
            description: 'DE: Aktuelle Restschuld. <br/> EN: Current remaining debt.\n',
            allOf: [
              {
                $ref: '#/components/schemas/EuroAmount'
              }
            ]
          }
        },
        allOf: [
          {
            $ref: '#/components/schemas/BridgingLoan'
          }
        ]
      },
      Origin: {
        type: 'object',
        readOnly: true,
        deprecated: true,
        description:
          'DE: Herkunft des Vorhabens. Veraltet und nur temporär hier abgebildet, im Zielbild wird es eine andere Datenquelle für Herkunftsinformationen geben.<br/> EN: Information regarding the origin of this intent. Deprecated and only temporarily available here. There will be a different datasource for these informations.\n',
        properties: {
          salesChannel: {
            type: 'string',
            maxLength: 36,
            deprecated: true,
            readOnly: true,
            description:
              'DE: Vertriebskanal. Veraltet und nur temporär hier abgebildet, im Zielbild wird es eine andere Datenquelle für Herkunftsinformationen geben.<br/> EN: sales channel. Deprecated and only temporarily available here. There will be a different datasource for these informations.\n'
          },
          creation: {
            type: 'string',
            maxLength: 64,
            deprecated: true,
            readOnly: true,
            description:
              'DE: Erzeugungs-ID. Veraltet und nur temporär hier abgebildet, im Zielbild wird es eine andere Datenquelle für Herkunftsinformationen geben.<br/> EN: creation key. Deprecated and only temporarily available here. There will be a different datasource for these informations.\n'
          },
          coopId: {
            type: 'integer',
            deprecated: true,
            readOnly: true,
            description:
              'DE: ID des Kooperationspartners. Veraltet und nur temporär hier abgebildet, im Zielbild wird es eine andere Datenquelle für Herkunftsinformationen geben.<br/> EN: ID of the cooperation partner. Deprecated and only temporarily available here. There will be a different datasource for these informations.\n'
          },
          b2cAppMode: {
            type: 'string',
            deprecated: true,
            readOnly: true,
            description:
              'DE: Endkundenantragsmodus. Veraltet und nur temporär hier abgebildet, im Zielbild wird es eine andere Datenquelle für Herkunftsinformationen geben.<br/> EN: customer application mode. Deprecated and only temporarily available here. There will be a different datasource for these informations.\n'
          },
          requestedBranch: {
            type: 'string',
            deprecated: true,
            readOnly: true,
            description:
              'DE: Wunschstandort. Veraltet und nur temporär hier abgebildet, im Zielbild wird es eine andere Datenquelle für Herkunftsinformationen geben. <br/> EN: Desired office location. Deprecated and only temporarily available here. There will be a different datasource for these informations.\n'
          },
          preferredProcessor: {
            type: 'string',
            deprecated: true,
            readOnly: true,
            description:
              'DE: Wunschberater. Veraltet und nur temporär hier abgebildet, im Zielbild wird es eine andere Datenquelle für Herkunftsinformationen geben. <br/> EN: Desired advisor. Deprecated and only temporarily available here. There will be a different datasource for these informations.\n'
          },
          directAssign: {
            type: 'boolean',
            deprecated: true,
            readOnly: true,
            description:
              'DE: das Vorhaben ist direkt an den Ersteller geschlüsselt. Veraltet und nur temporär hier abgebildet, im Zielbild wird es eine andere Datenquelle für Herkunftsinformationen geben. <br/> EN: the intent is assigned directly to the creator. Deprecated and only temporarily available here. There will be a different datasource for these informations.\n'
          },
          duplicateFromCaseId: {
            type: 'string',
            deprecated: true,
            readOnly: true,
            description:
              'DE: das Vorhaben ist eine Kopie von dem Vorhaben mit der caseId. Veraltet und nur temporär hier abgebildet, im Zielbild wird es eine andere Datenquelle für Herkunftsinformationen geben. <br/>\n EN: the intent is a copy of the intent with the caseId. Deprecated and only temporarily available here. There will be a different datasource for these informations.\n'
          },
          hasRecommender: {
            type: 'boolean',
            deprecated: true,
            readOnly: true,
            description:
              'DE: KWK. Veraltet und nur temporär hier abgebildet, im Zielbild wird es eine andere Datenquelle für Herkunftsinformationen geben. <br/> EN: Customers recruit customers. Deprecated and only temporarily available here. There will be a different datasource for these informations.\n'
          },
          distributionChannel: {
            type: 'string',
            deprecated: true,
            readOnly: true,
            description:
              'DE: Vertriebsweg. Veraltet und nur temporär hier abgebildet, im Zielbild wird es eine andere Datenquelle für Herkunftsinformationen geben.<br/> EN: Distribution Channel. Deprecated and only temporarily available here. There will be a different datasource for these informations.\n'
          }
        }
      },
      OwnerUnitGroup: {
        type: 'object',
        description:
          'DE: Selbstgenutzte Einheitengruppe<br/> EN: Unit group the future owner is going to live in\n',
        allOf: [
          {
            $ref: '#/components/schemas/UnitGroup'
          }
        ]
      },
      Paging: {
        type: 'object',
        description: 'DE: <br/> EN: Container for pagination information\n',
        properties: {
          cursorAfter: {
            type: 'string',
            maxLength: 100,
            description:
              'DE: Cursor der in einer folgenden Anfrage verwendet werden kann um die nachfolgenden Datensätze abzurufen.<br/>\n    Wenn dieses Feld null ist, dann gibt es keine nachfolgenden Datensätze.<br/>\nEN: Cursor to be used to request the following list of results. If null there are no following records.\n'
          },
          cursorBefore: {
            type: 'string',
            maxLength: 100,
            description:
              'DE: Cursor der in einer folgenden Anfrage verwendet werden kann um die vorhergehenden Datensätze abzurufen.<br/>\n    Wenn dieses Feld null ist, dann gibt es keine vorhergehenden Datensätze.<br/>\nEN: Cursor to be used to request the previous list of results. If null there are no previous records.\n'
          },
          limit: {
            type: 'integer',
            maximum: 100,
            minimum: 1,
            description:
              'DE: Für die Abfrage verwendete maximal Anzahl der Ergebnisse<br/> EN: Maximum result count used in the Request'
          }
        }
      },
      ParentalLeave: {
        type: 'object',
        description:
          'DE: Beschreibt ein (Angestelltes) Beschäftigungsverhältnis das wegen Elternzeit aktuell ruht<br/> EN: Describes an employment that is currently paused due to parental leave.\n',
        allOf: [
          {
            $ref: '#/components/schemas/Employment'
          }
        ],
        properties: {
          parentalLeaveStartDate: {
            description:
              'DE: Datum des Anfangs der Elternzeit<br/> EN: Startdate of parental leave\n',
            allOf: [
              {
                $ref: '#/components/schemas/ISODate'
              }
            ]
          },
          parentalLeaveEndDate: {
            description: 'DE: Ende der Elternzeit<br/> EN: End date of parental leave\n',
            allOf: [
              {
                $ref: '#/components/schemas/ISODate'
              }
            ]
          }
        }
      },
      ParentalMoneyIncome: {
        type: 'object',
        description:
          'DE: Informationen über monatliches Elterngeld. Nur relevant, wenn Betrag oder End-Datum vorhanden sind.<br/> EN: Informations regarding monthly parental/child-raising allowance. Only relevant if amount or endDate are present.\n',
        required: ['type', 'amount'],
        properties: {
          endDate: {
            description:
              'DE: Ende des Elterngeld Bezugs<br/> EN: End date for parental allowance.\n',
            allOf: [
              {
                $ref: '#/components/schemas/ISODate'
              }
            ]
          }
        },
        allOf: [
          {
            $ref: '#/components/schemas/Income'
          }
        ]
      },
      ParkingSpace: {
        type: 'object',
        required: ['type'],
        description:
          'DE: Parkplatz Informationen. Nur relevant, wenn Typ des Stellplatzes vorhanden ist.<br/> EN: parking space. Only relevant if type of the parking slot is present.\n',
        properties: {
          type: {
            type: 'string',
            description: 'DE: Typ des Stellplatzes<br/> EN: type of the parking slot\n',
            enum: ['SURFACE', 'CARPORT', 'DUPLEX', 'UNDERGROUND', 'DOUBLE', 'SINGLE']
          },
          parkingSpaceNumber: {
            description: 'DE: Stellplatznummer<br/> EN: Number of parking space\n',
            type: 'string',
            maxLength: 100
          }
        }
      },
      PatchRequest: {
        type: 'object',
        description: 'A JSONPatch document as defined by RFC 6902',
        required: ['op', 'path'],
        properties: {
          op: {
            type: 'string',
            description: 'The operation to be performed',
            enum: ['add', 'remove', 'replace', 'move', 'copy', 'test']
          },
          path: {
            type: 'string',
            description: 'A JSON-Pointer'
          },
          value: {
            type: 'object',
            description: 'The value to be used within the operations.'
          },
          from: {
            type: 'string',
            description: 'A string containing a JSON Pointer value.'
          }
        }
      },
      Payout: {
        type: 'object',
        description:
          'DE: Beschreibung der Auszahlungen für die Immobilie<br/> EN: payouts needed for the estate\n',
        properties: {
          accordingToMabv: {
            type: 'boolean',
            description:
              'DE: Kennzeichen das Auszahlungen nach MaBV erfolgt<br/> EN: flag indicating whether the payout is following MaBV rules\n'
          },
          payments: {
            type: 'array',
            nullable: false,
            description: 'DE: Liste der einzelnen Auszahlungen<br/> EN: List of payment\n',
            items: {
              type: 'object',
              description: 'DE: Einzelne Auszahlung<br/> EN: single payment\n',
              properties: {
                date: {
                  type: 'string',
                  format: 'date',
                  description: 'DE: Datum der Auszahlung<br/> EN: date of payout\n'
                },
                percentage: {
                  type: 'number',
                  description:
                    'DE: Prozentualer Anteil an der Gesamtsumme. Nur bei reason=MABV_INSTALLMENT<br/> EN: percentage of total payment. Only when reason=MABV_INSTALLMENT\n'
                },
                amount: {
                  type: 'number',
                  description: 'DE: Betrag der Auszahlung<br/> EN: amount of payment\n'
                },
                reason: {
                  type: 'string',
                  description:
                    'DE: Typisierung der Zahlungen.<br/> EN: the different types of payments. most common is PRICE_PAYMENT, the one payout to purchase the estate<br> when in addition to the purchase some modernisation is to be financed some MODERNISATION payouts might be necessary<br> for a construction projects seven (or more) MABV_INSTALLMENT will be necessary\n',
                  enum: ['PRICE_PAYMENT', 'MODERNISATION', 'MABV_INSTALLMENT']
                }
              }
            }
          }
        }
      },
      PensionIncome: {
        type: 'object',
        description:
          'DE: Daten zu monatlichem Rentenanspruch und Einkommen aus Renten. Nur relevant, wenn mindestens Betrag oder eine andere Angabe vorhanden.<br/> EN: Details regarding monthly pension entitlement and pension income. Only relevant if at least amount or any other value is present.\n',
        required: ['type'],
        properties: {
          retirementDate: {
            description:
              'DE: Voraussichtlicher Renteneintritt. <br/> EN: Expected retirement date.\n',
            allOf: [
              {
                $ref: '#/components/schemas/ISODate'
              }
            ]
          },
          claimState: {
            description: 'DE: Rentenanspruch gesetzlich. <br/> EN: Public pension entitlement.\n',
            allOf: [
              {
                $ref: '#/components/schemas/PositiveEuroAmount'
              }
            ]
          },
          claimInsurance: {
            description:
              'DE: Rentenanspruch aus privaten Lebens- und Rentenversicherungsbeiträgen. <br/> EN: Pension entitlement from private life and pension insurance contributions.\n',
            allOf: [
              {
                $ref: '#/components/schemas/PositiveEuroAmount'
              }
            ]
          }
        },
        allOf: [
          {
            $ref: '#/components/schemas/Income'
          }
        ]
      },
      PeriodicalEuroAmount: {
        type: 'object',
        description:
          'DE: Ein mehrfach im Jahr wiederkehrender Geldbetrag in Euro.<br> EN: An amount of money in Euro recurring multiple times per year.\n',
        required: ['amount', 'numberOfPaymentsPerYear'],
        properties: {
          amount: {
            $ref: '#/components/schemas/EuroAmount'
          },
          numberOfPaymentsPerYear: {
            minimum: 0,
            maximum: 365,
            type: 'integer',
            format: 'int32'
          }
        }
      },
      PersonFact: {
        type: 'object',
        readOnly: true,
        description:
          'DE: Kurzbeschreibung einer an der Finanzierung beteiligten Person<br> EN: short facts regarding a person\n',
        properties: {
          personId: {
            type: 'string',
            format: 'uuid',
            readOnly: true,
            description:
              'DE: Eindeutiger Schlüssel (ID) der die Person identifiziert.<br/>  EN: unique id referencing this person. Is always present.\n'
          },
          gender: {
            type: 'string',
            readOnly: true,
            description: 'DE: Geschlecht der Person <br/> EN: gender of the person\n',
            enum: ['M', 'F', 'D']
          },
          title: {
            type: 'string',
            readOnly: true,
            description:
              'DE: Akademischer Titel der Person <br/> EN: academic title of the person\n',
            enum: ['DR', 'PH_D', 'PD_DR', 'PROF', 'PROF_DR']
          },
          firstName: {
            type: 'string',
            readOnly: true,
            maxLength: 100,
            description: 'DE: Vorname der Person. <br/> EN: First name of the person.\n'
          },
          lastName: {
            type: 'string',
            readOnly: true,
            maxLength: 100,
            description: 'DE: Nachname der Person. <br/> EN: Last name of the person.\n'
          }
        }
      },
      PersonParams: {
        type: 'object',
        description:
          'DE: Kapselt ein Person Objekt um dieses im Kontext der Baufinanzierung zu repräsentieren.<br> EN: encapsulates an person object to enrich it in the context of the mortgage intent\n',
        required: ['personId', 'person'],
        properties: {
          personId: {
            type: 'string',
            format: 'uuid',
            readOnly: true,
            description:
              'DE: Eindeutiger Schlüssel (ID) die die Person identifiziert. Ist immer vorhanden. Unveränderliches Duplikat zu person.personId. Muss bei create gesetzt werden, der Wert wird aber ignoriert und von personParams.person.personId genommen.<br/>  EN: unique id referencing this person. Is always present. Readonly Duplicate of person.personId. Must be set on create, but value is ignored and taken from personParams.person.personId\n'
          },
          applicantId: {
            deprecated: true,
            type: 'string',
            readOnly: true,
            description:
              'DE: Alte ID, die den/die Antragsteller:in kennzeichnet.<br/>  EN: old id identifying the applicant.\n'
          },
          createdDate: {
            readOnly: true,
            description:
              'DE: Datum der Erstellung des Datensatzes<br/> EN: date this person data was created\n',
            allOf: [
              {
                $ref: '#/components/schemas/ISODateTime'
              }
            ]
          },
          deletable: {
            type: 'boolean',
            default: false,
            readOnly: true,
            description:
              'DE: Flag, ob dieser Personen-Datensatz gelöscht werden kann.<br/> EN: Flag whether this data can be deleted.\n'
          },
          state: {
            description:
              'DE: (technischer) Status der Person. Mögliche Ausprägungen sind ACTIVE für verwendbare Personen und DELETED für Personen, die gelöscht wurden.\n    Personen die mit DELETED markiert wurden sollten nicht mehr verwendet werden, sie können jederzeit auch physisch gelöscht werden.<br/>\nEN: (technical) state of the person. Possible values are ACTIVE for usable persons and DELETED for persons that were flagged for deletion.\n    those should not be used anymore as they might be deleted without further notice.\n',
            type: 'string',
            default: 'ACTIVE',
            readOnly: true,
            enum: ['ACTIVE', 'DELETED']
          },
          bridgingLoan: {
            description:
              'DE: Beschreibung einer ggf. notwendigen Zwischen-Finanzierung.<br/> EN: Description of a potentially needed bridging-loan.\n',
            allOf: [
              {
                $ref: '#/components/schemas/BridgingLoan'
              }
            ]
          },
          mortgageExperience: {
            description:
              'DE: Hat die Person schon einmal eine Immobilie finanziert?<br/> EN: indication, whether the person has taken up a mortgage before\n',
            type: 'string',
            nullable: true,
            enum: ['WITH_EXPERIENCE', 'WITHOUT_EXPERIENCE']
          },
          person: {
            $ref: '#/components/schemas/Individual'
          }
        }
      },
      PlotOfLand: {
        type: 'object',
        required: ['estateId', 'version', 'address'],
        description: 'DE: Grundstück als Objekt<br/> EN: Plot of land as estate\n',
        properties: {
          groundType: {
            type: 'string',
            description:
              'DE: Art des Grundstücks (BUILDING_LAND=Bauland, EXPECTED_BUILDING_LAND=Bauerwartungsland, OTHER=Sonstiges) EN: What is the type of land?\n',
            enum: ['BUILDING_LAND', 'EXPECTED_BUILDING_LAND', 'OTHER']
          },
          buildingAllowance: {
            type: 'boolean',
            default: true,
            description:
              'DE: Besteht eine Baubewilligung?<br/> EN: Is there a building allowance?\n'
          }
        },
        allOf: [
          {
            $ref: '#/components/schemas/Estate'
          }
        ]
      },
      PositiveEuroAmount: {
        type: 'object',
        description:
          'DE: Ein positiver Geldbetrag in Euro.<br/> EN: an amount of money in Euro. The amount must be positive.\n',
        required: ['value'],
        properties: {
          value: {
            type: 'number',
            minimum: 0,
            maximum: 100000000
          }
        }
      },
      PositivePercentage: {
        type: 'object',
        description: 'DE: Prozentzahl<br/> EN: percentage value\n',
        required: ['value'],
        properties: {
          value: {
            type: 'number',
            maximum: 100,
            minimum: 0
          }
        }
      },
      PositivePeriodicalEuroAmount: {
        type: 'object',
        description:
          'DE: Ein mehrfach im Jahr wiederkehrender Geldbetrag in Euro. Der Geldbetrag muss positiv sein. <br> EN: An amount of money in Euro recurring multiple times per year. The amount of money must be positive.\n',
        required: ['amount', 'numberOfPaymentsPerYear'],
        properties: {
          amount: {
            $ref: '#/components/schemas/PositiveEuroAmount'
          },
          numberOfPaymentsPerYear: {
            minimum: 0,
            maximum: 365,
            type: 'integer',
            format: 'int32'
          }
        }
      },
      Process: {
        type: 'object',
        description:
          'DE: Prozess Informationen zu dem Vorhaben<br/> EN: process information regarding this intents passage through the consultation process\n',
        required: ['companyId'],
        properties: {
          submitted: {
            type: 'string',
            format: 'date-time',
            readOnly: true,
            description:
              'DE: Zeitpunkt zu dem das Vorhaben bei der beratenden Organisation eingegangen ist (aktuell noch: Zeitpunkt zu dem das Vorhaben bei der Interhyp-Gruppe eingegangen ist)<br/> EN: point of time this intent reached interhyp or another sales organisation, this should represent the time the customer asked for assistance from an advisor\n'
          },
          created: {
            type: 'string',
            format: 'date-time',
            readOnly: true,
            description:
              'DE: Zeitpunkt, zu dem das Vorhaben das erste Mal persistiert wurde<br/> EN: Point of time this intent was persisted for the first time\n'
          },
          companyId: {
            type: 'string',
            maxLength: 36,
            readOnly: true,
            description:
              'DE: ID der für dieses Vorhaben verantwortlichen Firma<br/> EN: ID of the Company responsible for this intent\n'
          },
          unitId: {
            type: 'string',
            maxLength: 36,
            readOnly: true,
            description:
              'DE: ID der Einheit die in der Firma für das Vorhaben verantwortlich ist<br/> EN: ID of the companies unit responsible for this intent\n'
          },
          legacyUnitId: {
            type: 'string',
            maxLength: 18,
            readOnly: true,
            description:
              'DE: Historische ID (= Monolith ID) der verantwortlichen Einheit<br/> EN: legacy ID (i.e. monolith ID) of the Interhyp Unit responsible for this intent\n',
            deprecated: true
          },
          legacyCompany: {
            type: 'string',
            maxLength: 1000,
            readOnly: true,
            description:
              "DE: Historische Bezeichnung ('company' im Monolithen) der für das Vorhanden verantwortlichen Firma<br/> EN: historical name (i.e. 'company' in the monolith) of the company responsible for this intent\n",
            deprecated: true
          },
          status: {
            readOnly: true,
            allOf: [
              {
                $ref: '#/components/schemas/IntentStatus'
              }
            ]
          },
          readOnly: {
            type: 'boolean',
            default: true,
            readOnly: true,
            description:
              'DE: Kennzeichen für unveränderliches Vorhaben. Das Kennzeichen gilt für alle Nutzer<br/> EN: flag indicating that this intent is not changeable. The flag applies to all users.\n'
          },
          readOnlyForCustomer: {
            deprecated: true,
            type: 'boolean',
            default: true,
            readOnly: true,
            description:
              "DE: Veraltet: die Information ist abgebildet über das 'readOnly'-Kennzeichen . Kennzeichen für ein Vorhaben, das durch den Kunden nicht mehr geändert werden kann<br/> EN: deprecated: this data is replaced by readOnly-flag. Flag indicating that this intent is not changeable by a customer user.\n"
          },
          origin: {
            deprecated: true,
            readOnly: true,
            description:
              'DE: Sammlung von Herkunftsinformationen. Veraltet, wird durch eine alternative Datenquelle ersetzt.<br/> EN: Collection of orgin information. This has been deprecated and is soon going to move into a different data source.\n',
            allOf: [
              {
                $ref: '#/components/schemas/Origin'
              }
            ]
          },
          termination: {
            readOnly: true,
            description:
              'DE: In beendeten Vorhaben: Angaben, die bei der Beendigung des Intents gemacht wurden.<br/> EN: In terminated intents: Information that was given regarding the termination of the intent.\n',
            allOf: [
              {
                $ref: '#/components/schemas/IntentTerminationDetails'
              }
            ]
          },
          staffOwnIntent: {
            type: 'boolean',
            description:
              "DE: Kennzeichen für Mitarbeiterfinanzierungen. Ist für die Company des Vorhabens die Erfassung der Mitarbeiternummer des Kunden erlaubt, dann darf das Kennzeichen für Mitarbeiterfinanzierungen auch gesetzt werden.<br/> EN: intent belonging to an employee of the consulting company. If a configuration that allows the entry of the customer's employee number is set for the company of intent, then this property can also be changed.\n",
            default: false
          },
          testIntent: {
            type: 'boolean',
            default: false,
            description:
              'DE: true kennzeichnet dieses Baufinanzierungsvorhaben als Test Datensatz, wie damit hinsichtlich Berechtigungen/Funktionalitäten/Auswertbarkeit umgegangen wird obliegt den nachfolgenden Services. Im Intent-Service hat das Flag keine Auswirkungen.<br> EN: true marks this mortgage-intent as test data. Implication this has on rights/functionalities/reporting is up to services working with this intent. For Intent-Service setting this flag to true has currently no effects.\n'
          },
          processors: {
            type: 'array',
            nullable: false,
            readOnly: true,
            deprecated: true,
            description:
              'DE: Veraltet, nicht benutzen! Eine nicht-abschließende Liste von Beratern, die mit dem Vorhaben in Verbindung stehen oder standen.<br/> EN: Deprecated, do not use it! A non-exhaustive list of advisors who are or have been associated with the intent.\n',
            items: {
              type: 'object',
              required: ['role'],
              properties: {
                processorId: {
                  type: 'string',
                  maxLength: 36,
                  description:
                    'DE: technische ID des Beraters (im User-Service)<br/> EN: technical id of the advisor (id in user-service)\n'
                },
                legacyProcessorId: {
                  type: 'string',
                  maxLength: 18,
                  description:
                    'DE: Historische ID des Beraters (aus dem Monolithen)<br/> EN: legacy id (i.e. monolith ID) of this processor\n',
                  deprecated: true
                },
                companyId: {
                  type: 'string',
                  maxLength: 36,
                  deprecated: true,
                  description:
                    'DE: Firmen-ID des Beraters (muss nicht der Firmen-ID des Vorhabens entsprechen, z.B: im Clearing Prozess)<br/> EN: ID of the company this processor is member of. might be different from the intents company ID (e.g. in a companies clearing process)\n'
                },
                role: {
                  type: 'string',
                  description:
                    'DE: Rolle des Beraters (ADVISOR = Berater, SUPPORTER = Unterstützung des Beraters, CLEARER = Prüfer)<br/> EN: role of the advisor\n',
                  enum: ['ADVISOR', 'SUPPORTER', 'CLEARER']
                }
              }
            }
          },
          customers: {
            type: 'array',
            readOnly: true,
            description:
              'DE: Kunden (Home Nutzer) mit Verbindung zu dem Vorhaben<br/> EN: customers linked to this intent\n',
            items: {
              type: 'object',
              description:
                'DE: Beziehung zwischen Vorhaben und Kunden<br/> EN: relationship of this intent to customers\n',
              required: ['userId', 'companyId', 'customerId', 'email'],
              properties: {
                userId: {
                  type: 'string',
                  maxLength: 36,
                  description:
                    'DE: User-Service ID des Kunden<br/> EN: user-service ID of the customer\n'
                },
                companyId: {
                  type: 'string',
                  maxLength: 36,
                  description: 'DE: Firmen ID des Kunden<br/> EN: companyId of the customer\n'
                },
                customerId: {
                  type: 'string',
                  maxLength: 36,
                  description:
                    'DE: customer-service ID des Kunden<br/> EN: customerId of the customer in customer-service\n'
                },
                emailAddress: {
                  type: 'string',
                  maxLength: 100,
                  description:
                    'DE: E-Mail-Adresse des Kunden im customer-service<br/> EN: email-Address of the customer in customer-service\n'
                }
              }
            }
          }
        }
      },
      PropertyOwner: {
        type: 'object',
        description:
          'DE: Zukünftiger (ownership=TO_ACQUIRE) oder aktueller (ownership=OWNED) Eigentümer der Immobilie oder des mithaftendes Grundstückes.\n    Eigentümer könnnen die an der Finanzierung beteiligten Personen (IDs in der personIds Liste) sowie ein dritter (thirdPartyInvolved = true und ggf. name ausgefüllt) sein.<br/>\nEN: Future (ownership=TO_ACQUIRE) or current (ownership=OWNED) owner of the of the estate or the liable property.\n    Owners may be persons involved in the intent (IDs of the persons are added to the personIds list) and/or a third party (thirdPartyInvolved = true and possibly the name field filled)\n',
        properties: {
          thirdPartyInvolved: {
            type: 'boolean',
            description:
              'EN: Flag indicating that a thirdpary is owner. Might be further described by the name field.<br/> DE: Kennzeichen, dass ein Dritter (Mit-)Eigentümer ist.\n'
          },
          name: {
            type: 'string',
            maxLength: 200,
            description:
              'DE: Name des Eigentümers. Nur gefüllt, wenn thirdPartyInvolved=true<br/> EN: Name of the owner. May only be filled when thirdPartyInvolved=true<br/>\n'
          },
          personIds: {
            type: 'array',
            description: 'DE: Liste von PersonIds<br/> EN: List of person IDs\n',
            items: {
              description:
                'DE: ID einer Person in diesem Intent<br/> EN: ID of a person from this intents personParams collection\n',
              type: 'string',
              format: 'uuid'
            }
          }
        }
      },
      ProvinceType: {
        type: 'string',
        description:
          'DE: Bundesland (Teil der Adresse) nach ISO 3166-2 (https://en.wikipedia.org/wiki/ISO_3166-2). z.Zt. nur deutsche Bundesländer<br/> EN: Federal state of the address in ISO_3166-2 format (https://en.wikipedia.org/wiki/ISO_3166-2). Currently limited to federal states of Germany\n',
        enum: [
          'DE_BW',
          'DE_BY',
          'DE_BE',
          'DE_BB',
          'DE_HB',
          'DE_HH',
          'DE_HE',
          'DE_MV',
          'DE_NI',
          'DE_NW',
          'DE_RP',
          'DE_SL',
          'DE_SN',
          'DE_ST',
          'DE_SH',
          'DE_TH'
        ]
      },
      RFC7807Problem: {
        type: 'object',
        title: 'RFC7807Problem',
        description: 'Holds information regarding the returned error',
        required: ['timestamp', 'traceId', 'instance', 'title', 'status'],
        properties: {
          timestamp: {
            type: 'string',
            format: 'date-time',
            description:
              'A UTC date-time indicates the error timestamp (https://en.wikipedia.org/wiki/Coordinated_Universal_Time)'
          },
          type: {
            type: 'string',
            format: 'uri',
            description: 'URL refers to more information about the error.',
            default: 'about:blank'
          },
          title: {
            type: 'string',
            description: 'Error short description',
            example: 'Bad Request'
          },
          status: {
            type: 'integer',
            format: 'int32',
            description:
              'HTTP status code following standared error codes (https://tools.ietf.org/html/rfc2616#section-10)',
            example: 400,
            minimum: 100,
            maximum: 600,
            exclusiveMaximum: true
          },
          detail: {
            type: 'string',
            description: 'Detailed description for the returned error',
            example: 'JSON parse error'
          },
          traceId: {
            type: 'string',
            description: 'Unique trace id for problematic request',
            example: 'avx1234asd'
          },
          instance: {
            type: 'string',
            format: 'uri',
            description: 'Path of requested resource'
          },
          violations: {
            type: 'array',
            description: 'Collection of the invalid content of the request',
            items: {
              $ref: '#/components/schemas/Violation'
            }
          }
        }
      },
      Registry: {
        type: 'object',
        description:
          'DE: Grundbucheintrag für das Objekt<br/> EN: Land registry entry for the estate\n',
        required: ['departmentOne', 'departmentTwo', 'departmentThree'],
        properties: {
          registryId: {
            type: 'string',
            format: 'uuid',
            description:
              'DE: technische ID des Grundbucheintrags<br/> EN: technical ID of the registry entry\n'
          },
          registerCourt: {
            type: 'string',
            maxLength: 50,
            description: 'DE: Amtsgericht. <br/> EN: Land registry/local court.\n'
          },
          registerCity: {
            type: 'string',
            maxLength: 50,
            description: 'DE: Grundbuchbezirk. <br/> EN: City of land register.\n'
          },
          registerVolume: {
            type: 'string',
            maxLength: 50,
            description:
              'DE: Nummer des Bandes. <br/> EN: Number of the volume of the land register.\n'
          },
          registerPage: {
            type: 'string',
            maxLength: 100,
            description: 'DE: Nummer des Blattes. <br/> EN: Page in the land register.\n'
          },
          needsMeasurement: {
            type: 'boolean',
            description: 'DE: Vermessung notwendig<br/> EN: does this area need to be measured\n'
          },
          areaNeedingMeasurement: {
            type: 'number',
            minimum: 0,
            maximum: 100000000,
            description:
              'DE: geschätzte Größe der zu vermessenden Teilfläche<br/> EN: estimated size of the area needing measurement\n'
          },
          owner: {
            $ref: '#/components/schemas/PropertyOwner'
          },
          departmentOne: {
            type: 'array',
            nullable: false,
            description:
              'DE: Grundbuch Abteilung I (Bestandsverzeichnis)<br/> EN: Registry Department One\n',
            items: {
              $ref: '#/components/schemas/DepartmentOne'
            }
          },
          departmentTwo: {
            type: 'array',
            nullable: false,
            description:
              'DE: Wertmindernde Vorlasten (Abt. II)<br/> EN: Loads and restrictions (entry from the second section of the land register sheet).\n',
            items: {
              $ref: '#/components/schemas/DepartmentTwo'
            }
          },
          departmentThree: {
            type: 'array',
            nullable: false,
            description:
              'DE: Hypotheken, Grundschulden, Rentenschulden (Eintrag aus der dritten Abteilung des Grundbuchblattes). <br/> EN: Mortgages, land charges, annuities (entry from the third section of the land register sheet).\n',
            items: {
              $ref: '#/components/schemas/DepartmentThree'
            }
          }
        }
      },
      Relationship: {
        type: 'object',
        description:
          'DE: Beziehung zwischen zwei Personen, zu lesen von Person 1 zu Person 2, wodurch auch der umgekehrte Weg impliziert wird (z.B: {personId:1,otherId:2,ownRole:SPOUSE} bedeutet Person 1 ist mit Person 2 verheiratet, was impliziert, dass Person 2 mit Person 1 verheiratet ist) EN: a relationship between two persons, to be read from person to other (e.g. {personId:1,otherId:2,ownRole:SPOUSE} means person 1 is the married to person 2, implying person 2 is married to person 1. Only one relationship of type SPOUSE is necessary between person 1 and 2)\n',
        required: ['personId', 'otherId', 'ownRole'],
        properties: {
          personId: {
            type: 'string',
            format: 'uuid'
          },
          otherId: {
            type: 'string',
            format: 'uuid'
          },
          ownRole: {
            type: 'string',
            description:
              'DE: Art der Beziehung bzw. Rolle der Person in der Beziehung <br/> EN: type of relationship or role of the first person in the relationship\n',
            enum: ['PARENT', 'SPOUSE', 'LEGALPARTNER', 'PARTNER', 'DIVORCEE', 'THIRD_PARTY']
          }
        }
      },
      RentalUnitGroup: {
        type: 'object',
        description:
          'DE: Einheitengruppe die vermietet werdeny<br/> EN: Unit group the future owner is going to rent away\n',
        properties: {
          rentedPeriod: {
            type: 'string',
            description:
              'DE: Art des Mietvertrags (TEMPORARY=befristet, UNLIMITED=unbefristet, NONE=kein Mietvertrag)<br/> EN: rented period\n',
            enum: ['TEMPORARY', 'UNLIMITED', 'NONE']
          },
          vacant: {
            type: 'boolean',
            description:
              'DE: Ist die Gruppe aktuell vermietet<br/> EN: is this unit group currently rented to somebody\n'
          },
          rent: {
            type: 'number',
            minimum: 0,
            maximum: 100000,
            description: 'DE: mtl. Netto-Kaltmiete gesamt<br/> EN: monthly rent (net)\n'
          },
          sustainableRent: {
            $ref: '#/components/schemas/ExternalEvaluation'
          }
        },
        allOf: [
          {
            $ref: '#/components/schemas/UnitGroup'
          }
        ]
      },
      ResidentialAndCommercialBuilding: {
        type: 'object',
        description:
          'DE: Wohn und Geschäftshaus<br/> EN: Residentially and commercially used building\n',
        properties: {
          numberOfFlats: {
            type: 'integer',
            description:
              'DE: Anzahl der Wohnungen im Gebäude. Darf nicht kleiner als die Summe der Wohnungen in den Unitgroups sein.<br/> EN: total number of flats in the building. Must not be smaller then the sum of the number of units in all unitGroups.\n'
          }
        },
        allOf: [
          {
            $ref: '#/components/schemas/House'
          }
        ]
      },
      Roof: {
        type: 'object',
        description:
          'DE: Beschreibung des Gebäudedachs<br/> EN: Description of the roof of the building\n',
        properties: {
          roofType: {
            type: 'string',
            description:
              'DE: Typisierung des Daches (ROOFING_FELT=Dachpappe, ROOF_TILES=Dachziegel, ARTIFICAL_SLATE=künstlicher Schiefer, SLATE_OR_METAL=Schiefer oder Metal)<br/> EN: type of covering on the roof\n',
            enum: ['ROOFING_FELT', 'ROOF_TILES', 'ARTIFICAL_SLATE', 'SLATE_OR_METAL', 'OTHER']
          },
          pvYearOfConstruction: {
            type: 'string',
            format: 'date-fullyear',
            description:
              'DE: Baujahr Photovoltaik, für Objektbewertung: Mit der Eingabe des Baujahres wird ein Barwert einer Photovoltaikanlage berücksichtigt<br/> EN: Year of construction of the photovoltaic installation\n'
          },
          pvYield: {
            type: 'number',
            description:
              'DE: Photovoltaik Stromertrag, für Objektbewertung<br/> EN: Energy capacity of the photovoltaic installation\n'
          }
        }
      },
      Schufa: {
        type: 'object',
        description: 'DE: Schufa Daten<br/> EN: Credit assessment data (Schufa).\n',
        properties: {
          negativeSchufa: {
            type: 'boolean',
            description:
              'DE: Kennzeichen für negative Schufa-Einträge<br/> EN: Flag indicating that negative Schufa entries do exist.\n',
            default: false
          },
          rating: {
            description:
              'DE: Schufa-Rating (A-E). Nur relevant, wenn keine negative Schufa.<br/> EN: Schufa rating (A-E). Only relevant if no negative schufa\n',
            type: 'string',
            enum: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M']
          },
          score: {
            description:
              'DE: Schufa-Score in Prozent. Nur relevant, wenn keine negative Schufa. Darf nicht negativ sein.<br/> EN: Schufa score as percentage. Only relevant if no negative schufa. Must not be negative.\n',
            allOf: [
              {
                $ref: '#/components/schemas/PositivePercentage'
              }
            ]
          }
        }
      },
      SelfEmployment: {
        type: 'object',
        description:
          'DE: Beschreibt ein selbstständiges Beschäftigungsverhältnis inklusive der daraus resultierenden Einkommen <br/> EN: Describes an self-employment including the generated income\n',
        allOf: [
          {
            $ref: '#/components/schemas/Occupation'
          }
        ],
        properties: {
          foundationYear: {
            description:
              'DE: Jahr der Gründung der Unternehmung. Das Jahr muss in der Vergangenheit liegen oder das aktuelle Jahr sein.<br/> EN: Year of the foundation of the enterprise. The year must be in the past or the current year.\n',
            example: 1999,
            allOf: [
              {
                $ref: '#/components/schemas/Year'
              }
            ]
          },
          jobDescription: {
            type: 'string',
            description:
              'DE: Detailierte Kategorisierung freiberuflicher/selbstständiger Tätigkeiten<br>\n    mögliche Ausprägungen:\n  <li>CARER = \tAltenpfleger,\n  <li>AMULANT_ORDERLY = Ambulanter  Krankenpfleger,\n  <li>ADVOCATE = \tAnwalt,\n  <li>APOTHECARY = Apotheker,\n  <li>ARCHITECT = Architekt,\n  <li>PHYSICIAN = Arzt,\n  <li>CONSULTANT = Berater,\n  <li>UNDERTAKER = Bestatter,\n  <li>ACCOUNTANT = Buchprüfer,\n  <li>REVISOR = Buchrevisor,\n  <li>DATAPROTECTION_COMMISSIONER = Datenschutzbeauftragter,\n  <li>DECORATOR = Dekorateur,\n  <li>DIETICIAN = Diätassistent,\n  <li>INTERPRETER #Dolmetscher und = Übersetzer,\n  <li>ERGOTHERAPIST = Ergotherapeut,\n  <li>NUTRITIONIST = Ernährungsberater,\n  <li>FINANCIAL_SERVICES = Finanzdienstleister,\n  <li>PHOTOGRAPH = Fotograf,\n  <li>GEOGRAPHER = Geograf,\n  <li>IT_CONSULTANT #IT und Programmierung,\n  <li>DESIGNER = Grafiker,\n  <li>MIDWIFE = Hebamme,\n  <li>HEALER_MASSEUR = Heilmasseur,\n  <li>HEALER = Heilpraktiker,\n  <li>HISTORIAN = Historiker,\n  <li>COMPUTER_SPECIALIST = Informatiker,\n  <li>ENGINEER = Ingenieur,\n  <li>INSOLVENCY_ADMINISTRATOR = Insolvenzverwalter,\n  <li>JOURNALIST = Journalist,\n  <li>PHYSICAL_THERAPIST = Krankengymnast,\n  <li>ORDERLY #Gesundheits- und = Krankenpfleger,\n  <li>NURSE = Krankenschwester,\n  <li>MUSICIAN #Konzertmusiker = (klassischer),\n  <li>CONSTRUCTOR = Konstrukteur,\n  <li>THERAPIST = Logopäde,\n  <li>MASSEUR = Masseur,\n  <li>PARAMEDIC #Medizinisch-technischer Assistent,\n  <li>NOTARY = Notar,\n  <li>OPTICIAN = Optiker,\n  <li>OPERA_SINGER = Opernsänger,\n  <li>HR_ADVISOR = Personalberater,\n  <li>PSYCHOLOGIST = Psychologe,\n  <li>PSYCHOTHERAPIST = Psychotherapeut,\n  <li>PHYSIOTHERAPIST = Physiotherapeut,\n  <li>INTERIOR_DECORATOR = Raumausstatter,\n  <li>RADIO_ANNOUNCER = Rundfunksprecher,\n  <li>EXPERT = Sachverständiger,\n  <li>TOWN_PLANER = Stadtplaner,\n  <li>STRUCTURAL_ENGINEER = Statiker,\n  <li>TAX_ADVISOR = Steuerberater,\n  <li>TAX_AGENT = Steuerbevollmächtigter,\n  <li>VETERINARY = Tierarzt,\n  <li>TRANSLATOR = Übersetzer,\n  <li>BUSINESS_ADVISOR = Unternehmensberater,\n  <li>AUDITOR = Wirtschaftsprüfer,\n  <li>DENTAL_TECHNICIAN = Zahntechniker,\n  <li>DENTIST = Zahnarzt,\n  <li>FARMER = Landwirt/in,\n  <li>OTHER = Sonstige,\nEN: Detailed categorization of freelancer/self-employed jobs\n',
            pattern: '^[A-Z_]*$',
            'x-extensible-enum': [
              'CARER',
              'AMBULANT_ORDERLY',
              'ADVOCATE',
              'APOTHECARY',
              'ARCHITECT',
              'PHYSICIAN',
              'CONSULTANT',
              'UNDERTAKER',
              'ACCOUNTANT',
              'REVISOR',
              'DATAPROTECTION_COMMISSIONER',
              'DECORATOR',
              'DIETICIAN',
              'INTERPRETER',
              'ERGOTHERAPIST',
              'NUTRITIONIST',
              'FINANCIAL_SERVICES',
              'PHOTOGRAPH',
              'GEOGRAPHER',
              'IT_CONSULTANT',
              'DESIGNER',
              'MIDWIFE',
              'HEALER_MASSEUR',
              'HEALER',
              'HISTORIAN',
              'COMPUTER_SPECIALIST',
              'ENGINEER',
              'INSOLVENCY_ADMINISTRATOR',
              'JOURNALIST',
              'PHYSIOTHERAPIST',
              'ORDERLY',
              'NURSE',
              'MUSICIAN',
              'CONSTRUCTOR',
              'THERAPIST',
              'MASSEUR',
              'PARAMEDIC',
              'NOTARY',
              'OPTICIAN',
              'OPERA_SINGER',
              'HR_ADVISOR',
              'PSYCHOLOGIST',
              'PSYCHOTHERAPIST',
              'PHYSIOTHERAPIST',
              'INTERIOR_DECORATOR',
              'RADIO_ANNOUNCER',
              'EXPERT',
              'TOWN_PLANER',
              'STRUCTURAL_ENGINEER',
              'TAX_ADVISOR',
              'TAX_AGENT',
              'VETERINARY',
              'TRANSLATOR',
              'BUSINESS_ADVISOR',
              'AUDITOR',
              'DENTAL_TECHNICIAN',
              'DENTIST',
              'FARMER',
              'OTHER'
            ]
          },
          income: {
            $ref: '#/components/schemas/SelfEmploymentIncome'
          }
        }
      },
      SelfEmploymentIncome: {
        type: 'object',
        description:
          'DE: Enthält alle Einkommensinformationen für das Beschäftigungsverhältnis<br/> EN: encapsulates all income information for the employment\n',
        properties: {
          profitMethod: {
            description:
              'DE: Ansatz Gewinn. Sagt aus, ob customerStatement oder SelfEmploymentIncomeItems vom Typ ANNUAL_FINANCIAL_STATEMENTS für den Ansatz des selbstständigen Einkommens gewählt werden sollen. Wird hier nichts angegeben, so wird kein Wert angesetzt.<br> EN: profit method. Specifies whether customerStatement or SelfEmploymentIncomeItems of type ANNUAL_FINANCIAL_STATEMENTS should be selected for the valuation of the self-employment income. If nothing is specified here, no self-employment income is taken into account.\n',
            type: 'string',
            enum: ['CUSTOMER_STATEMENT', 'ANNUAL_FINANCIAL_STATEMENTS']
          },
          customerStatement: {
            description:
              'DE: Selbstständigen Einnahmen pro Monat nach Kundenangabe<br> EN: Monthly average self-employed income according to customer statement\n',
            allOf: [
              {
                $ref: '#/components/schemas/PeriodicalEuroAmount'
              }
            ]
          },
          values: {
            type: 'array',
            nullable: false,
            items: {
              $ref: '#/components/schemas/SelfEmploymentIncomeItem'
            }
          }
        }
      },
      SelfEmploymentIncomeItem: {
        type: 'object',
        required: ['method'],
        description:
          'DE: Informationen zum Einkommen aus selbständiger Tätigkeit für ein Jahr <br/> EN: Describes the self employment income information for a year.\n',
        properties: {
          method: {
            type: 'string',
            nullable: false,
            description:
              'DE: Methode die zur Berechnung der Einnahmen angewandt wurde (\n  ECONOMIC_EVALUATION=BWA, \n  ANNUAL_FINANCIAL_STATEMENT=Jahresabschlüsse)<br/>\n  Bis auf weiteres wird ECONOMIC_EVALUATION nicht unterstützt.\nEN: Method used to calculate the self employed income<br/>\n    ECONOMIC_EVALUATION is currently not yet supported\n',
            enum: ['ECONOMIC_EVALUATION', 'ANNUAL_FINANCIAL_STATEMENT']
          },
          netProfit: {
            description:
              'DE: Persönlicher Nachsteuergewinn. <br/>\nEN: Personal after-tax profit.\n',
            allOf: [
              {
                $ref: '#/components/schemas/EuroAmount'
              }
            ]
          },
          surplus: {
            description: 'DE: Überschuss/Fehlbetrag. <br/>\nEN: Excess / shortfall.\n',
            allOf: [
              {
                $ref: '#/components/schemas/EuroAmount'
              }
            ]
          },
          taxes: {
            description: 'DE: Steuern. <br/>\nEN: Deducted Taxes.\n',
            allOf: [
              {
                $ref: '#/components/schemas/EuroAmount'
              }
            ]
          }
        },
        discriminator: {
          propertyName: 'method',
          mapping: {
            ECONOMIC_EVALUATION: '#/components/schemas/EconomicEvaluationItem',
            ANNUAL_FINANCIAL_STATEMENT: '#/components/schemas/AnnualFinancialStatementItem'
          }
        }
      },
      ServiceInfo: {
        type: 'object',
        description: 'DE: Informationen zur API <br/> EN: provides information about the API\n',
        properties: {
          apiSpecificationVersion: {
            type: 'string',
            description:
              'DE: Die aktuell verwendete Version der API Spezifikation <br/> EN: The currently used version of the API specification\n'
          }
        }
      },
      SimpleErrorResponse: {
        type: 'object',
        description: 'Default error response',
        required: ['error', 'error_description'],
        properties: {
          error: {
            type: 'string',
            description: 'Headline of the error response'
          },
          error_description: {
            type: 'string',
            description: 'Detailed description of the error'
          }
        }
      },
      SimpleLiability: {
        type: 'object',
        description:
          'DE: Verbindlichkeit mit minimalen Informationen. Pro Type kann nur eine Verbindlichkeit angelegt werden. Wird mehr als eine Verbindlichkeit pro Type übergeben, werden diese im Backend zu einer pro Type zusammengefasst. <br/> EN: Simple liability. Only one simple liability can be created per type. If more than one simple liabilities are sent with the same type, they will be combined into one per type in the backend.\n',
        required: ['type'],
        properties: {
          type: {
            description:
              'DE: Art der Verbindlichkeit (\n    GUARANTEE=Bürgschaftsverpflichtung,\n    OTHER=Sonstige Verbindlichkeit)<br/>\nEN: type of liability\n',
            type: 'string',
            enum: ['GUARANTEE', 'OTHER']
          },
          amount: {
            description: 'DE: Betrag der Verbindlichkeit. <br/> EN: Guaranteed amount.\n',
            allOf: [
              {
                $ref: '#/components/schemas/PositiveEuroAmount'
              }
            ]
          }
        }
      },
      SpecialAttribute: {
        type: 'string',
        description:
          'DE: Besonderheiten des Objekts. Mögliche Werte sind LUXURY (=Luxusobjekt), FARM (=Bauernhof), HOLIDAY_PROPERTY (=Ferienimmobilie), MONUMENT_PROTECTION (=Denkmalschutz), MICRO_APARTMENT (=Micro-Apartment, nur für Eigentumswohnungen), TINY_HOUSE (=Tiny-House, nur für Einfamilienhaus), CARE_PROPERTY (=Betreutes Wohnen, nur für Eigentumswohnungen) und RETIREMENT_RESIDENCE (=Seniorenresidenz, nur für Eigentumswohnungen). <br/> EN: special attributes characterising the estate. Possible values are LUXURY, FARM, HOLIDAY_PROPERTY, MONUMENT_PROTECTION, MICRO_APARTMENT (only for estates of type APARTMENT), TINY_HOUSE (only for estates of type DETACHED_HOUSE), CARE_PROPERTY (only for estates of type APARTMENT), and RETIREMENT_RESIDENCE (only for estates of type APARTMENT).\n',
        enum: [
          'LUXURY',
          'FARM',
          'HOLIDAY_PROPERTY',
          'MONUMENT_PROTECTION',
          'MICRO_APARTMENT',
          'TINY_HOUSE',
          'CARE_PROPERTY',
          'RETIREMENT_RESIDENCE'
        ]
      },
      SpecialAttributesAcquisition: {
        type: 'string',
        description:
          'DE: Besonderheiten beim Erwerb<br/> EN: type of special attribute for acquisition\n',
        enum: ['SEPERATED_ACCORDING_WEG', 'FAMILY_SALE', 'FRACTIONAL_OWNERSHIP']
      },
      SpecialProperty: {
        type: 'object',
        required: ['property'],
        description:
          'DE: Sondereigentum. Nur relevant, wenn Sondereigentumstyp vorhanden ist.<br/> EN: special property which might be included in the department one of the land registry. Only relevant if type of special property is present.\n',
        properties: {
          property: {
            type: 'string',
            description:
              'DE: Sondereigentumstyp: BASEMENT = Kellerraum, BASEMENT_HOBBY_ROOM = Hobbykeller, DRY_ROOM = Trockenraum, ATTIC = Dachspeicher, OFFICE = Büro, FLAT = Wohnung, ALL = sämtlichen Räumen, GARAGE = Garage, PARKINGSPACE = Stellplatz, UNDERGROUND_GARAGE = Tiefgaragenstellplatz, DUPLEX_GARAGE = Duplex-Parker, PLOT_OF_LAND = Grundstück, END_TERRACE_HOUSE = Reiheneckhaus, MID_TERRACE_HOUSE = Reihenmittelhaus, SEMI_DETACHED_HOUSE = Doppelhaushälfte <br/> EN: special property details\n',
            enum: [
              'BASEMENT',
              'BASEMENT_HOBBY_ROOM',
              'DRY_ROOM',
              'ATTIC',
              'OFFICE',
              'FLAT',
              'ALL',
              'GARAGE',
              'PARKINGSPACE',
              'UNDERGROUND_GARAGE',
              'DUPLEX_GARAGE',
              'PLOT_OF_LAND',
              'END_TERRACE_HOUSE',
              'MID_TERRACE_HOUSE',
              'SEMI_DETACHED_HOUSE'
            ]
          },
          number: {
            type: 'string',
            maxLength: 32,
            description:
              'DE: Fortlaufende Nummerierung der Sondernutzungsrechte im Grundbuch<br/> EN: Sequence of special property\n'
          }
        }
      },
      TaxableIncome: {
        type: 'object',
        required: ['year', 'taxableIncome'],
        description: 'DE: Zu versteuerndes Einkommen<br/> EN: Taxable income.\n',
        properties: {
          year: {
            description:
              'DE: Jahr. Muss in der Vergangenheit liegen.<br/> EN: Year. Must be in the past.\n',
            example: 2020,
            nullable: false,
            allOf: [
              {
                $ref: '#/components/schemas/Year'
              }
            ]
          },
          taxableIncome: {
            description: 'DE: Zu versteuerndes Einkommen.<br/> EN: Taxable income.\n',
            nullable: false,
            allOf: [
              {
                $ref: '#/components/schemas/PositiveEuroAmount'
              }
            ]
          }
        }
      },
      TerminationDetails: {
        type: 'string',
        maxLength: 2000,
        description:
          'DE: Zusätzlicher Begründungstext, wenn Grund OTHER angegeben wurde.<br/> EN: Additional text, if reason OTHER was given.\n'
      },
      TerminationReason: {
        type: 'string',
        description:
          'DE: Grund der Beendigung:<br/>\n    PROCESS_DURATION = Dauer des Antragsprozesses (nur bei Abbruch durch Kunde oder Vermittler),<br/>\n    MISSING_REACTION_CUSTOMER = fehlende Kundenreaktion (nur bei Abbruch durch Kunde oder Vermittler),<br/>\n    ESTATE_LOST = Objekt hat sich zerschlagen - Kunde sucht nicht weiter (nur bei Abbruch durch Kunde oder Vermittler),<br>\n    SPECIAL_STRUCTURE = spezielle Finanzierungsstruktur (nur bei Abbruch durch Kunde oder Vermittler),<br/>\n    DOCUMENT_SCOPE = Umfang der Unterlagen (nur bei Abbruch durch Kunde oder Vermittler),<br/>\n    DURATION_SELFEMPLOYMENT = Dauer der Selbständigkeit (nur bei Ablehnung durch uns),<br/>\n    MISSING_REACTION_BROKER = fehlende Reaktion des Vermittlers (nur bei Ablehnung durch uns),<br/>\n    OVERALL_CONSTELLATION = Gesamtkonstellation (nur bei Ablehnung durch uns),<br/>\n    NEGATIVE_HOUSEHOLD_CALCULATION = negative Haushaltsrechnung (nur bei Ablehnung durch uns),<br/>\n    NEGATIVE_CREDIT_HISTORY = negative Kredithistorie (nur bei Ablehnung durch uns),<br/>\n    NEGATIVE_SCHUFA = negative Schufa (nur bei Ablehnung durch uns),<br/>\n    NEGATIV_CAPITAL = Negativkapital in der Bilanz (nur bei Ablehnung durch uns),<br/>\n    ESTATE_VALUATION_BLA = Objektbewertung / BLA (nur bei Ablehnung durch uns),<br/>\n    PROBATION = Probezeit (nur bei Ablehnung durch uns),<br/>\n    OTHER = Sonstiges.<br/>\nEN: Reason for the termination:<br/>\n    PROCESS_DURATION = Duration of the process (only if cancellation by customer or broker),<br/>\n    MISSING_REACTION_CUSTOMER = missing reaction from customer (only if cancellation by customer or broker),<br/>\n    ESTATE_LOST = Estate could not be obtained - customer does not keep searching (only if cancellation by customer or broker),<br/>\n    SPECIAL_STRUCTURE = special financing structure (only if cancellation by customer or broker),<br/>\n    DOCUMENT_SCOPE = Scope of the documents to provide (only if cancellation by customer or broker),<br/>\n    DURATION_SELFEMPLOYMENT = duration of self-employment (only if rejection by us),<br/>\n    MISSING_REACTION_BROKER = missing reaction from broker (only if rejection by us),<br/>\n    OVERALL_CONSTELLATION = overall constellation (only if rejection by us),<br/>\n    NEGATIVE_HOUSEHOLD_CALCULATION = negative household-calculation (only if rejection by us),<br/>\n    NEGATIVE_CREDIT_HISTORY = negative credit history (only if rejection by us),<br/>\n    NEGATIVE_SCHUFA = negative Schufa (only if rejection by us),<br/>\n    NEGATIV_CAPITAL = negative capital in the balance sheet (only if rejection by us),<br/>\n    ESTATE_VALUATION_BLA = estate valuation / loan quota (only if rejection by us),<br/>\n    PROBATION = probation (only if rejection by us),<br/>\n    OTHER = other.\n',
        enum: [
          'PROCESS_DURATION',
          'MISSING_REACTION_CUSTOMER',
          'ESTATE_LOST',
          'SPECIAL_STRUCTURE',
          'DOCUMENT_SCOPE',
          'DURATION_SELFEMPLOYMENT',
          'MISSING_REACTION_BROKER',
          'OVERALL_CONSTELLATION',
          'NEGATIVE_HOUSEHOLD_CALCULATION',
          'NEGATIVE_CREDIT_HISTORY',
          'NEGATIVE_SCHUFA',
          'NEGATIV_CAPITAL',
          'ESTATE_VALUATION_BLA',
          'PROBATION',
          'OTHER'
        ]
      },
      TerminationType: {
        type: 'string',
        description:
          'DE: Art bzw. Veranlassung der Beendigung. CUSTOMER_CANCEL = Abbruch durch Kunde, BROKER_CANCEL = Abbruch durch Vermittler, REJECT_BY_US = Ablehnung durch uns (Interne Entscheidung).<br/> EN: Type/causer of the termination. CUSTOMER_CANCEL = cancellation by customer, BROKER_CANCEL = cancellation by broker, REJECT_BY_US = rejection by us (internal decision).\n',
        enum: ['CUSTOMER_CANCEL', 'BROKER_CANCEL', 'REJECT_BY_US']
      },
      ThirdPartyDebtor: {
        type: 'object',
        description:
          'DE: Ein Darlehensnehmer, der nicht als Person des Intents erfasst ist.<br/> EN: A debtor who is a person of the intent.\n',
        properties: {
          gender: {
            type: 'string',
            description: 'DE: Geschlecht der Person <br/> EN: gender of the person\n',
            enum: ['M', 'F', 'D'],
            nullable: false
          },
          title: {
            type: 'string',
            description:
              'DE: Akademischer Titel der Person <br/> EN: academic title of the person\n',
            enum: ['DR', 'PH_D', 'PD_DR', 'PROF', 'PROF_DR']
          },
          firstName: {
            type: 'string',
            maxLength: 100,
            description: 'DE: Vorname des Darlehensnehmers. <br/> EN: First name of the debtor.\n',
            nullable: false
          },
          lastName: {
            type: 'string',
            maxLength: 100,
            description: 'DE: Nachname des Darlehensnehmers. <br/> EN: Last name of the debtor.\n',
            nullable: false
          },
          birthDate: {
            description:
              'DE: Geburtsdatum des Darlehensnehmers. Das Datum muss in der Vergangenheit liegen.<br/>\nEN: Date of birth of the debtor. The date must be in the past.\n',
            allOf: [
              {
                $ref: '#/components/schemas/ISODate'
              }
            ]
          },
          address: {
            description:
              'DE: Die (postalische) Adresse des Darlehensnehmers.<br/> EN: The postal address of the debtor.\n',
            allOf: [
              {
                $ref: '#/components/schemas/CommonAddress'
              }
            ],
            nullable: false
          }
        },
        allOf: [
          {
            $ref: '#/components/schemas/Debtor'
          }
        ]
      },
      UnavailableEquity: {
        type: 'object',
        required: ['investmentType', 'investmentAmount', 'reason'],
        description:
          'DE: Information zur Zwischenfinanzierung in Zusammenhang mit nicht verfügbaren Eigenkapital. <br/> EN: Bridging Debt associated with unavailable equity\n',
        properties: {
          investmentType: {
            description:
              'DE: Art der Kapitalbeteiligung. <br/> EN: Type of the equity investment.\n',
            type: 'string',
            maxLength: 500
          },
          investmentCompany: {
            description:
              'DE: Unternehmen in welches das Kapital investiert wurde. <br/> EN: Company in which the equity is invested.\n',
            type: 'string',
            maxLength: 100
          },
          investmentAmount: {
            description: 'DE: Investionsbetrag. <br/> EN: Investment amount.\n',
            allOf: [
              {
                $ref: '#/components/schemas/EuroAmount'
              }
            ]
          }
        },
        allOf: [
          {
            $ref: '#/components/schemas/BridgingLoan'
          }
        ]
      },
      UnionInfo: {
        type: 'object',
        description:
          'DE: Informationen zu Verbands- bzw. Gewerkschaftszugehörigkeit EN: Information regarding union membership\n',
        properties: {
          organisation: {
            type: 'string',
            pattern: '[A-Z_]{3,10}',
            description:
              'DE: Gewerkschafts-Verband<br/>\n    ver.di = VERDI \n    IG BAU = IG_BAU \n    NGG = NGG \n    DBB = dbb\n    DBWV = DBwV \n    THW_NRW = THW (NRW)\n    OTHER = Sonstige Gewerkschaftsverbände\nEN: Trade union organisation\n',
            'x-extensible-enum': ['VERDI', 'IG_BAU', 'NGG', 'DBB', 'DBWV', 'THW_NRW', 'OTHER']
          },
          singleUnion: {
            type: 'string',
            pattern: '[A-Z_]{3,10}',
            description:
              'DE: Einzelgewerkschaft (nur wenn organisation = DBB)<br/>\n    BBB = Bayrischer Beamtenbund (BBB)\n    BBW = BBW Beamtenbund und Tarifunion \n    BDZ = BDZ Deutsche Zoll- und Finanzgewerkschaft \n    BBH = Berufsverband der Bayerischen Hygieneinspektoren (BBH)\n    BTE = BTE- Gewerkschaft Mess- und Eichwesen\n    BSBD = Bund der Strafvollzugsbediensteten Deutschlands (BSBD)\n    BDF = Bund Deutscher Forstleute (BDF)\n    BDR = Bund Deutscher Rechtspfleger (BDR)\n    BVOGD = Bundesverband der Ärztinnen und Ärzte des Öffentlichen Gesundheitsdienstes (BVÖGD)\n    BLBS = Bundesverband der Lehrerinnen und Lehrer an beruflichen Schulen (BLBS)\n    VLW = Bundesverband der Lehrerinnen und Lehrer an Wirtschaftsschulen (VLW)\n    BVLB = Bundesverband der Lehrkräfte für Berufsbildung (BvLB)\n    DBB_BE = dbb beamtenbund und tarifunion berlin \n    DBB_BB = dbb beamtenbund und tarifunion landesbund brandenburg\n    DBB_HB = dbb beamtenbund und tarifunion landesbund bremen \n    DBB_HE = dbb beamtenbund und tarifunion Landesbund Hessen\n    DBB_MV = dbb beamtenbund und tarifunion landesbund mecklenburg-vorprommern\n    DBB_RP = dbb beamtenbund und tarifunion landesbund rheinland-pfalz\n    DBB_SH = dbb beamtenbund und tarifunion landesbund schleswig-holstein\n    DBB_SL = dbb beamtenbund und tarifunion saar\n    DBB_ST = dbb beamtenbund und tarifunion sachsen-anhalt \n    DBB_F = dbb bundesfrauenvertretung dbbf \n    DBB_S = dbb bundesseniorenvertretung \n    DBB_HH = dbb hamburg beamtenbund und tarifunion \n    DBB_J = dbb jugend \n    DBB_NW = DBB NRW Beamtenbund und Tarifunion Nordrhein-Westfalen \n    DJG = Deutsche Justiz-Gewerkschaft (DJG) \n    DPOLG = Deutsche Polizeigewerkschaft (DPolG) \n    DSTG = Deutsche Steuer-Gewerkschaft (DSTG) \n    DVG = Deutsche Verwaltungs-Gewerkschaft (DVG) \n    DAAV = Deutscher Amtsanwaltsverein (DAAV) \n    DBSH = Deutscher Berufsverband für Soziale Arbeit (DBSH) \n    DGVB = Deutscher Gerichtsvollzieher Bund (DGVB) \n    DPHV = Deutscher Philologenverband (DPhV) \n    DRB = Deutscher Richterbund (DRB) \n    VDSTR = Fachgewerkschaft der Straßen- und Verkehrsbeschäftigten VDStra.\n    FKA_NW = Fachverband der angestellten und beamteten Deutschen Krankenhausapotheker NW\n    FLK_NW = Fachverband der Bediensteten der Landwirtschaftskammer NRW \n    FG_BW = Fachverband Gesundheitswesen Baden-Württemberg (FVG) \n    FWSV = Fachverband Wasser- und Schifffahrtsverwaltung (FWSV) \n    GE_NI = Gesundheitsgewerkschaft Niedersachsen GeNi \n    GDS = Gewerkschaft der Sozialversicherung (Gds)\n    GDV = Gewerkschaft der Sozialverwaltung (GdV) \n    GDL = Gewerkschaft Deutscher Lokomotivführer (GDL) \n    GKL_BE = Gewerkschaft kommunaler Landesdienst Berlin in der Komba (glk) Gewerkschaft\n    BTB = Gewerkschaft Technik und Naturwissenschaft (BTB) \n    KEG = Katholische Erziehergemeinschaft Deutschlands (KEG) \n    KOMBA = komba gewerkschaft \n    DBVKOM = Kommunikationsgewerkschaft DPV (DPVKOM) \n    LBB = LBB Gewerkschaft für das Gesundheitswesen in Bayern \n    MA_DBB = Mitarbeiter (dbb, Landesbund, dbb-Einzelgewerkschaft, wirtschaftliche Einrichtung dbb) \n    NBB = NBB Niedersächsischer Beamtenbund und Tarifunion \n    SBB = SBB Beamtenbund und Tarifunion Sachsen \n    TBB = tbb beamtenbund und tarifunion Thüringen \n    VDB = VdB Bundesbankgewerkschaft \n    VDL = VDL Berufsverband Agrar, Ernährung, Umwelt \n    VBE = Verband Bildung und Erziehung (VBE) \n    VAB = Verband der Arbeitnehmer der Bundeswehr (VAB) \n    VBB = Verband der Beamten der Bundeswehr (VBB) \n    VBOB = Verband der Beschäftigten der obersten und oberen Bundesbehörden (VBOB) \n    VBRG = Verband der Beschäftigten des Gewerblichen Rechtsschutzes (VBGR) \n    VDR = Verband Deutscher Realschullehrer (VDR) \n    VHW = Verband Hochschule und Wissenschaft (vhw) \n    VRB = Verein der Rechtspfleger im Bundesdienst (VRB) \n    VBBA = vereinigung der beschäftigten der berufs- und arbeitsmarktdienstleister (vbba) \n    VRFF = VRFF - Die Mediengewerkschaft \n    OTHER = sonstige nicht aufgeführte\nEN: single union (only when organisation = DBB\n',
            'x-extensible-enum': [
              'BBB',
              'BBW',
              'BDZ',
              'BBH',
              'BTE',
              'BSBD',
              'BDF',
              'BDR',
              'BVOGD',
              'BLBS',
              'VLW',
              'BVLB',
              'DBB_BE',
              'DBB_BB',
              'DBB_HB',
              'DBB_HE',
              'DBB_MV',
              'DBB_RP',
              'DBB_SH',
              'DBB_SL',
              'DBB_ST',
              'DBB_F',
              'DBB_S',
              'DBB_HH',
              'DBB_J',
              'DBB_NW',
              'DJG',
              'DPOLG',
              'DSTG',
              'DVG',
              'DAAV',
              'DBSH',
              'DGVB',
              'DPHV',
              'DRB',
              'VDSTR',
              'FKA_NW',
              'FLK_NW',
              'FG_BW',
              'FWSV',
              'GE_NI',
              'GDS',
              'GDV',
              'GDL',
              'GKL_BE',
              'BTB',
              'KEG',
              'KOMBA',
              'DBVKOM',
              'LBB',
              'MA_DBB',
              'NBB',
              'SBB',
              'TBB',
              'VDB',
              'VDL',
              'VBE',
              'VAB',
              'VBB',
              'VBOB',
              'VBRG',
              'VDR',
              'VHW',
              'VRB',
              'VBBA',
              'VRFF',
              'OTHER'
            ]
          },
          membershipId: {
            type: 'string',
            maxLength: 100,
            description:
              'DE: Mitgliedsnummer in der Gewerkschaft. EN: membership id for the union.\n'
          }
        }
      },
      UnitGroup: {
        type: 'object',
        description:
          'DE: Gruppe von Einheiten. Einheiten gleicher Nutzung und gleichen Typs können zusammen erfasst werden<br/> EN: Group of units. Units with same usage and type can be entered aggregated.\n',
        required: ['unitGroupId', 'type', 'usage'],
        properties: {
          unitGroupId: {
            type: 'string',
            format: 'uuid',
            description: 'DE: technische ID der Gruppe<br/> EN: technical ID of the unit group\n'
          },
          numberOfUnitsInGroup: {
            type: 'number',
            minimum: 0,
            maximum: 100000,
            description:
              'DE: Anzahl der Einheiten in dieser Gruppe<br/> EN: unit count for this group\n'
          },
          type: {
            type: 'string',
            nullable: false,
            enum: ['RESIDENTIAL', 'COMMERCIAL'],
            description:
              'DE: Nutzungsart dieser Gruppe<br/> EN: usage of this unit group, for business purpose or residential\n'
          },
          usage: {
            type: 'string',
            nullable: false,
            enum: ['SELF', 'RENT'],
            description:
              'DE: Nutzung der Gruppe (SELF=Eigennutzung oder RENT=vermieten)<br/> EN: Usage of this group\n'
          },
          area: {
            type: 'number',
            minimum: 0,
            maximum: 100000,
            description:
              'DE: Gesamtfläche aller Einheiten in dieser Gruppe<br/> EN: Total area of the units in this group\n'
          },
          vacantArea: {
            type: 'number',
            minimum: 0,
            maximum: 100000,
            description: 'DE: davon leer stehende Fläche<br/> EN: area not rented\n'
          },
          smallestArea: {
            type: 'number',
            minimum: 0,
            maximum: 100000,
            description:
              'DE: Fläche der kleinsten Einheit in dieser Gruppe<br/> EN: area of the smallest unit in this group\n'
          },
          commerceType: {
            type: 'string',
            description: 'DE: Gewerbetyp<br/> EN: typisation of commerce\n',
            enum: [
              'RETAIL_STORE',
              'DOCTORS_OFFICE',
              'REGULAR_OFFICE',
              'WORKSHOP_OR_GARAGE',
              'WAREHOUSE',
              'GASTRONOMY',
              'HOTEL_OR_PENSION',
              'VIDEO_OR_GAMEROOM',
              'NIGHT_SPOT',
              'RED_LIGHT',
              'GAS_STATION',
              'BETTING_OFFICE',
              'TANNING_OR_FITNESS',
              'TAXI_COMPANY',
              'TRANSPORT_BUSINESS',
              'CONSTRUCTION_INDUSTRY',
              'HAIRDRESSER',
              'OTHER'
            ]
          }
        },
        discriminator: {
          propertyName: 'usage',
          mapping: {
            SELF: '#/components/schemas/OwnerUnitGroup',
            RENT: '#/components/schemas/RentalUnitGroup'
          }
        }
      },
      VariableIncome: {
        type: 'object',
        description:
          'DE: eine variable Einkunft. Nur relevant, wenn Betrag vorhanden ist.<br/> EN: a variable income. Only relevant if amount is present.\n',
        properties: {
          amount: {
            description:
              'DE: Betrag der variablen Einkünfte im Jahr<br/> EN: Variable income amount per year\n',
            allOf: [
              {
                $ref: '#/components/schemas/PositivePeriodicalEuroAmount'
              }
            ]
          },
          type: {
            description:
              'DE: Art des variablen Einkommens (ABROAD_PREMIUM=Auslandszuschlag, PROFIT_SHARING=Gewinnbeteiligung, COMMISSIONS=Provisionen, SHIFT_PREMIUMS=Schichtzulage, OVERTIME=Überstundenzulage, BONUS_PREMIUMS=Bonus, TRAVEL_ALLOWANCE=Reisezuschlag, OTHER=Sonstige)<br/> EN: Type of variable income\n',
            type: 'string',
            enum: [
              'ABROAD_PREMIUM',
              'PROFIT_SHARING',
              'COMMISSIONS',
              'SHIFT_PREMIUMS',
              'OVERTIME',
              'BONUS_PREMIUMS',
              'TRAVEL_ALLOWANCE',
              'OTHER'
            ]
          }
        }
      },
      Variant: {
        type: 'object',
        description:
          'DE: Personen und Immobilien Kombinationen mit denen die Finanzierung berechnet wird<br/> EN: combination of persons and estates to calculate the mortgage for\n',
        readOnly: true,
        required: ['variantId'],
        properties: {
          variantId: {
            type: 'string',
            maxLength: 24,
            description:
              'DE: ID der Variante aus dem Variant-Service<br/> EN: technical ID from variant-service\n'
          },
          name: {
            type: 'string',
            maxLength: 1000,
            description: 'DE: Name der Variante<br/> EN: name of the variant\n'
          },
          estateIds: {
            type: 'array',
            nullable: false,
            description:
              'DE: Liste der estate IDs die zu der Variante gehören<br/> EN: List of estate IDs belonging to the variant\n',
            items: {
              type: 'string'
            }
          },
          personIds: {
            type: 'array',
            nullable: false,
            description:
              'DE: Liste der Personen IDs die zu der Variante gehören<br/> EN: List of person IDs belonging to the variant\n',
            items: {
              type: 'string'
            }
          }
        }
      },
      Violation: {
        description: 'Description of the invalid field value',
        type: 'object',
        title: 'Violation',
        properties: {
          field: {
            type: 'string',
            description: 'Invalid field name'
          },
          message: {
            type: 'string',
            description: 'Description of the invalid field value',
            example: 'must be greater than or equal to 0'
          }
        }
      },
      Year: {
        type: 'object',
        title: 'Year',
        description:
          'DE: Jahr nach ISO-8601-Kalendersystem, z.B. 2007. EN: A year in the ISO-8601 calendar system, such as 2007.\n',
        required: ['value'],
        properties: {
          value: {
            type: 'string',
            pattern: '^(1|2)([0-9]{3})$',
            example: 2019
          }
        }
      }
    }
  }
};
