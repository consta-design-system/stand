import { useBreakpoints } from '@consta/uikit/useBreakpoints';
import { useAction } from '@reatom/npm-react';
import React, { useEffect } from 'react';

import { menuMdxAtom } from '##/modules/menuMdx';

export const MdxMenu: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const setMenu = useAction(menuMdxAtom);
  const breakpoints = useBreakpoints({ xl: 1242 });

  useEffect(() => {
    setMenu(children);
    return () => {
      setMenu(undefined);
    };
  }, []);

  if (breakpoints.xl) {
    return null;
  }

  return children as React.ReactElement;
};
