export type Environment<T> = {
  [K in keyof T]: string;
};
