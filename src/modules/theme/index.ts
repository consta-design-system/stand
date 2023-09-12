import { IconComponent } from '@consta/icons/Icon';
import { IconLightningBolt } from '@consta/icons/IconLightningBolt';
import { IconMoon } from '@consta/icons/IconMoon';
import { IconSun } from '@consta/icons/IconSun';
import {
  presetGpnDark,
  presetGpnDefault,
  presetGpnDisplay,
  ThemePreset,
} from '@consta/uikit/Theme';
import { action, atom } from '@reatom/core';
import { onUpdate } from '@reatom/hooks';
import { withLocalStorage } from '@reatom/persist-web-storage';

import { routerAtom, routesNames } from '##/modules/router';

export const themes = [presetGpnDark, presetGpnDefault];
export const variantThemes = [
  presetGpnDark,
  presetGpnDefault,
  presetGpnDisplay,
];

export const iconsMap: Record<string, IconComponent> = {
  gpnDark: IconMoon,
  gpnDefault: IconSun,
  gpnDisplay: IconLightningBolt,
};

export const labelMap: Record<string, string> = {
  gpnDark: 'Тёмная',
  gpnDefault: 'Светлая',
  gpnDisplay: 'Акцентная',
};

const getDefaultTheme = () => {
  if (window.matchMedia('(prefers-color-scheme: dark)')?.matches) {
    return presetGpnDark;
  }
  return presetGpnDefault;
};

export const getThemeKey = (theme: ThemePreset) => theme.color.primary;

export const getThemeIcon = (theme: ThemePreset) =>
  iconsMap[theme.color.primary];

export const getThemeLabel = (theme: ThemePreset) =>
  labelMap[theme.color.primary];

export const themeAtom = atom<ThemePreset>(getDefaultTheme()).pipe(
  withLocalStorage('themeAtom'),
);

export const toggleThemeAction = action((ctx) => {
  const theme = ctx.get(themeAtom);

  if (theme.color.primary === presetGpnDark.color.primary) {
    themeAtom(ctx, presetGpnDefault);
  } else {
    themeAtom(ctx, presetGpnDark);
  }
});

export const isDarkThemeAtom = atom((ctx) => {
  const theme = ctx.spy(themeAtom);

  return theme.color.primary === presetGpnDark.color.primary;
});

export const variantThemeAtom = atom<ThemePreset>(getDefaultTheme()).pipe(
  withLocalStorage('variantThemeAtom'),
);

export const currentThemeAtom = atom<ThemePreset>((ctx) => {
  const theme = ctx.spy(themeAtom);
  const variantTheme = ctx.spy(variantThemeAtom);
  const router = ctx.get(routerAtom);

  if (router.route?.name === routesNames.LIBS_VARIANTS) {
    return variantTheme;
  }

  return theme;
});

onUpdate(themeAtom, (ctx, value) => {
  variantThemeAtom(ctx, value);
});

export const htmlModsAtom = atom<Record<string, string | boolean | undefined>>(
  {},
);

export const htmlModsActionAdd = action(
  (ctx, payload: Record<string, string | boolean | undefined>) => {
    htmlModsAtom(ctx, {
      ...ctx.get(htmlModsAtom),
      ...payload,
    });
  },
);

export const htmlModsActionDel = action((ctx, name: string) => {
  const state = ctx.get(htmlModsAtom);
  if (name in state) {
    const newState = { ...state };
    delete newState[name];

    htmlModsAtom(ctx, newState);
  }
});
