import { cnMixSpace } from '@consta/uikit/MixSpace';
import { useAction, useAtom } from '@reatom/npm-react';
import React, { memo, useCallback } from 'react';
import { useRouter } from 'react-router5';

import { PortalMenu } from '##/containers/PortalMenu';
import { useScrollToActive } from '##/hooks/useScrollToActive';
import { openLeftSideAtom } from '##/modules/layout';
import { libsAtom } from '##/modules/libs';
import { routesNames } from '##/modules/router';
import { LibWithStands } from '##/types';

const getItemLabel = (item: { title: string }) => item.title;
const getItemGroupId = (item: { group?: string }) => item.group;

export const LibsPageMenu = memo(() => {
  const [libs] = useAtom(libsAtom);
  const openPrimaryMenuSetFalse = useAction(openLeftSideAtom.setFalse);
  const router = useRouter();

  useScrollToActive();

  const onItemClick = useCallback(
    ({ e, item }: { e: React.MouseEvent; item: LibWithStands }) => {
      e.preventDefault();
      router.navigate(routesNames.LIBS_LIB, {
        lib: item.id,
      });
      openPrimaryMenuSetFalse();
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
      className={cnMixSpace({ pH: 'm' })}
      items={libs}
      getItemLabel={getItemLabel}
      getItemGroupId={getItemGroupId}
      getItemHref={getItemHref}
      onItemClick={onItemClick}
      groupsByItems
    />
  );
});
