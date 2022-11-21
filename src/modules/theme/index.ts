import { IconComponent } from '@consta/uikit/Icon';
import { IconMoon } from '@consta/uikit/IconMoon';
import { IconSun } from '@consta/uikit/IconSun';
import {
  presetGpnDark,
  presetGpnDefault,
  ThemePreset,
} from '@consta/uikit/Theme';
import { action, atom } from '@reatom/core';
import { onUpdate } from '@reatom/hooks';

export const themes = [presetGpnDark, presetGpnDefault];

export const iconsMap: Record<string, IconComponent> = {
  gpnDark: IconMoon,
  gpnDefault: IconSun,
};

export const getThemeKey = (theme: ThemePreset) => theme.color.primary;

export const getThemeIcon = (theme: ThemePreset) =>
  iconsMap[theme.color.primary];

const KEY = 'theme';

const snapTheme = themes.find(
  (item) => item.color.primary === localStorage.getItem(KEY),
);

export const themeAtom = atom<ThemePreset>(snapTheme || presetGpnDefault);

onUpdate(themeAtom, (ctx, value) =>
  localStorage.setItem(KEY, value.color.primary),
);

export const htmlModsAtom = atom<Record<string, string | boolean | undefined>>(
  {},
);

export const htmlModsActionAdd = action(
  (ctx, payload: { name: string; value: string | boolean | undefined }) => {
    htmlModsAtom(ctx, {
      ...ctx.get(htmlModsAtom),
      [payload.name]: payload.value,
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
