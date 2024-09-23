export class InvalidRouteMethod extends Error {
  public constructor() {
    super('No route with matching method found.');
    this.name = 'InvalidRouteMethod';
  }
}
