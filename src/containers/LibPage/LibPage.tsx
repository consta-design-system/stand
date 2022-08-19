import './LibPage.css';

import { getGroups } from '@consta/uikit/__internal__/src/utils/getGroups';
import { Text } from '@consta/uikit/Text';
import { useAtom } from '@reatom/react';
import React, { useMemo } from 'react';

import { Group, LibWithStands, PreparedStand } from '##/exportTypes';
import { libAtom } from '##/modules/lib';
import { cn } from '##/utils/bem';

import { LibPageCard } from './LibPageCard';

const getItemGroupId = (item: PreparedStand) => item.stand.group;
const getGroupKey = (group: Group) => group.id;

const cnLibPage = cn('LibPage');

export const LibPage: React.FC = () => {
  const [lib] = useAtom(libAtom);

  const { stands, groups: groupsProp } = lib ?? ({} as LibWithStands);

  const groups = getGroups<PreparedStand, Group>(
    stands,
    getItemGroupId,
    [...groupsProp],
    getGroupKey,
    undefined,
  );

  const sortedItems = useMemo(() => {
    return groups.map(({ items, ...group }) => {
      return {
        ...group,
        items: items.sort((a, b) => (a.stand.title > b.stand.title ? 1 : -1)),
      };
    });
  }, [groups]);

  return (
    <div className={cnLibPage(null, ['theme_gap_medium'])}>
      {sortedItems.map((group, groupIndex) => (
        <div key={`${cnLibPage({ groupIndex, group: group.group?.id })}`}>
          <Text
            className={cnLibPage('Title')}
            size="3xl"
            lineHeight="xs"
            weight="bold"
          >
            {group.group?.title}
          </Text>
          <div className={cnLibPage('Section')}>
            {group.items.map((stand, index) => (
              <LibPageCard
                key={`${cnLibPage({ index, stand: stand.id })}`}
                stand={stand}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
