import './AppTheme.css';

import { cnTheme, Theme } from '@consta/uikit/Theme';
import { useAtom } from '@reatom/react';
import React, { useEffect } from 'react';

import { themeAtom } from '##/modules/theme';
import { cn } from '##/utils/bem';

const cnAppTheme = cn('AppTheme');

export const AppTheme: React.FC<{ children: React.ReactChild }> = (props) => {
  const [theme] = useAtom(themeAtom);

  useEffect(() => {
    const mods = {
      ...theme,
      color: theme.color.primary,
    };

    document
      .querySelector('html')
      ?.setAttribute('class', cnTheme(mods, [cnAppTheme()]));
  }, [theme]);

  return (
    <Theme className={cnAppTheme()} preset={theme}>
      {props.children}
    </Theme>
  );
};
