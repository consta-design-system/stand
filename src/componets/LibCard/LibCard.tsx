import './LibCard.css';

import { IconForward } from '@consta/icons/IconForward';
import { IconLink } from '@consta/icons/IconLink';
import { Badge } from '@consta/uikit/Badge';
import { Button } from '@consta/uikit/Button';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { Text } from '@consta/uikit/Text';
import React from 'react';

import { LibDescription } from '##/componets/LibDescription';
import { useLink } from '##/hooks/useLink';
import { routesNames } from '##/modules/router';
import { Group, Lib } from '##/types';
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
  const {
    lib: { title, description, id, repositoryUrl, status },
  } = props;

  const [href, onClick] = useLink({
    to: routesNames.LIBS_LIB,
    params: { lib: id },
  });

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
        <Button
          as="a"
          href={href}
          onClick={onClick}
          size="s"
          iconRight={IconForward}
          view="ghost"
          label="Документация"
        />
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
