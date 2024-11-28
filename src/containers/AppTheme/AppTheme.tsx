import './AppTheme.css';

import { classnames } from '@bem-react/classnames';
import { cnMixScrollBar } from '@consta/uikit/MixScrollBar';
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
    document.querySelector('html')?.setAttribute(
      'class',
      classnames(
        cnTheme({
          ...theme,
          color: theme.color.primary,
        }),
        cnAppTheme(htmlMods),
        cnMixScrollBar(),
      ),
    );
  }, [htmlMods, theme]);

  return (
    <Theme className={cnAppTheme()} preset={theme}>
      {props.children}
    </Theme>
  );
};
