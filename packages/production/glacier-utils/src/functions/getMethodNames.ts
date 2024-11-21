export function getMethodNames(cls: Function): string[] {
  const methods = new Set<string>();
  let currentProto = cls.prototype;

  while (currentProto) {
    Object.getOwnPropertyNames(currentProto)
      .filter((prop) => {
        return typeof cls.prototype[prop] === 'function' && prop !== 'constructor';
      })
      .forEach((prop) => methods.add(prop));

    currentProto = Object.getPrototypeOf(currentProto);
    if (currentProto === Object.prototype) {
      break;
    }
  }

  return [...methods];
}
