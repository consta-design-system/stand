import './ListCardBigItem.css';

import { IconForward } from '@consta/icons/IconForward';
import { Badge } from '@consta/uikit/Badge';
import { Button } from '@consta/uikit/Button';
import { cnMixCard } from '@consta/uikit/MixCard';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { Text } from '@consta/uikit/Text';
import React from 'react';

import { Image } from '##/componets/Image';
import { LazyImage } from '##/componets/LazyImage';
import { useLink } from '##/hooks/useLink';
import NoImage from '##/images/NoImage.image.svg';
import { badgeLabelStatusMap, badgeStatusMap } from '##/modules/stand';
import { ListCardItem } from '##/types';
import { cn } from '##/utils/bem';

const cnListCardBigItem = cn('ListCardBigItem');

export const ListCardBigItem = ({
  label,
  description,
  repositoryUrl,
  figmaUrl,
  status,
  routeName,
  routeParams,
  lazyImage,
}: ListCardItem) => {
  const [href, onClick] = useLink({
    to: routeName,
    params: routeParams,
  });

  return (
    <div
      className={cnListCardBigItem(null, [
        cnMixCard({ border: true, form: 'round' }),
        cnMixSpace({ p: 'l', pB: 'xl' }),
      ])}
    >
      <div className={cnListCardBigItem('Info')}>
        {typeof lazyImage === 'string' && lazyImage !== 'no-image' && (
          <LazyImage
            id={lazyImage}
            className={cnListCardBigItem('Image', [cnMixSpace({ mB: 'l' })])}
          />
        )}
        {typeof lazyImage === 'string' && lazyImage === 'no-image' && (
          <Image
            src={NoImage}
            className={cnListCardBigItem('Image', [cnMixSpace({ mB: 'l' })])}
          />
        )}
        <div
          className={cnListCardBigItem('Header', [
            description ? cnMixSpace({ mB: 's' }) : undefined,
          ])}
        >
          <Text
            size="s"
            lineHeight="xs"
            className={cnListCardBigItem('Title')}
            as="a"
            href={href}
            onClick={onClick}
            view="link"
            weight="bold"
          >
            {label}
          </Text>

          {status && status !== 'stable' && (
            <Badge
              label={badgeLabelStatusMap[status]}
              view="filled"
              size="s"
              status={badgeStatusMap[status]}
            />
          )}
        </div>
        <Text size="s" lineHeight="m" as="p" view="primary">
          {description}
        </Text>
      </div>
      <div
        className={cnListCardBigItem('Buttons', [cnMixSpace({ mT: '2xl' })])}
      >
        <div className={cnListCardBigItem('Links')} />
        <Button
          as="a"
          href={href}
          onClick={onClick}
          size="s"
          iconRight={IconForward}
          view="secondary"
          label="Открыть"
        />
      </div>
    </div>
  );
};
