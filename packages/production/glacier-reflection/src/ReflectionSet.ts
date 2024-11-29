import { Reflection } from './Reflection';

export class ReflectionSet<T> {
  private reflection: Reflection<Set<T>>;

  public constructor(key: string) {
    this.reflection = new Reflection(key);
  }

  public add(value: T, target: object, propertyKey?: string | symbol): void {
    const set = this.reflection.getOwn(target, propertyKey) ?? new Set<T>();
    set.add(value);
    this.reflection.set(set, target, propertyKey);
  }

  public has(value: T, target: object, propertyKey?: string | symbol): boolean {
    const set = this.getInheritedSet(target, propertyKey);
    return set.has(value);
  }

  public getAll(target: object, propertyKey?: string | symbol): T[] {
    const set = this.getInheritedSet(target, propertyKey);
    return [...set.values()];
  }

  private getInheritedSet(target: object, propertyKey?: string | symbol): Set<T> {
    const mergedSet = new Set<T>();
    let currentPrototype = target;

    while (currentPrototype) {
      const set = this.reflection.getOwn(currentPrototype, propertyKey);
      if (set) {
        set.forEach((value) => mergedSet.add(value));
      }

      currentPrototype = Object.getPrototypeOf(currentPrototype);
      if (currentPrototype === Object.prototype) {
        break;
      }
    }

    return mergedSet;
  }
}
