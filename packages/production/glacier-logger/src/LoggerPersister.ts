export abstract class LoggerPersister<T> {
  public abstract persist(message: T): void;
}
