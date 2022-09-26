import './LibPageCard.css';

import { Text } from '@consta/uikit/Text';
import React from 'react';

import { Image } from '##/componets/Image';
import { LazyImage } from '##/componets/LazyImage';
import { Link } from '##/componets/Link';
import { PreparedStand } from '##/exportTypes';
import NoImage from '##/images/NoImage.image.svg';
import { routesNames } from '##/modules/router';
import { cn } from '##/utils/bem';

type Props = {
  stand: PreparedStand;
};

const cnLibPageCard = cn('LibPageCard');

export const LibPageCard = (props: Props) => {
  const { stand } = props;
  const { title, description } = props.stand.stand;

  return (
    <div className={cnLibPageCard()}>
      {stand.lazyAccess.image ? (
        <LazyImage id={stand.path} className={cnLibPageCard('Image')} />
      ) : (
        <Image src={NoImage} className={cnLibPageCard('Image')} />
      )}
      <Link to={routesNames.LIBS_STAND} params={{ stand: stand.id }}>
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
      {description && <Text size="s">{description}</Text>}
    </div>
  );
};
