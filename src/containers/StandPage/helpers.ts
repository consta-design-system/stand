import { useAtom } from '@reatom/npm-react';
import { useEffect } from 'react';
import { useRouter } from 'react-router5';

import { routesNames } from '##/modules/router';
import { standAtom } from '##/modules/stand';
import { PreparedStand } from '##/types';

export const useStand = () => {
  const [stand] = useAtom(standAtom);

  const router = useRouter();

  useEffect(() => {
    if (!stand) {
      router.navigate(routesNames.LIBS, {}, { replace: true });
    }
  }, [stand]);

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
