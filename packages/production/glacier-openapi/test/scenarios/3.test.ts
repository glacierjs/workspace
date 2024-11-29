import type { ValidationSuccessResult } from '@glacier/schema';
import { Validator } from '@glacier/schema';

import { OpenAPIModel } from '../../src/models/OpenAPI.model';
import { api3Mock } from '../mocks/api3.mock';

it('should validate api 3', () => {
  const validator = new Validator();
  const result = validator.parse(OpenAPIModel, api3Mock);
  expect(result.isValid).toBe(true);
  expect((result as ValidationSuccessResult<any>).value).toEqual(api3Mock);
});
