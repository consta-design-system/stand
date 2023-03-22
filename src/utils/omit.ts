interface OmitFn {
  <T extends object, K extends [...(keyof T)[]]>(obj: T, keys: K): {
    [K2 in Exclude<keyof T, K[number]>]: T[K2];
  };
}

export const omit: OmitFn = (obj, keys) => {
  const newObj = { ...obj };
  for (let i = 0; i < keys.length; i += 1) {
    delete newObj[keys[i]];
  }
  return newObj;
};
