import {
  abortVar,
  action,
  atom,
  AtomLike,
  computed,
  effect,
  withSessionStorage,
} from '@reatom/core';
import { useAction, useAtom } from '@reatom/react';
import { useEffect } from 'react';

import { navigateToAction, routerAtom } from '##/modules/router';
import { standIdAtom } from '##/modules/stand';
import { htmlModsActionAdd } from '##/modules/theme';

import {
  optionsWithUndefined,
  propIsEqual,
  valueWithUndefined,
} from './helpers';
import { Knob, Value, Variant, VariantType, VariantWithId } from './types';

export type VariantsAtomState = Record<string, VariantWithId>;

export const variantsAtom = atom<VariantsAtomState>({}).extend(
  withSessionStorage('variantsAtom'),
);

export const variantsActionSetActive = action(
  ({ id, isActive }: { id: string; isActive: boolean }) => {
    const state = variantsAtom();

    if (id in state && state[id].isActive !== isActive) {
      variantsAtom.set({ ...state, [id]: { ...state[id], isActive } });
    }
  },
);

export const variantsActionSet = action((payload: Variant) => {
  const state = variantsAtom();
  const standId = standIdAtom();

  const id = `${standId}-${payload.name}`;

  if (!(id in state)) {
    variantsAtom.set({ ...state, [id]: { ...payload, id } });
  }

  if (
    !propIsEqual(state[id], payload, 'isActive') ||
    !propIsEqual(state[id], payload, 'value')
  ) {
    variantsAtom.set({ ...state, [id]: { ...payload, id } });
  }
});

export const variantsActionDel = action((id: string) => {
  const state = variantsAtom();

  if (id in state) {
    const newState = { ...state };
    delete newState[id];
    variantsAtom.set(newState);
  }
});

export const variantsActionSetState = action((payload: VariantsAtomState) =>
  variantsAtom.set(payload),
);

export const variantsActionClear = action(() => variantsAtom.set({}));

export const variantsNamesAtom = computed(() => {
  const variants = variantsAtom();
  const standId = standIdAtom();

  return Object.keys(variants).filter((id) => id.indexOf(standId) >= 0);
});

export const variantsIsFullScreen = computed(() => {
  const router = routerAtom();
  return Boolean(router.route?.params.variants);
});

export const variantsToggleFullScreen = action(() => {
  const isFullScreen = variantsIsFullScreen();
  const { route } = routerAtom();

  if (!route) {
    return;
  }

  if (isFullScreen) {
    window.history.back();
  } else {
    navigateToAction({
      name: route.name,
      params: { ...route.params, variants: true },
    });
  }
});

variantsIsFullScreen.subscribe((isFullScreen) =>
  htmlModsActionAdd({ noScroll: isFullScreen }),
);

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

export const knob = <
  TYPE extends VariantType = VariantType,
  OPTION extends string | number = string,
>(
  knob: Knob<TYPE, OPTION>,
) => {
  const idAtom = computed(() => `${standIdAtom()}-${knob.name}`);
  const isActiveAtom = computed(() => (knob.isActive ? knob.isActive() : true));

  const valueAtom = computed(() => {
    const variants = variantsAtom();
    if (variants[idAtom()] && variants[idAtom()].isActive) {
      return variants[idAtom()].value;
    }
  });

  effect(() => {
    variantsActionSet({
      ...knob,
      id: idAtom(),
      isActive: isActiveAtom(),
    } as VariantWithId);
  });

  abortVar.subscribe(() => variantsActionDel(idAtom()));

  return valueAtom as AtomLike<Value<TYPE, OPTION>>;
};

export const knobSelect = <OPTION extends string | number>(
  name: string,
  options: OPTION[] | readonly OPTION[],
  value: OPTION | undefined = undefined,
  isActive?: AtomLike<boolean>,
) => {
  const isInitValueUndefined = typeof value === 'undefined';
  const optionsPrepare = isInitValueUndefined
    ? optionsWithUndefined(options)
    : options;

  const valueKnobAtom = knob({
    type: 'select',
    name,
    options: optionsPrepare,
    value,
    isActive,
  });

  return computed(() => {
    const valueKnob = valueKnobAtom();
    isInitValueUndefined
      ? valueWithUndefined(valueKnob)
      : (valueKnob as Exclude<OPTION, 'undefined'>);
  });
};

export const knobBoolean = (
  name: string,
  value: boolean = false,
  isActive?: AtomLike<boolean>,
) => knob({ type: 'boolean', name, value, isActive });

export const knobText = (
  name: string,
  value: string = '',
  isActive?: AtomLike<boolean>,
) => knob({ type: 'text', name, value, isActive });

export const knobDate = (
  name: string,
  value: Date = new Date(),
  isActive?: AtomLike<boolean>,
) => {
  const knobValue = knob({ type: 'date', name, value, isActive });
  return computed(() => {
    const value = knobValue();
    return typeof value === 'string' ? new Date(value) : value;
  });
};

export const knobDateTime = (
  name: string,
  value: Date = new Date(),
  isActive?: AtomLike<boolean>,
) => {
  const knobValue = knob({ type: 'date-time', name, value, isActive });
  return computed(() => {
    const value = knobValue();
    return typeof value === 'string' ? new Date(value) : value;
  });
};

export const knobNumber = (
  name: string,
  value: number = 0,
  isActive?: AtomLike<boolean>,
) => knob({ type: 'number', name, value, isActive });
