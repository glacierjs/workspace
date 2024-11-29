import { Validator } from '@glacier/schema';

import { OpenAPIModel } from '../../src/models/OpenAPI.model';
import { api2Mock } from '../mocks/api2.mock';

it('should validate api 2', () => {
  const validator = new Validator();
  const result = validator.parse(OpenAPIModel, api2Mock);
  expect(result.isValid).toBe(true);
});
