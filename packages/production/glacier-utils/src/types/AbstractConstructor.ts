export type AbstractConstructor<T = unknown> = abstract new (
  ...args: any[]
) => T;
