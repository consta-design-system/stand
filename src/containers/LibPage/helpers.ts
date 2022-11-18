import { getGroups } from '@consta/uikit/__internal__/src/utils/getGroups';
import { atom } from '@reatom/core';
import { useAtom } from '@reatom/npm-react';
import { useEffect } from 'react';

import { libAtom } from '##/modules/lib';
import { routesNames, useNavigate } from '##/modules/router';
import { Group, PreparedStand } from '##/types';

export const groupsAtom = atom((ctx) => {
  const lib = ctx.spy(libAtom);

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

  const navigate = useNavigate();

  useEffect(() => {
    if (!lib) {
      navigate({ name: routesNames.LIBS, params: {}, opts: { replace: true } });
    }
  }, [lib]);

  return lib;
};
