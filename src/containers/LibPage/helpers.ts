import { getGroups } from '@consta/uikit/__internal__/src/utils/getGroups';
import { atom } from '@reatom/core';
import { useAction, useAtom } from '@reatom/npm-react';
import { useEffect } from 'react';

import { libAtom } from '##/modules/lib';
import { navigateToAction, routesNames } from '##/modules/router';
import { Group, PreparedStand } from '##/types';

export const groupsAtom = atom((ctx) => {
  const lib = ctx.spy(libAtom);

  if (!lib?.stands) {
    return [];
  }

  return getGroups<PreparedStand, Group>(
    lib.stands,
    (item) => item.stand.group,
    [...lib.groups],
    (group) => group.id,
    undefined,
  );
});

export const useLib = () => {
  const [lib] = useAtom(libAtom);

  const navigateTo = useAction(navigateToAction);

  useEffect(() => {
    if (!lib) {
      navigateTo({
        name: routesNames.LIBS,
        params: {},
        opts: { replace: true },
      });
    }
  }, [lib]);

  return lib;
};
