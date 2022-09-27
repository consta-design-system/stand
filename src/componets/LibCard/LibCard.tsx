import './LibCard.css';

import { Badge } from '@consta/uikit/Badge';
import { Button } from '@consta/uikit/Button';
import { IconForward } from '@consta/uikit/IconForward';
import { IconLink } from '@consta/uikit/IconLink';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { Text } from '@consta/uikit/Text';
import React from 'react';

import { LibDescription } from '##/componets/LibDescription';
import { Link } from '##/componets/Link';
import { Group, Lib } from '##/exportTypes';
import { routesNames } from '##/modules/router';
import { cn } from '##/utils/bem';

const badgeMap = {
  deprecated: 'Не развивается',
  inWork: 'В работе',
} as const;

type LibCardProps = {
  lib: Lib<Group>;
};

const cnLibCard = cn('LibCard');

export const LibCard = (props: LibCardProps) => {
  const { lib } = props;
  const { title, description, id, repositoryUrl, status } = lib;

  return (
    <div className={cnLibCard()}>
      <Text
        as="h5"
        size="l"
        lineHeight="xs"
        weight="semibold"
        className={cnLibCard('Title', [cnMixSpace({ mB: 's' })])}
      >
        {title}
        {status && status !== 'stable' && (
          <Badge
            label={badgeMap[status]}
            view="filled"
            size="s"
            status="system"
          />
        )}
      </Text>
      <LibDescription description={description} />
      <div className={cnLibCard('Buttons')}>
        <Link to={routesNames.LIBS_STAND} params={{ stand: id }}>
          <Button
            size="s"
            iconRight={IconForward}
            view="ghost"
            label="Документация"
          />
        </Link>
        {repositoryUrl && (
          <Button
            size="s"
            as="a"
            href={repositoryUrl}
            iconLeft={IconLink}
            view="clear"
            label="Открыть на GitHub"
          />
        )}
      </div>
    </div>
  );
};
