import { useAtom } from '@reatom/react';
import React from 'react';

import { useStand } from '##/containers/StandPage/helpers';
import { themeAtom } from '##/modules/theme';

export const StandPageDecorator: React.FC<{ children: React.ReactChild }> = ({
  children,
}) => {
  const stand = useStand();
  const [theme] = useAtom(themeAtom);

  const defaultStandPageDecoration = (params: { children: React.ReactChild }) =>
    params.children as React.ReactElement;
  const decorator =
    stand?.lib.standPageDecoration ?? defaultStandPageDecoration;
  return decorator({ children, theme });
};
