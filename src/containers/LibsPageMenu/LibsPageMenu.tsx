import { useAtom } from '@reatom/react';
import React from 'react';

import { PortalMenu } from '##/containers/PortalMenu';
import { useScrollToActive } from '##/hooks/useScrollToActive';
import { libsAtom } from '##/modules/libs';
import { routesNames } from '##/modules/router';

const getItemLabel = (item: { title: string }) => item.title;
const getItemGroupId = (item: { group?: string }) => item.group;
const getItemDescription = () => undefined;
const getItemHref = () => routesNames.LIBS_LIB;
const getItemParams = (lib: { id: string }) => ({
  lib: lib.id,
});

export const LibsPageMenu: React.FC = () => {
  const [libs] = useAtom(libsAtom);

  useScrollToActive();

  return (
    <PortalMenu
      items={libs}
      getItemLabel={getItemLabel}
      getItemGroupId={getItemGroupId}
      getItemDescription={getItemDescription}
      getItemHref={getItemHref}
      getItemParams={getItemParams}
      groupsByItems
    />
  );
};
