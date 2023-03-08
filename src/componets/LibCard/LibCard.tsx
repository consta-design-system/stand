import './LibCard.css';

import { IconForward } from '@consta/icons/IconForward';
import { IconGitHub } from '@consta/icons/IconGitHub';
import { Badge } from '@consta/uikit/Badge';
import { Button } from '@consta/uikit/Button';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { Text } from '@consta/uikit/Text';
import React from 'react';

import { LibDescription } from '##/componets/LibDescription';
import { useLink } from '##/hooks/useLink';
import IconFigma from '##/icons/Figma.icon.svg';
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
    <div className={cnLibCard(null, [cnMixSpace({ pV: '2xl', pH: 'xl' })])}>
      <div className={cnLibCard('Info')}>
        <Text
          size="m"
          lineHeight="xs"
          className={cnLibCard('Title', [cnMixSpace({ mB: 's' })])}
          as="a"
          href={href}
          onClick={onClick}
          view="link"
          weight="bold"
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
      </div>
      <div className={cnLibCard('Buttons', [cnMixSpace({ mT: '2xl' })])}>
        <div className={cnLibCard('Links')}>
          <Button
            size="s"
            view="ghost"
            onlyIcon
            iconLeft={IconFigma}
            as="a"
            href={repositoryUrl}
          />
          {repositoryUrl && (
            <Button
              size="s"
              view="ghost"
              onlyIcon
              iconLeft={IconGitHub}
              as="a"
              href={repositoryUrl}
            />
          )}
        </div>
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
