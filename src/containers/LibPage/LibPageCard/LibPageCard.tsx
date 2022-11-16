import './LibPageCard.css';

import { Badge } from '@consta/uikit/Badge';
import { Text } from '@consta/uikit/Text';
import React from 'react';

import { Image } from '##/componets/Image';
import { LazyImage } from '##/componets/LazyImage';
import { useLink } from '##/hooks/useLink';
import NoImage from '##/images/NoImage.image.svg';
import { routesNames } from '##/modules/router';
import { badgeLabelStatusMap, badgeStatusMap } from '##/modules/stand';
import { Group, PreparedStand } from '##/types';
import { cn } from '##/utils/bem';

type Props = {
  stand: PreparedStand;
  view?: Group['view'];
};

const cnLibPageCard = cn('LibPageCard');

export const LibPageCard = (props: Props) => {
  const { stand, view = 'card' } = props;
  const { title, description, status } = props.stand.stand;
  const [href, onClick] = useLink({
    to: routesNames.LIBS_LIB_STAND,
    params: { stand: stand.id, lib: stand.lib.id },
  });

  return (
    <div className={cnLibPageCard({ view })}>
      <div className={cnLibPageCard('Content')}>
        <div className={cnLibPageCard('Top')}>
          <Text
            className={cnLibPageCard('Title')}
            size="l"
            view="link"
            weight="semibold"
            lineHeight="xs"
            as="a"
            href={href}
            onClick={onClick}
          >
            {title}
          </Text>
          {status && status !== 'stable' && (
            <Badge
              size="xs"
              label={badgeLabelStatusMap[status]}
              status={badgeStatusMap[status]}
              view="stroked"
            />
          )}
        </div>
        {description && (
          <Text
            size="m"
            lineHeight="m"
            className={cnLibPageCard('Description')}
          >
            {description}
          </Text>
        )}
      </div>
      {view !== 'list-item' &&
        (stand.lazyAccess.image ? (
          <LazyImage id={stand.path} className={cnLibPageCard('Image')} />
        ) : (
          <Image src={NoImage} className={cnLibPageCard('Image')} />
        ))}
    </div>
  );
};
