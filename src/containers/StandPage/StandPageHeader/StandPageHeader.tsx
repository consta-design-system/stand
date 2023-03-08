import './StandPageHeader.css';

import { IconQuestion } from '@consta/icons/IconQuestion';
import { Badge } from '@consta/uikit/Badge';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { Text } from '@consta/uikit/Text';
import React from 'react';

import { badgeStatusMap } from '##/modules/stand';
import { Stand } from '##/types';
import { cn } from '##/utils/bem';

import { StandPageHeaderInfo } from './StandPageHeaderInfo';

type Props = {
  stand: Stand;
  className?: string;
};

const cnStandPageHeader = cn('StandPageHeader');

export const getView = (status: Stand['status']) => {
  if (status === 'deprecated' || status === 'stable') {
    return 'stroked';
  }
  if (status === 'canary' || status === 'inWork') {
    return 'filled';
  }
};

export const StandPageHeader = (props: Props) => {
  const { stand, className } = props;
  const { title, status, version, description } = stand;

  const hasBadges = status || version;

  return (
    <div
      className={cnStandPageHeader(null, [className, cnMixSpace({ p: 'xl' })])}
    >
      <StandPageHeaderInfo stand={stand} className={cnMixSpace({ mB: 'l' })} />
      <Text size="2xl" lineHeight="m" weight="bold">
        {title}
      </Text>
      <Text size="m" lineHeight="m">
        {description}
      </Text>
      {hasBadges && (
        <div className={cnStandPageHeader('Badges', [cnMixSpace({ mT: 'l' })])}>
          {status && (
            <Badge
              label={status}
              icon={IconQuestion}
              status={badgeStatusMap[status]}
              size="s"
              form="round"
              view="filled"
            />
          )}
          {version && (
            <Badge
              label={`Доступен с ${version}`}
              status="system"
              icon={IconQuestion}
              size="s"
              form="round"
              view="filled"
            />
          )}
        </div>
      )}
    </div>
  );
};
