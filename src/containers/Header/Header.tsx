import './Header.css';

import { Layout } from '@consta/header/Layout';
import { IconHamburger } from '@consta/icons/IconHamburger';
import { Button } from '@consta/uikit/Button';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { useBreakpoints } from '@consta/uikit/useBreakpoints';
import { useComponentSize } from '@consta/uikit/useComponentSize';
import { useAction } from '@reatom/npm-react';
import React, { memo, useEffect, useRef } from 'react';

import { ThemeToggler } from '##/containers/ThemeToggler';
import { headerHeightAtomSet, openPrimaryMenuAtom } from '##/modules/layout';
import { cn } from '##/utils/bem';

import { HeaderDesktopMenu } from './HeaderDesktopMenu';
import { HeaderLogo } from './HeaderLogo';

const cnHeader = cn('Header');

const MenuToggler = () => {
  const toggleMenu = useAction(openPrimaryMenuAtom.toggle);

  const breakpoints = useBreakpoints({
    m: 900,
  });

  return (
    <Button
      view="clear"
      iconLeft={IconHamburger}
      className={breakpoints.m ? cnMixSpace({ mR: 's' }) : undefined}
      onClick={toggleMenu}
      size="s"
    />
  );
};

const LeftButton = (breakpoints: { m: boolean; l: boolean }) => {
  if (breakpoints.l) {
    return null;
  }
  if (breakpoints.m) {
    return <MenuToggler key="MenuToggler" />;
  }
  return <ThemeToggler key="ThemeToggler" />;
};

const Left = (breakpoints: { m: boolean; l: boolean }) => {
  return (
    <>
      <LeftButton {...breakpoints} />
      {breakpoints.m && <HeaderLogo />}
    </>
  );
};

const Center = (breakpoints: { m: boolean }) => {
  if (breakpoints.m) {
    return <HeaderDesktopMenu />;
  }
  return <HeaderLogo />;
};

const Right = (breakpoints: { m: boolean }) => {
  if (breakpoints.m) {
    return <ThemeToggler />;
  }
  return <MenuToggler key="dddd" />;
};

export const Header = memo(() => {
  const headerRef = useRef<HTMLDivElement>(null);

  const { height } = useComponentSize(headerRef);

  const setHeaderHeight = useAction(headerHeightAtomSet);

  const breakpoints = useBreakpoints({
    m: 900,
    l: 1364,
  });

  useEffect(() => {
    setHeaderHeight(height);
  }, [height]);

  return (
    <Layout
      className={cnHeader()}
      ref={headerRef}
      rowCenter={{
        left: <Left {...breakpoints} />,
        center: <Center {...breakpoints} />,
        right: <Right {...breakpoints} />,
      }}
    />
  );
});
