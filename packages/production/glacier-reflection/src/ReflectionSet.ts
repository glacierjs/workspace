import { Reflection } from './Reflection';

export class ReflectionSet<T> {
  private reflection: Reflection<Set<T>>;

  public constructor(key: string) {
    this.reflection = new Reflection(key);
  }

  public add(value: T, target: object, propertyKey?: string | symbol): void {
    const set = this.reflection.get(target, propertyKey) ?? new Set<T>();
    set.add(value);
    this.reflection.set(set, target, propertyKey);
  }

  public has(value: T, target: object, propertyKey?: string | symbol): boolean {
    const set = this.reflection.get(target, propertyKey);
    if (!set) return false;
    return set.has(value);
  }

  public getAll(target: object, propertyKey?: string | symbol): T[] {
    const set = this.reflection.get(target, propertyKey);
    if (!set) return [];
    return [...set.values()];
  }
}
