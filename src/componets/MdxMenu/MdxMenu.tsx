import { useAction, useAtom } from '@reatom/react';
import React, { useEffect } from 'react';

import { breakpointsAtom } from '##/modules/breakpoints';
import { menuMdxAtom } from '##/modules/menuMdx';

export const MdxMenu: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const setMenu = useAction(menuMdxAtom.set);
  const [breakpoints] = useAtom(breakpointsAtom);

  useEffect(() => {
    setMenu(children);
    return () => {
      setMenu(undefined);
    };
  }, []);

  if (breakpoints.m) {
    return null;
  }

  return children as React.ReactElement;
};
