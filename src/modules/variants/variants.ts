import { action, atom } from '@reatom/core';
import { onUpdate } from '@reatom/hooks';
import { useAction, useAtom } from '@reatom/npm-react';
import { withSessionStorage } from '@reatom/persist-web-storage';
import { useEffect } from 'react';
import { navigateToAction, routerAtom } from 'reatom-router5';

import { standIdAtom } from '##/modules/stand';
import { htmlModsActionAdd } from '##/modules/theme';

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

type VariantWithId<
  TYPE extends VariantType = VariantType,
  OPTION extends string | number = string,
> = {
  type: TYPE;
  name: string;
  value: Value<TYPE, OPTION>;
  options?: OPTION[] | readonly OPTION[];
  isActive: boolean;
  id: string;
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

export type VariantsAtomState = Record<string, VariantWithId>;

const propIsEqual = <T extends Object>(
  variantOld: T,
  variantNew: T,
  prop: keyof T,
) => variantOld?.[prop] === variantNew?.[prop];

export const variantsAtom = atom<VariantsAtomState>({}).pipe(
  withSessionStorage('variantsAtom'),
);

export const variantsActionSetActive = action(
  (ctx, { id, isActive }: { id: string; isActive: boolean }) => {
    const state = ctx.get(variantsAtom);

    if (id in state && state[id].isActive !== isActive) {
      variantsAtom(ctx, { ...state, [id]: { ...state[id], isActive } });
    }
  },
);

export const variantsActionSet = action((ctx, payload: Variant) => {
  const state = ctx.get(variantsAtom);
  const standId = ctx.get(standIdAtom);

  const id = `${standId}-${payload.name}`;

  if (!(id in state)) {
    variantsAtom(ctx, { ...state, [id]: { ...payload, id } });
  }

  if (
    !propIsEqual(state[id], payload, 'isActive') ||
    !propIsEqual(state[id], payload, 'value')
  ) {
    variantsAtom(ctx, { ...state, [id]: { ...payload, id } });
  }
});

export const variantsActionDel = action((ctx, id: string) => {
  const state = ctx.get(variantsAtom);

  if (id in state) {
    const newState = { ...state };
    delete newState[id];
    variantsAtom(ctx, newState);
  }
});

export const variantsActionSetState = action(
  (ctx, payload: VariantsAtomState) => variantsAtom(ctx, payload),
);

export const variantsActionClear = action((ctx) => variantsAtom(ctx, {}));

export const variantsNamesAtom = atom((ctx) => {
  const variants = ctx.spy(variantsAtom);
  const standId = ctx.get(standIdAtom);

  return Object.keys(variants).filter((id) => id.indexOf(standId) >= 0);
});

export const variantsIsFullScreen = atom((ctx) => {
  const router = ctx.spy(routerAtom);
  return Boolean(router.route?.params.variants);
});

export const variantsToggleFullScreen = action((ctx) => {
  const isFullScreen = ctx.get(variantsIsFullScreen);
  const { route } = ctx.get(routerAtom);

  if (!route) {
    return;
  }

  if (isFullScreen) {
    window.history.back();
  } else {
    navigateToAction(ctx, {
      name: route.name,
      params: { ...route.params, variants: true },
    });
  }
});

onUpdate(variantsIsFullScreen, (ctx, isFullScreen) => {
  htmlModsActionAdd(ctx, { noScroll: isFullScreen });
});

export const useVariant = <
  TYPE extends VariantType = VariantType,
  OPTION extends string | number = string,
>(
  variant: Variant<TYPE, OPTION>,
) => {
  const [variants] = useAtom(variantsAtom);
  const [standId] = useAtom(standIdAtom);
  const set = useAction(variantsActionSet);
  const setActive = useAction(variantsActionSetActive);
  const del = useAction(variantsActionDel);
  const id = `${standId}-${variant.name}`;

  useEffect(() => {
    set({ ...variant, id } as VariantWithId);
    return () => del(id);
  }, []);

  useEffect(() => {
    setActive({ ...variant, id });
  });

  if (!variant.isActive) {
    return undefined;
  }

  return variants[id]?.value as Value<TYPE, OPTION>;
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

export const useDate = (
  name: string,
  value?: Date,
  isActive: boolean = true,
) => {
  const variantValue = useVariant({ type: 'date', name, value, isActive });
  return typeof variantValue === 'string'
    ? new Date(variantValue)
    : variantValue;
};

export const useDateTime = (
  name: string,
  value?: Date,
  isActive: boolean = true,
) => {
  const variantValue = useVariant({ type: 'date-time', name, value, isActive });
  return typeof variantValue === 'string'
    ? new Date(variantValue)
    : variantValue;
};

export const useNumber = (
  name: string,
  value?: number,
  isActive: boolean = true,
) => useVariant({ type: 'number', name, value, isActive });
