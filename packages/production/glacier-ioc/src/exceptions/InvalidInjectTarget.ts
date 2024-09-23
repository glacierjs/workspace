export class InvalidInjectTarget extends Error {
  public constructor() {
    super('@Inject can only be set on constructor parameter.');
  }
}
