import './LibPageCard.css';

import { Badge } from '@consta/uikit/Badge';
import { Text } from '@consta/uikit/Text';
import React from 'react';

import { Image } from '##/componets/Image';
import { LazyImage } from '##/componets/LazyImage';
import { Link } from '##/componets/Link';
import { Group, PreparedStand } from '##/exportTypes';
import NoImage from '##/images/NoImage.image.svg';
import { routesNames } from '##/modules/router';
import { badgeLabelStatusMap, badgeStatusMap } from '##/modules/stand';
import { cn } from '##/utils/bem';

type Props = {
  stand: PreparedStand;
  view?: Group['view'];
};

const cnLibPageCard = cn('LibPageCard');

export const LibPageCard = (props: Props) => {
  const { stand, view = 'card' } = props;
  const { title, description, status } = props.stand.stand;

  return (
    <div className={cnLibPageCard({ view })}>
      <div className={cnLibPageCard('Content')}>
        <div className={cnLibPageCard('Top')}>
          <Link
            to={routesNames.LIBS_LIB_STAND}
            params={{ stand: stand.id, lib: stand.lib.id }}
          >
            <Text
              className={cnLibPageCard('Title')}
              size="l"
              view="link"
              weight="semibold"
              lineHeight="xs"
            >
              {title}
            </Text>
          </Link>
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
