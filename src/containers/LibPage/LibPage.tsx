import './LibPage.css';

import { Text } from '@consta/uikit/Text';
import { useAtom } from '@reatom/react';
import React from 'react';

import { cn } from '##/utils/bem';

import { groupsAtom } from './helpers';
import { LibPageCard } from './LibPageCard';

const cnLibPage = cn('LibPage');

export const LibPage: React.FC = () => {
  const [groups] = useAtom(groupsAtom);

  return (
    <div className={cnLibPage(null, ['theme_gap_medium'])}>
      {groups.map((group, groupIndex) => (
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
