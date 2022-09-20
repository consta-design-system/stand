import { useMemo } from 'react';

import { useStand } from '##/containers/StandPage/helpers';
import { PreparedStand, StandTab } from '##/exportTypes';

export type NavigationItem = {
  id: string;
  label: string;
  sandbox?: boolean | undefined;
  figma?: boolean | undefined;
};

const navigationItemVisible = (stand: PreparedStand, tab: StandTab) => {
  if (!tab.id && stand?.lazyAccess.stand) {
    return true;
  }
  if (tab.id && stand?.lazyAccess[tab.id]) {
    return true;
  }
  if (tab.figma && stand?.stand.figma) {
    return true;
  }
  if (tab.sandbox && stand?.stand.sandbox) {
    return true;
  }
};

export const useNavigationList = (): NavigationItem[] => {
  const stand = useStand();

  const standTabs = stand?.lib.standTabs;

  const navigationList = useMemo(() => {
    if (stand && standTabs) {
      return standTabs.filter((item) => navigationItemVisible(stand, item));
    }
    return [];
  }, [stand?.id]);

  return navigationList;
};

export const getNavigationItemId = (item: NavigationItem) => `${item.id}`;
