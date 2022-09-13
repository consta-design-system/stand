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

type Value<TYPE extends VariantType, OPTION extends string> =
  | (TYPE extends 'boolean'
      ? boolean
      : TYPE extends 'date' | 'date-time'
      ? Date
      : TYPE extends 'number'
      ? number
      : TYPE extends 'select'
      ? OPTION
      : string)
  | undefined;

// type Options<TYPE extends VariantType> = TYPE extends 'select'
//   ? string[] | readonly string[]
//   : never;

export type Variant<
  TYPE extends VariantType = VariantType,
  OPTION extends string = string,
> = {
  type: TYPE;
  name: string;
  value: Value<TYPE, OPTION>;
  options?: TYPE extends 'select' ? (OPTION[] | readonly OPTION[]) : never;
  isActive: boolean;
};

export type VariantsAtomState = Record<string, Variant>;

const propIsEqual = <T extends Object>(
  variantOld: T,
  variantNew: T,
  prop: keyof T,
) => {
  return variantOld[prop] === variantNew[prop];
};

export const variantsAtom = createAtom(
  {
    add: (payload: Variant) => payload,
    set: (payload: Variant) => payload,
    clear: () => {},
    del: (payload: string) => payload,
    setState: (payload: VariantsAtomState) => payload,
    setActive: (payload: { name: string; isActive: boolean }) => payload,
  },
  ({ onAction }, state: VariantsAtomState = {}) => {
    onAction('setActive', ({ name, isActive }) => {
      if (name in state && state[name].isActive !== isActive) {
        state = { ...state, [name]: { ...state[name], isActive } };
      }
    });
    onAction('set', (payload) => {
      if (!(payload.name in state)) {
        state = { ...state, [payload.name]: payload };
      }

      if (
        !propIsEqual(state[payload.name], payload, 'isActive') ||
        !propIsEqual(state[payload.name], payload, 'value')
      ) {
        state = { ...state, [payload.name]: payload };
      }
    });
    onAction('del', (payload) => {
      if (payload in state) {
        const newState = { ...state };
        delete newState[payload];
        state = newState;
      }
    });
    onAction('setState', (payload) => {
      state = payload;
    });
    onAction('clear', () => {
      state = {};
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

      if (newKeys.length !== oldKeys.length) {
        state = newKeys;
      }

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

export const useVariant = <
  TYPE extends VariantType,
  OPTION extends string = string,
>(
  variant: Variant<TYPE>,
) => {
  const [variants, { set, del, setActive }] = useAtom(variantsAtom);

  useEffect(() => {
    set(variant);
    return () => del(variant.name);
  }, []);

  useEffect(() => {
    setActive(variant);
  });

  if (!variant.isActive) {
    return undefined;
  }

  return variants[variant.name]?.value as Value<TYPE, OPTION>;
};

export const useBoolean = (
  name: string,
  value?: boolean,
  isActive: boolean = true,
) => useVariant({ type: 'boolean', name, value, isActive });

export const useSelect = <OPTION extends string>(
  name: string,
  options: OPTION[] | readonly OPTION[],
  value?: OPTION,
  isActive: boolean = true,
) => useVariant({ type: 'select', name, value, options, isActive }) as OPTION;

export const useText = (
  name: string,
  value?: string,
  isActive: boolean = true,
) => useVariant({ type: 'text', name, value, isActive });

export const useDate = (name: string, value?: Date, isActive: boolean = true) =>
  useVariant({ type: 'date', name, value, isActive });

export const useDateTime = (
  name: string,
  value?: Date,
  isActive: boolean = true,
) => useVariant({ type: 'date-time', name, value, isActive });

export const useNumber = (
  name: string,
  value?: number,
  isActive: boolean = true,
) => useVariant({ type: 'number', name, value, isActive });
