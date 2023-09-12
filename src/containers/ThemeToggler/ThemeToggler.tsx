import { AnimateIconSwitcherProvider } from '@consta/icons/AnimateIconSwitcherProvider';
import { IconMoon } from '@consta/icons/IconMoon';
import { IconSun } from '@consta/icons/IconSun';
import { withAnimateSwitcherHOC } from '@consta/icons/withAnimateSwitcherHOC';
import { Button } from '@consta/uikit/Button';
import { useAction, useAtom } from '@reatom/npm-react';
import React from 'react';

import { isDarkThemeAtom, toggleThemeAction } from '##/modules/theme';

const Icon = withAnimateSwitcherHOC({
  startIcon: IconSun,
  endIcon: IconMoon,
  transition: 300,
});

export const ThemeToggler: React.FC<
  Omit<React.HTMLAttributes<HTMLButtonElement>, 'children'>
> = (props) => {
  const [isDarkTheme] = useAtom(isDarkThemeAtom);
  const setTheme = useAction(toggleThemeAction);
  return (
    <AnimateIconSwitcherProvider active={isDarkTheme}>
      <Button
        {...props}
        onClick={setTheme}
        onlyIcon
        iconLeft={Icon}
        size="s"
        view="ghost"
      />
    </AnimateIconSwitcherProvider>
  );
};
