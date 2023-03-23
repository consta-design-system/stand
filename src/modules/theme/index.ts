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

const KEY = 'theme';
const VARIANT_KEY = 'variant_theme';

const getSnapTheme = (key: string) =>
  variantThemes.find(
    (item) => item.color.primary === localStorage.getItem(key),
  );

export const themeAtom = atom<ThemePreset>(
  getSnapTheme(KEY) || getDefaultTheme(),
);

export const variantThemeAtom = atom<ThemePreset>(
  getSnapTheme(VARIANT_KEY) || getDefaultTheme(),
);

onUpdate(variantThemeAtom, (_ctx, value) =>
  localStorage.setItem(VARIANT_KEY, value.color.primary),
);

onUpdate(themeAtom, (ctx, value) => {
  localStorage.setItem(KEY, value.color.primary);
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
