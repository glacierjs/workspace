import type { ValidationSuccessResult } from '@glacier/schema';
import { Validator } from '@glacier/schema';

import { OpenAPIModel } from '../../src/models/OpenAPI.model';
import { api1Mock } from '../mocks/api1.mock';

it('should validate api 1', () => {
  const validator = new Validator();
  const result = validator.parse(OpenAPIModel, api1Mock);
  expect(result.isValid).toBe(true);
  expect((result as ValidationSuccessResult<OpenAPIModel>).value).toEqual(api1Mock);
});
