import './StandPageHeader.css';

import { Badge } from '@consta/uikit/Badge';
import { IconQuestion } from '@consta/uikit/IconQuestion';
import { Text } from '@consta/uikit/Text';
import { withTooltip } from '@consta/uikit/withTooltip';
import React from 'react';

import { badgeLabelStatusMap, badgeStatusMap } from '##/modules/stand';
import { Stand } from '##/types';
import { H1 } from '##/typography/H1';
import { cn } from '##/utils/bem';

const BadgeWithTooltip = withTooltip({
  isInteractive: false,
  mode: 'mouseover',
  direction: 'downCenter',
})(Badge);

type Props = {
  stand: Stand;
  className?: string;
};

const cnStandPageHeader = cn('StandPageHeader');

const tooltipMessage = {
  stable: 'Это основная версия компонента, рекомендуем использовать',
  deprecated: 'Это устаревшая версия компонента, лучше использовать стабильную',
  canary: 'Это совсем новый компонент, параметры могут поменяться',
  inWork: 'Этот компонент пока находится в разработке',
};

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

  return (
    <div className={cnStandPageHeader(null, [className])}>
      <div className={cnStandPageHeader('Top')}>
        <H1>{title}</H1>
        {(status || version) && (
          <div className={cnStandPageHeader('Badges')}>
            {status && (
              <BadgeWithTooltip
                size="l"
                label={badgeLabelStatusMap[status]}
                status={badgeStatusMap[status]}
                view="stroked"
                icon={IconQuestion}
                tooltipProps={{
                  content: (
                    <Text
                      className={cnStandPageHeader('Tooltip')}
                      size="xs"
                      lineHeight="xs"
                    >
                      {tooltipMessage[status]}
                    </Text>
                  ),
                }}
              />
            )}
            {version && (
              <BadgeWithTooltip
                size="l"
                label={`Доступен с ${version}`}
                status="system"
                icon={IconQuestion}
                view="stroked"
                tooltipProps={{
                  content: (
                    <Text
                      className={cnStandPageHeader('Tooltip')}
                      size="xs"
                      lineHeight="xs"
                    >
                      В этой версии Consta компонент был впервые опубликован
                    </Text>
                  ),
                }}
              />
            )}
          </div>
        )}
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
