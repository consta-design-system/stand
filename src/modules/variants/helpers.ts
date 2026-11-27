type WithUndefinedValue = <T extends unknown>(
  value: T,
) => Exclude<T, 'undefined'> | undefined;

export const valueWithUndefined: WithUndefinedValue = (value) => {
  return value !== 'undefined'
    ? (value as Exclude<typeof value, 'undefined'>)
    : undefined;
};

type OptionsWithUndefined = <T extends unknown>(
  value: readonly T[] | T[],
) => Array<T | 'undefined'>;

export const optionsWithUndefined: OptionsWithUndefined = (options) => {
  return ['undefined', ...options];
};

export const propIsEqual = <T extends Object>(
  variantOld: T,
  variantNew: T,
  prop: keyof T,
) => variantOld?.[prop] === variantNew?.[prop];
