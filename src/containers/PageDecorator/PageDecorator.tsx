import { useAtom } from '@reatom/npm-react';
import React from 'react';

import { useStand } from '##/containers/StandPage/helpers';
import { themeAtom, variantThemeAtom } from '##/modules/theme';

type PageDecoratorProps = {
  children: React.ReactElement;
  type?: 'default' | 'variants';
};

export const PageDecorator = (props: PageDecoratorProps) => {
  const { children, type = 'default' } = props;
  const stand = useStand();
  const [theme] = useAtom(themeAtom);
  const [variantTheme] = useAtom(variantThemeAtom);

  const decorator = stand?.lib.standPageDecoration;

  if (decorator) {
    return decorator({
      children,
      theme: type === 'default' ? theme : variantTheme,
    });
  }

  return children;
};
