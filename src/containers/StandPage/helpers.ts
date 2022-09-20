import { useAtom } from '@reatom/react';
import { useRouter } from 'react-router5';

import { PreparedStand } from '##/exportTypes';
import { routesNames } from '##/modules/router';
import { standAtom } from '##/modules/stand';

export const useStand = () => {
  const [stand] = useAtom(standAtom);

  const router = useRouter();

  if (!stand) {
    router.navigate(routesNames.LIBS, {}, { replace: true });
  }

  return stand;
};

export const getStandPath = (
  tab: string | undefined,
  standID: string,
  stand: PreparedStand,
) => {
  if (
    (tab === '' && stand.lazyAccess.stand) ||
    (tab && stand.lazyAccess[tab])
  ) {
    return `${standID}${tab ? `_${tab}` : ''}`;
  }
};
