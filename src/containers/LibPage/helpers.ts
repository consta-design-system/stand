import { getGroups } from '@consta/uikit/__internal__/src/utils/getGroups';
import { createAtom } from '@reatom/core';

import { Group, PreparedStand } from '##/exportTypes';
import { libAtom } from '##/modules/lib';

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
