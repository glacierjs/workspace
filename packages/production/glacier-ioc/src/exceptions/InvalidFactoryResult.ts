export class InvalidFactoryResult extends Error {
  public constructor() {
    super('Factory methods must return a class');
  }
}
