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
import { action, atom, computed, withLocalStorage } from '@reatom/core';

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

export const themeAtom = atom<ThemePreset>(getDefaultTheme()).extend(
  withLocalStorage('themeAtom'),
);

export const isDarkThemeAtom = computed(() => {
  return themeAtom().color.primary === presetGpnDark.color.primary;
});

export const toggleThemeAction = action(() => {
  const theme = themeAtom();

  if (theme.color.primary === presetGpnDark.color.primary) {
    themeAtom.set(presetGpnDefault);
  } else {
    themeAtom.set(presetGpnDark);
  }
});

export const variantThemeAtom = atom<ThemePreset>(getDefaultTheme()).extend(
  withLocalStorage('variantThemeAtom'),
);

export const currentThemeAtom = computed<ThemePreset>(() => {
  const theme = themeAtom();
  const variantTheme = variantThemeAtom();
  const router = routerAtom();

  if (router.route?.name === routesNames.LIBS_VARIANTS) {
    return variantTheme;
  }

  return theme;
});

themeAtom.subscribe((theme) => {
  variantThemeAtom.set(theme);
});

export const htmlModsAtom = atom<Record<string, string | boolean | undefined>>(
  {},
);

export const htmlModsActionAdd = action(
  (payload: Record<string, string | boolean | undefined>) => {
    htmlModsAtom.set({
      ...htmlModsAtom(),
      ...payload,
    });
  },
);

export const htmlModsActionDel = action((name: string) => {
  const state = htmlModsAtom();
  if (name in state) {
    const newState = { ...state };
    delete newState[name];

    htmlModsAtom.set(newState);
  }
});
