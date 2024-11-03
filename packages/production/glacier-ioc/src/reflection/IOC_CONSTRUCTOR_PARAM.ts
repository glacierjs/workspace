import { ReflectionMap } from '@glacier/reflection';
import { ConstructorParamMeta } from '../interfaces/ConstructorParamMeta';

export const IOC_CONSTRUCTOR_PARAM = new ReflectionMap<ConstructorParamMeta>('ioc:constructor');
