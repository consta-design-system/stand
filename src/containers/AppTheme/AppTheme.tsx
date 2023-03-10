import './AppTheme.css';

import { cnTheme, Theme } from '@consta/uikit/Theme';
import { useAtom } from '@reatom/npm-react';
import React, { useEffect } from 'react';

import { htmlModsAtom, themeAtom, variantThemeAtom } from '##/modules/theme';
import { cn } from '##/utils/bem';

const cnAppTheme = cn('AppTheme');

export const AppTheme: React.FC<{ children: React.ReactChild }> = (props) => {
  const [theme] = useAtom(themeAtom);
  const [variantTheme] = useAtom(variantThemeAtom);
  const [htmlMods] = useAtom(htmlModsAtom);

  useEffect(() => {
    const type = document.querySelector('.stand--ExampleFrame')
      ? 'variants'
      : 'default';
    const mods = {
      ...(type === 'default' ? theme : variantTheme),
      color: theme.color.primary,
    };
    document
      .querySelector('html')
      ?.setAttribute(
        'class',
        cnTheme({ ...mods, type }, [cnAppTheme(htmlMods)]),
      );
  }, [theme, htmlMods, variantTheme]);

  return (
    <Theme className={cnAppTheme()} preset={theme}>
      {props.children}
    </Theme>
  );
};
