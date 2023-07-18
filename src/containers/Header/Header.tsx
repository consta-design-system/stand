import './Header.css';

import { Layout } from '@consta/header/Layout';
import { IconHamburger } from '@consta/icons/IconHamburger';
import { Button } from '@consta/uikit/Button';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { useComponentSize } from '@consta/uikit/useComponentSize';
import { useAction } from '@reatom/npm-react';
import React, { memo, useEffect, useRef } from 'react';

import { BannerLinks } from '##/componets/BannerLinks';
import { HeaderSearchToggler, SearchMobile } from '##/containers/SearchMobile';
import { headerHeightAtomSet, openLeftSideAtom } from '##/modules/layout';
import { cn } from '##/utils/bem';

import { HeaderLogo } from './HeaderLogo';

const cnHeader = cn('Header');

const MenuToggler = () => {
  return (
    <Button
      view="ghost"
      iconLeft={IconHamburger}
      className={cnMixSpace({ mR: 'm' })}
      onClick={useAction(openLeftSideAtom.toggle)}
      size="s"
    />
  );
};

const Left = () => {
  return (
    <>
      <MenuToggler />
      <HeaderLogo />
    </>
  );
};

const Right = () => {
  return (
    <>
      <HeaderSearchToggler />
      <BannerLinks view="popover" mode="header" />
    </>
  );
};

export const Header = memo(() => {
  const headerRef = useRef<HTMLDivElement>(null);

  const { height } = useComponentSize(headerRef);

  const setHeaderHeight = useAction(headerHeightAtomSet);

  useEffect(() => {
    setHeaderHeight(height);

    return () => {
      setHeaderHeight(0);
    };
  }, [height]);

  return (
    <>
      <Layout
        className={cnHeader()}
        ref={headerRef}
        rowCenter={{
          left: <Left />,
          center: undefined,
          right: <Right />,
        }}
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
      />
      <SearchMobile />
    </>
  );
});
