import './LibPage.css';

import { Text } from '@consta/uikit/Text';
import { useAtom } from '@reatom/npm-react';
import React from 'react';

import { LibDescription } from '##/componets/LibDescription';
import { ListCardMini } from '##/componets/ListCard';
import { routesNames } from '##/modules/router';
import { getComponentRepositoryUrl } from '##/modules/stand';
import { ListCardItem } from '##/types';
import { cn } from '##/utils/bem';

import { groupsAtom, useLib } from './helpers';

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
        <Text size="3xl" lineHeight="m" weight="bold" view="primary">
          {lib.title}
        </Text>
        {(lib.fullDescription || lib.description) && (
          <LibDescription
            description={lib.fullDescription || lib.description}
          />
        )}
      </div>
      {groups.map((group, groupIndex) => {
        const RenderList = group.group?.renderList || ListCardMini;

        const items: ListCardItem[] = group.items.map((stand) => {
          return {
            label: stand.stand.title,
            description: stand.stand.description,
            routeName: routesNames.LIBS_LIB_STAND,
            routeParams: { lib: stand.lib.id, stand: stand.id },
            icon: stand.stand.icon,
            figmaUrl: stand.stand.figma,
            repositoryUrl: getComponentRepositoryUrl(stand),
            status: stand.stand.status,
            lazyImage: stand.lazyAccess.image
              ? `${stand.path}_image_svg`
              : 'no-image',
          };
        });

        return (
          <div key={`${cnLibPage({ groupIndex, group: group.group?.id })}`}>
            <Text
              className={cnLibPage('Title')}
              size="3xl"
              lineHeight="xs"
              weight="bold"
              view="primary"
            >
              {group.group?.title}
            </Text>

            <RenderList items={items} />
          </div>
        );
      })}
    </div>
  );
};
