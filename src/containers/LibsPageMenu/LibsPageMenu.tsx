import { cnMixSpace } from '@consta/uikit/MixSpace';
import { useAction, useAtom } from '@reatom/npm-react';
import React, { memo, useCallback } from 'react';
import { useRouter } from 'react-router5';

import { PortalMenu } from '##/containers/PortalMenu';
import { openLeftSideAtom } from '##/modules/layout';
import {
  ItemWithGroup as Item,
  libsPageMenuCollapsedConfigAtom,
  libsPageMenuItemAtom,
} from '##/modules/libsPage';

const getItemLabel = (item: Item) => item.label;
const getItemGroupId = (item: Item) => item.group.label;

export const LibsPageMenu = memo(() => {
  const [ddd] = useAtom(libsPageMenuItemAtom);

  const [collapsedConfig] = useAtom(libsPageMenuCollapsedConfigAtom);

  const openPrimaryMenuSetFalse = useAction(openLeftSideAtom.setFalse);
  const router = useRouter();

  const onItemClick = useCallback(
    ({ e, item }: { e: React.MouseEvent; item: Item }) => {
      e.preventDefault();
      router.navigate(item.routeName, item.routeParams);
      openPrimaryMenuSetFalse();
    },
    [],
  );

  const getItemHref = useCallback((item: Item) => {
    return router.buildPath(item.routeName, item.routeParams);
  }, []);

  const getGroupInitialOpen = useCallback(
    (_: any, key: string) => {
      return Boolean(collapsedConfig[key]);
    },
    [collapsedConfig],
  );

  return (
    <PortalMenu
      className={cnMixSpace({ pH: 'm' })}
      items={ddd}
      getItemLabel={getItemLabel}
      getItemGroupId={getItemGroupId}
      getItemHref={getItemHref}
      onItemClick={onItemClick}
      groupsByItems
      getGroupInitialOpen={getGroupInitialOpen}
    />
  );
});
