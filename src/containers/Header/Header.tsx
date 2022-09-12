import { Layout } from '@consta/header/Layout';
import { Button } from '@consta/uikit/Button';
import { IconHamburger } from '@consta/uikit/IconHamburger';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { Text } from '@consta/uikit/Text';
import { useBreakpoints } from '@consta/uikit/useBreakpoints';
import { useComponentSize } from '@consta/uikit/useComponentSize';
import { useAction } from '@reatom/react';
import React, { useEffect, useRef } from 'react';

import { ThemeToggler } from '##/containers/ThemeToggler';
import { headerHeight, openLeftSide } from '##/exportAtoms/layout';

export const Header = () => {
  const toggleMenu = useAction(openLeftSide.toggle);
  const headerRef = useRef<HTMLDivElement>(null);

  const { height } = useComponentSize(headerRef);

  const setHeaderHeight = useAction(headerHeight.set);

  const breakpoints = useBreakpoints({
    l: 1364,
  });

  useEffect(() => {
    setHeaderHeight(height);
  }, [height]);

  return (
    <Layout
      ref={headerRef}
      rowCenter={{
        left: [
          breakpoints.l ? undefined : (
            <Button
              key="Button"
              view="clear"
              iconLeft={IconHamburger}
              className={cnMixSpace({ mR: 's' })}
              onClick={toggleMenu}
            />
          ),
          <Text key="Logo" size="l" weight="bold">
            Consta
          </Text>,
        ],
        center: '',
        right: <ThemeToggler />,
      }}
    />
  );
};
