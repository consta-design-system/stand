import { createAtom } from '@reatom/core';
import { useAtom } from '@reatom/react';
import { useEffect } from 'react';

export type VariantType =
  | 'select'
  | 'boolean'
  | 'text'
  | 'date'
  | 'date-time'
  | 'number';

type Value<TYPE extends VariantType> =
  | (TYPE extends 'boolean'
      ? boolean
      : TYPE extends 'date' | 'date-time'
      ? Date
      : TYPE extends 'number'
      ? number
      : string)
  | undefined
  | null;

type Options<TYPE extends VariantType> = TYPE extends 'select'
  ? string[]
  : never;

export type Variant<TYPE extends VariantType = VariantType> = {
  type: TYPE;
  name: string;
  value: Value<TYPE>;
  options?: Options<TYPE>;
};

export const variantsAtom = createAtom(
  {
    add: (payload: Variant) => payload,
    set: (payload: Variant) => payload,
    clear: () => {},
    del: (payload: string) => payload,
  },
  ({ onAction }, state: Record<string, Variant> = {}) => {
    onAction('add', (payload) => {
      if (!(payload.name in state)) {
        state = { ...state, [payload.name]: payload };
      }
    });
    onAction('set', (payload) => {
      state = { ...state, [payload.name]: payload };
    });
    onAction('del', (payload) => {
      if (payload in state) {
        const newState = { ...state };
        delete newState[payload];
        state = newState;
      }
    });
    return state;
  },
);

export const variantsNamesAtom = createAtom(
  { variantsAtom },
  ({ onChange }, state: string[] = []) => {
    onChange('variantsAtom', (newState, oldState = {}) => {
      const newKeys = Object.keys(newState);
      const oldKeys = Object.keys(oldState);

      for (let index = 0; index < newKeys.length; index++) {
        if (newKeys[index] !== oldKeys[index]) {
          state = newKeys;
          break;
        }
        continue;
      }
    });

    return state;
  },
);

export const useVariant = <TYPE extends VariantType>(
  variant: Variant<TYPE>,
) => {
  const [variants, { add, del }] = useAtom(variantsAtom);

  useEffect(() => {
    add(variant);
    return () => del(variant.name);
  }, []);

  return variants[variant.name]?.value as Value<TYPE>;
};

export const useBoolean = (name: string, value?: boolean) =>
  useVariant({ type: 'boolean', name, value });

export const useSelect = (name: string, options: string[], value?: string) =>
  useVariant({ type: 'select', name, value, options });

export const useText = (name: string, value?: string) =>
  useVariant({ type: 'text', name, value });

export const useDate = (name: string, value?: Date) =>
  useVariant({ type: 'date', name, value });

export const useDateTime = (name: string, value?: Date) =>
  useVariant({ type: 'date-time', name, value });

export const useNumber = (name: string, value?: number) =>
  useVariant({ type: 'number', name, value });
