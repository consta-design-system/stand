import './LibPage.css';

import { Text } from '@consta/uikit/Text';
import { useAtom } from '@reatom/react';
import React from 'react';

import { LibDescription } from '##/componets/LibDescription';
import { cn } from '##/utils/bem';

import { groupsAtom, useLib } from './helpers';
import { LibPageCard } from './LibPageCard';

const cnLibPage = cn('LibPage');

export const LibPage: React.FC = () => {
  const [groups] = useAtom(groupsAtom);
  const lib = useLib();

  if (!lib) {
    return null;
  }

  return (
    <div className={cnLibPage(null, ['theme_gap_medium'])}>
      <div className={cnLibPage('Lib')}>
        <Text size="3xl" lineHeight="m" weight="bold">
          {lib.title}
        </Text>
        {(lib.shortDescription || lib.description) && (
          <LibDescription
            description={lib.shortDescription ?? lib.description}
          />
        )}
      </div>
      {groups.map((group, groupIndex) => {
        const view = group.group?.view ?? 'list-item';
        return (
          <div key={`${cnLibPage({ groupIndex, group: group.group?.id })}`}>
            <Text
              className={cnLibPage('Title')}
              size="3xl"
              lineHeight="xs"
              weight="bold"
            >
              {group.group?.title}
            </Text>
            <div className={cnLibPage('Section', { view })}>
              {group.items.map((stand, index) => (
                <LibPageCard
                  view={view}
                  key={`${cnLibPage({ index, stand: stand.id })}`}
                  stand={stand}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
