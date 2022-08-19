import { useAtom } from '@reatom/react';
import React, { useMemo } from 'react';

import { PortalMenu } from '##/containers/PortalMenu';
import { libsAtom } from '##/modules/libs';
import { routesNames } from '##/modules/router';
import { sortLibs } from '##/utils/sorting';

const getItemLabel = (item: { title: string }) => item.title;
const getItemGroupId = (item: { group?: string }) => item.group;
const getItemDescription = () => undefined;
const getItemHref = () => routesNames.LIBS_STAND;
const getItemParams = (item: { id: string }) => ({ stand: item.id });

export const LibsPageMenu: React.FC = () => {
  const [libs] = useAtom(libsAtom);

  const sortedLibs = useMemo(() => {
    return libs.sort(sortLibs);
  }, [libs]);

  return (
    <PortalMenu
      items={sortedLibs}
      getItemLabel={getItemLabel}
      getItemGroupId={getItemGroupId}
      getItemDescription={getItemDescription}
      getItemHref={getItemHref}
      getItemParams={getItemParams}
      groupsByItems
    />
  );
};
