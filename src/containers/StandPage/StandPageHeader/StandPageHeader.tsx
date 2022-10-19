import './StandPageHeader.css';

import { IconQuestion } from '@consta/uikit/IconQuestion';
import { Text } from '@consta/uikit/Text';
import React from 'react';

import { Stand } from '##/exportTypes';
import { H1 } from '##/typography/H1';
import { cn } from '##/utils/bem';

import { StandPageHeaderBadge } from './StandPageHeaderBadge';

type Props = {
  stand: Stand;
  className?: string;
};

const cnStandPageHeader = cn('StandPageHeader');

const getLabel = (status: Stand['status']): string | undefined => {
  if (status === 'deprecated') {
    return 'deprecated';
  }
  if (status === 'canary') {
    return 'canary';
  }
  if (status === 'stable') {
    return 'Стабильный';
  }
  if (status === 'inWork') {
    return 'В работе';
  }
};

const tooltipMessage = {
  stable: 'Это основная версия компонента, рекомендуем использовать',
  deprecated: 'Это устаревшая версия компонента, лучше использовать стабильную',
  canary: 'Это совсем новый компонент, параметры могут поменяться',
  inWork: 'Этот компонент пока находится в разработке',
};

const getStatus = (status: Stand['status']) => {
  if (status === 'deprecated') {
    return 'error';
  }
  if (status === 'canary') {
    return 'success';
  }
  if (status === 'stable') {
    return 'normal';
  }
};

const getView = (status: Stand['status']) => {
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

  return (
    <div className={cnStandPageHeader(null, [className])}>
      <div className={cnStandPageHeader('Top')}>
        <H1>{title}</H1>
        <div className={cnStandPageHeader('Badges')}>
          {status && getStatus(status) && (
            <StandPageHeaderBadge
              size="l"
              label={getLabel(status)}
              status={getStatus(status)}
              view={getView(status)}
              tooltipText={tooltipMessage[status]}
            />
          )}
          {version && (
            <StandPageHeaderBadge
              label={`Доступен с ${version}`}
              icon={IconQuestion}
              tooltipText="В этой версии Consta компонент был впервые опубликован"
            />
          )}
        </div>
      </div>
      {description && (
        <Text
          className={cnStandPageHeader('Description')}
          size="m"
          lineHeight="m"
        >
          {description}
        </Text>
      )}
    </div>
  );
};
