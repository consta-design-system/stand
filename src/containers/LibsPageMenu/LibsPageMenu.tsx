import { useAction, useAtom } from '@reatom/react';
import React, { memo, useCallback } from 'react';
import { useRouter } from 'react-router5';

import { PortalMenu } from '##/containers/PortalMenu';
import {
  openPrimaryMenuAtom,
  openSecondaryMenuAtom,
} from '##/exportAtoms/layout';
import { LibWithStands } from '##/exportTypes';
import { useScrollToActive } from '##/hooks/useScrollToActive';
import { libsAtom } from '##/modules/libs';
import { routesNames } from '##/modules/router';

const getItemLabel = (item: { title: string }) => item.title;
const getItemGroupId = (item: { group?: string }) => item.group;

export const LibsPageMenu = memo(() => {
  const [libs] = useAtom(libsAtom);
  const openPrimaryMenuSetFalse = useAction(openPrimaryMenuAtom.setFalse);
  const openSecondaryMenuSetFalse = useAction(openSecondaryMenuAtom.setFalse);
  const router = useRouter();

  useScrollToActive();

  const onItemClick = useCallback(
    ({ e, item }: { e: React.MouseEvent; item: LibWithStands }) => {
      e.preventDefault();
      router.navigate(routesNames.LIBS_LIB, {
        lib: item.id,
      });
      openPrimaryMenuSetFalse();
      openSecondaryMenuSetFalse();
    },
    [],
  );

  const getItemHref = useCallback((item: LibWithStands) => {
    return router.buildPath(routesNames.LIBS_LIB, {
      lib: item.id,
    });
  }, []);

  return (
    <PortalMenu
      items={libs}
      getItemLabel={getItemLabel}
      getItemGroupId={getItemGroupId}
      getItemHref={getItemHref}
      onItemClick={onItemClick}
      groupsByItems
    />
  );
});
