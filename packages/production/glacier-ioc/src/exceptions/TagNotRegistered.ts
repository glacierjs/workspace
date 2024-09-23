export class TagNotRegistered extends Error {
  public constructor(tag: symbol) {
    super(`Tag ${tag.toString()} is not registered`);
  }
}
