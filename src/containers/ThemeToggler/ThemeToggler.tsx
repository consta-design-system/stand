import { ThemePreset } from '@consta/uikit/Theme';
import {
  ThemeToggler as ThemeTogglerConsta,
  ThemeTogglerPropSetValue,
} from '@consta/uikit/ThemeToggler';
import { useAction, useAtom } from '@reatom/react';
import React from 'react';

import { getThemeIcon, getThemeKey, themeAtom, themes } from '##/modules/theme';

export const ThemeToggler: React.FC<
  Omit<React.HTMLAttributes<HTMLButtonElement>, 'children'>
> = (props) => {
  const [theme] = useAtom(themeAtom);
  const setTheme: ThemeTogglerPropSetValue<ThemePreset> = useAction((props) =>
    themeAtom.set(props.value),
  );
  return (
    <ThemeTogglerConsta
      {...props}
      getItemKey={getThemeKey}
      getItemLabel={getThemeKey}
      getItemIcon={getThemeIcon}
      items={themes}
      onChange={setTheme}
      value={theme}
      size="s"
    />
  );
};
