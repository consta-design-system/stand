import './DocLayout.css';

import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import { useBreakpoints } from '@consta/uikit/useBreakpoints';
import { useAtom } from '@reatom/react';
import React, { useCallback, useEffect } from 'react';
import { useRoute } from 'react-router5';
import { startsWithSegment } from 'router5-helpers';

import { MobileMainMenu } from '##/containers/MobileMainMenu';
import {
  openPrimaryMenuAtom,
  openSecondaryMenuAtom,
} from '##/exportAtoms/layout';
import IconRightPanel from '##/icons/RightPanel.icon.svg';
import { headerWithMenuAtom } from '##/modules/header';
import { routesNames } from '##/modules/router';
import { cn } from '##/utils/bem';

import { DocLayoutRightSide } from './DocLayoutRightSide';

const cnDocLayout = cn('DocLayout');

export const DocLayout: React.FC<{
  children?: React.ReactChild;
  leftSide?: React.ReactChild;
  rightSide?: React.ReactChild;
  header?: React.ReactChild;
}> = (props) => {
  const [openPrimaryMenu, setOpenPrimaryMenu] = useAtom(openPrimaryMenuAtom);
  const { route } = useRoute();
  const [openSecondaryMenu, setOpenSecondaryMenu] = useAtom(
    openSecondaryMenuAtom,
  );

  const [headerWithMenu] = useAtom(headerWithMenuAtom);

  const breakpoints = useBreakpoints({
    m: 900,
    l: 1364,
  });

  const closeAllMenu = useCallback(() => {
    setOpenSecondaryMenu.setFalse();
    setOpenPrimaryMenu.setFalse();
  }, []);

  const replaseMenu = headerWithMenu && !breakpoints.m;

  const withSecondaryMenu =
    replaseMenu && startsWithSegment(route.name)(routesNames.LIBS_LIB);

  useEffect(() => {
    if (breakpoints.m) {
      setOpenSecondaryMenu.setFalse();
    }
    if (breakpoints.l) {
      setOpenPrimaryMenu.setFalse();
    }
  }, [breakpoints.l, breakpoints.m]);

  return (
    <div className={cnDocLayout()}>
      <div className={cnDocLayout('Header')}>{props.header}</div>
      <div
        className={cnDocLayout('Menu', {
          type: 'primary',
          open: openPrimaryMenu,
        })}
      >
        {replaseMenu ? <MobileMainMenu /> : props.leftSide}
      </div>
      {replaseMenu && (
        <div
          className={cnDocLayout('Menu', {
            type: 'secondary',
            open: openSecondaryMenu,
          })}
        >
          {props.leftSide}
        </div>
      )}
      <div
        className={cnDocLayout('Owerlay', {
          open: openPrimaryMenu || openSecondaryMenu,
        })}
        aria-hidden="true"
        onClick={closeAllMenu}
      />
      <div className={cnDocLayout('Content')}>
        {withSecondaryMenu && (
          <Text
            className={cnDocLayout('SecondaryMenuButton')}
            size="s"
            weight="semibold"
            onClick={setOpenSecondaryMenu.setTrue}
          >
            <Button size="s" iconLeft={IconRightPanel} iconSize="m" />
            Обзор
          </Text>
        )}
        <div className={cnDocLayout('Paper', { withSecondaryMenu })}>
          {props.children}
        </div>
      </div>
      <DocLayoutRightSide>{props.rightSide}</DocLayoutRightSide>
    </div>
  );
};
