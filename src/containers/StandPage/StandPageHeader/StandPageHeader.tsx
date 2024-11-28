import './StandPageHeader.css';

import { IconQuestion } from '@consta/icons/IconQuestion';
import { Badge } from '@consta/uikit/Badge';
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
  const {
    stand: { title, status, version, description },
    className,
  } = props;

  const hasBadges = status || version;

  return (
    <div className={cnStandPageHeader(null, [className])}>
      <StandPageHeaderInfo className={cnStandPageHeader('Info')} />
      <Text className={cnStandPageHeader('Title')} lineHeight="m" weight="bold">
        {title}
      </Text>
      <Text className={cnStandPageHeader('Description')} lineHeight="m">
        {description}
      </Text>
      {hasBadges && (
        <div className={cnStandPageHeader('Badges')}>
          {status && (
            <Badge
              label={status}
              iconLeft={IconQuestion}
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
              iconLeft={IconQuestion}
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
