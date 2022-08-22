import { AppTheme } from '@consta/stand/src/containers/AppTheme';
import { useAtom } from '@reatom/react';
import React from 'react';

import { useStand } from '##/containers/StandPage/useStand';
import { themeAtom } from '##/modules/theme';

export const StandPageDecorator: React.FC<{ children: React.ReactChild }> = ({
  children,
}) => {
  const stand = useStand();
  const [theme] = useAtom(themeAtom);

  const defaultStandPageDecoration = () => <AppTheme>{children}</AppTheme>;
  return (
    stand?.lib.standPageDecoration?.({ children, theme }) ??
    defaultStandPageDecoration()
  );
};
