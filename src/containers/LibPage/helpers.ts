import { getGroups } from '@consta/uikit/__internal__/src/utils/getGroups';
import { createAtom } from '@reatom/core';
import { useAtom } from '@reatom/react';
import { useEffect } from 'react';
import { useRouter } from 'react-router5';

import { libAtom } from '##/modules/lib';
import { routesNames } from '##/modules/router';
import { Group, PreparedStand } from '##/types';

export const groupsAtom = createAtom({ libAtom }, ({ get }) => {
  const lib = get('libAtom');

  if (!lib?.stands) {
    return [];
  }

  const visiblestands = lib.stands.filter(
    (item) => item.stand.visibleOnLibPage,
  );

  return getGroups<PreparedStand, Group>(
    visiblestands,
    (item) => item.stand.group,
    [...lib.groups],
    (group) => group.id,
    undefined,
  );
});

export const useLib = () => {
  const [lib] = useAtom(libAtom);

  const router = useRouter();

  useEffect(() => {
    if (!lib) {
      router.navigate(routesNames.LIBS, {}, { replace: true });
    }
  }, [lib]);

  return lib;
};
