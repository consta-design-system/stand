import { action, atom } from '@reatom/core';
import { useAction, useAtom } from '@reatom/npm-react';
import { useEffect } from 'react';

export type VariantType =
  | 'select'
  | 'boolean'
  | 'text'
  | 'date'
  | 'date-time'
  | 'number';

type Value<TYPE extends VariantType, OPTION extends string | number> =
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

export type Variant<
  TYPE extends VariantType = VariantType,
  OPTION extends string | number = string,
> = {
  type: TYPE;
  name: string;
  value: Value<TYPE, OPTION>;
  options?: OPTION[] | readonly OPTION[];
  isActive: boolean;
};

type WithUndefindValue = <T extends unknown>(
  value: T,
) => Exclude<T, 'undefined'> | undefined;

const valueWithUndefined: WithUndefindValue = (value) => {
  return value !== 'undefined'
    ? (value as Exclude<typeof value, 'undefined'>)
    : undefined;
};

type OptionsWithUndefined = <T extends unknown>(
  value: readonly T[] | T[],
) => Array<T | 'undefined'>;

const optionsWithUndefined: OptionsWithUndefined = (options) => {
  return ['undefined', ...options];
};

export type VariantsAtomState = Record<string, Variant>;

const propIsEqual = <T extends Object>(
  variantOld: T,
  variantNew: T,
  prop: keyof T,
) => variantOld?.[prop] === variantNew?.[prop];

export const variantsAtom = atom<VariantsAtomState>({});

export const variantsActionSetActive = action(
  (ctx, { name, isActive }: { name: string; isActive: boolean }) => {
    const state = ctx.get(variantsAtom);

    if (name in state && state[name].isActive !== isActive) {
      variantsAtom(ctx, { ...state, [name]: { ...state[name], isActive } });
    }
  },
);

export const variantsActionSet = action((ctx, payload: Variant) => {
  const state = ctx.get(variantsAtom);

  if (!(payload.name in state)) {
    variantsAtom(ctx, { ...state, [payload.name]: payload });
  }

  if (
    !propIsEqual(state[payload.name], payload, 'isActive') ||
    !propIsEqual(state[payload.name], payload, 'value')
  ) {
    variantsAtom(ctx, { ...state, [payload.name]: payload });
  }
});

export const variantsActionDel = action((ctx, payload: string) => {
  const state = ctx.get(variantsAtom);

  if (payload in state) {
    const newState = { ...state };
    delete newState[payload];
    variantsAtom(ctx, newState);
  }
});

export const variantsActionSetState = action(
  (ctx, payload: VariantsAtomState) => variantsAtom(ctx, payload),
);

export const variantsActionClear = action((ctx) => variantsAtom(ctx, {}));

export const variantsNamesAtom = atom((ctx) => {
  const variants = ctx.spy(variantsAtom);

  return Object.keys(variants);
});

export const useVariant = <
  TYPE extends VariantType = VariantType,
  OPTION extends string | number = string,
>(
  variant: Variant<TYPE, OPTION>,
) => {
  const [variants] = useAtom(variantsAtom);
  const set = useAction(variantsActionSet);
  const setActive = useAction(variantsActionSetActive);
  const del = useAction(variantsActionDel);

  useEffect(() => {
    set(variant as Variant);
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
) => useVariant({ type: 'boolean', name, value, isActive }) || false;

export const useSelect = <OPTION extends string | number>(
  name: string,
  options: OPTION[] | readonly OPTION[],
  value: OPTION | undefined = undefined,
  isActive: boolean = true,
) => {
  const isInitValueUndefined = typeof value === 'undefined';

  const optionsPrepare = isInitValueUndefined
    ? optionsWithUndefined(options)
    : options;

  const returnedValue = useVariant({
    type: 'select',
    name,
    value: isInitValueUndefined ? 'undefined' : value,
    options: optionsPrepare,
    isActive,
  });

  return isInitValueUndefined
    ? valueWithUndefined(returnedValue)
    : (returnedValue as Exclude<OPTION, 'undefined'>);
};

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
