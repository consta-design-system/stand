import './AppTheme.css';

import { cnTheme, Theme } from '@consta/uikit/Theme';
import { useAtom } from '@reatom/npm-react';
import React, { useEffect } from 'react';

import { currentThemeAtom, htmlModsAtom } from '##/modules/theme';
import { cn } from '##/utils/bem';

const cnAppTheme = cn('AppTheme');

export const AppTheme: React.FC<{ children: React.ReactChild }> = (props) => {
  const [theme] = useAtom(currentThemeAtom);
  const [htmlMods] = useAtom(htmlModsAtom);

  useEffect(() => {
    const mods = {
      ...theme,
      color: theme.color.primary,
    };
    document
      .querySelector('html')
      ?.setAttribute('class', cnTheme({ ...mods }, [cnAppTheme(htmlMods)]));
  }, [htmlMods, theme]);

  return (
    <Theme className={cnAppTheme()} preset={theme}>
      {props.children}
    </Theme>
  );
};
