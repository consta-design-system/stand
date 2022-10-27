import { useAtom } from '@reatom/react';
import React from 'react';

import { useStand } from '##/containers/StandPage/helpers';
import { themeAtom } from '##/modules/theme';

export const PageDecorator = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const stand = useStand();
  const [theme] = useAtom(themeAtom);

  const decorator = stand?.lib.standPageDecoration;

  if (decorator) {
    return decorator({ children, theme });
  }

  return children;
};
