import { useAtom } from '@reatom/npm-react';
import React from 'react';

import { useStand } from '##/containers/StandPage/helpers';
import { currentThemeAtom } from '##/modules/theme';

type PageDecoratorProps = {
  children: React.ReactElement;
  type?: 'default' | 'variants';
};

export const PageDecorator = (props: PageDecoratorProps) => {
  const { children } = props;
  const stand = useStand();
  const [theme] = useAtom(currentThemeAtom);

  const decorator = stand?.lib.standPageDecoration;

  if (decorator) {
    return decorator({
      children,
      theme,
    });
  }

  return children;
};
