import { ThemePreset } from '@consta/uikit/Theme';
import { ThemeToggler as ThemeTogglerConsta } from '@consta/uikit/ThemeToggler';
import { useAction, useAtom } from '@reatom/npm-react';
import React from 'react';

import { getThemeIcon, getThemeKey, themeAtom, themes } from '##/modules/theme';

export const ThemeToggler: React.FC<
  Omit<React.HTMLAttributes<HTMLButtonElement>, 'children'>
> = (props) => {
  const [theme] = useAtom(themeAtom);
  const setTheme = useAction((ctx, props: { value: ThemePreset }) =>
    themeAtom(ctx, props.value),
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
      view="ghost"
    />
  );
};
