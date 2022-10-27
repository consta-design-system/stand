// import './HeaderDesktopMenu.css';

import { useAction, useAtom } from '@reatom/react';
import React, { memo, useCallback } from 'react';
import { useRouter } from 'react-router5';

import { PortalMenu } from '##/containers/PortalMenu';
import {
  openPrimaryMenuAtom,
  openSecondaryMenuAtom,
} from '##/exportAtoms/layout';
import { headerMenuAtom, MenuItem } from '##/modules/header';

export const MobileMainMenu = memo(() => {
  const [menu] = useAtom(headerMenuAtom);
  const openPrimaryMenuSetFalse = useAction(openPrimaryMenuAtom.setFalse);
  const openSecondaryMenuSetFalse = useAction(openSecondaryMenuAtom.setFalse);
  const router = useRouter();

  const onItemClick = useCallback(
    ({ e, item }: { e: React.MouseEvent; item: MenuItem }) => {
      e.preventDefault();
      router.navigate(item.routeName, item.params);
      openPrimaryMenuSetFalse();
      openSecondaryMenuSetFalse();
    },
    [],
  );

  const getItemHref = useCallback(
    (item: MenuItem) => router.buildPath(item.routeName, item.params),
    [],
  );

  return (
    <PortalMenu
      items={menu}
      getItemHref={getItemHref}
      onItemClick={onItemClick}
    />
  );
});
