import { IconComponent } from '@consta/uikit/Icon';
import { IconMoon } from '@consta/uikit/IconMoon';
import { IconSun } from '@consta/uikit/IconSun';
import {
  presetGpnDark,
  presetGpnDefault,
  ThemePreset,
} from '@consta/uikit/Theme';
import { createAtom } from '@reatom/core';

export const themes = [presetGpnDark, presetGpnDefault];

export const iconsMap: Record<string, IconComponent> = {
  gpnDark: IconMoon,
  gpnDefault: IconSun,
};

export const getThemeKey = (theme: ThemePreset) => theme.color.primary;

export const getThemeIcon = (theme: ThemePreset) =>
  iconsMap[theme.color.primary];

const localStorageItem = 'theme';

const localStorageSavedTheme = themes.find(
  (item) => item.color.primary === localStorage.getItem(localStorageItem),
);

const initialState = localStorageSavedTheme || presetGpnDefault;

export const themeAtom = createAtom(
  { set: (payload: ThemePreset) => payload },
  ({ onAction }, state = initialState) => {
    onAction('set', (payload) => {
      localStorage.setItem(localStorageItem, payload.color.primary);
      state = payload;
    });

    return state;
  },
);

export const htmlModsAtom = createAtom(
  {
    add: (payload: { name: string; value: string | boolean | undefined }) =>
      payload,
    del: (payload: string) => payload,
  },
  ({ onAction }, state: Record<string, string | boolean | undefined> = {}) => {
    onAction('add', ({ name, value }) => {
      state = { ...state, [name]: value };
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
