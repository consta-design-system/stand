import './LibPageCard.css';

import { IconForward } from '@consta/icons/IconForward';
import { IconGitHub } from '@consta/icons/IconGitHub';
import { Badge } from '@consta/uikit/Badge';
import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import React, { useMemo } from 'react';

import { Image } from '##/componets/Image';
import { LazyImage } from '##/componets/LazyImage';
import { useLink } from '##/hooks/useLink';
import IconFigma from '##/icons/Figma.icon.svg';
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
  const { title, description, status, figma } = props.stand.stand;
  const [href, onClick] = useLink({
    to: routesNames.LIBS_LIB_STAND,
    params: { stand: stand.id, lib: stand.lib.id },
  });

  const github = useMemo(() => {
    const {
      componentDir,
      lib: { repositoryUrl },
    } = stand;
    return (
      componentDir &&
      repositoryUrl &&
      `${repositoryUrl}/tree/master/${componentDir}`
    );
  }, [stand]);

  return (
    <div className={cnLibPageCard({ view })}>
      {view !== 'list-item' &&
        (stand.lazyAccess.image ? (
          <LazyImage id={stand.path} className={cnLibPageCard('Image')} />
        ) : (
          <Image src={NoImage} className={cnLibPageCard('Image')} />
        ))}
      <div className={cnLibPageCard('Content')}>
        <div className={cnLibPageCard('Top')}>
          <Text
            className={cnLibPageCard('Title')}
            size="s"
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
              size="s"
              className={cnLibPageCard('Badge', { status })}
              label={badgeLabelStatusMap[status]}
              status={badgeStatusMap[status]}
              view="filled"
              form="round"
            />
          )}
        </div>
        {description && (
          <Text
            size="s"
            lineHeight="m"
            className={cnLibPageCard('Description')}
          >
            {description}
          </Text>
        )}
        {view !== 'list-item' && (
          <div className={cnLibPageCard('Buttons')}>
            <div className={cnLibPageCard('Block')}>
              {figma && (
                <Button
                  as="a"
                  target="_blank"
                  href={figma}
                  view="ghost"
                  size="s"
                  onlyIcon
                  iconLeft={IconFigma}
                />
              )}
              {github && (
                <Button
                  as="a"
                  target="_blank"
                  href={github}
                  view="ghost"
                  size="s"
                  onlyIcon
                  iconLeft={IconGitHub}
                />
              )}
            </div>
            <Button
              label="Открыть"
              size="s"
              view="secondary"
              as="a"
              href={href}
              iconRight={IconForward}
            />
          </div>
        )}
      </div>
    </div>
  );
};
