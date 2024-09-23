import type { Constructor } from '@glacier/types';

export class UnresolvableParam extends Error {
  public constructor(cls: Constructor, param: unknown, paramLocation: number) {
    super(
      `Can not resolve ${paramLocation} parameter of ${cls.name} because it is of type ${typeof param}`
    );
  }
}
