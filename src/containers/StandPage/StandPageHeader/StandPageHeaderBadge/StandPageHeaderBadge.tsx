import './StandPageHeaderBadge.css';

import {
  Badge,
  BadgePropSize,
  BadgePropStatus,
  BadgePropView,
} from '@consta/uikit/Badge';
import { IconComponent } from '@consta/uikit/Icon';
import { Text } from '@consta/uikit/Text';
import { Tooltip } from '@consta/uikit/Tooltip';
import { useFlag } from '@consta/uikit/useFlag';
import React, { useRef } from 'react';

import { cn } from '##/utils/bem';

type Props = {
  size?: BadgePropSize;
  view?: BadgePropView;
  status?: BadgePropStatus;
  icon?: IconComponent;
  label?: string;
  tooltipText?: string;
};

const cnStandPageHeaderBadge = cn('StandPageHeaderBadge');

export const StandPageHeaderBadge = (props: Props) => {
  const {
    size = 'l',
    view = 'stroked',
    status = 'system',
    icon,
    label,
    tooltipText,
  } = props;
  const [showTooltip, setShowTooltip] = useFlag();

  const badgeRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Badge
        size={size}
        view={view}
        className={cnStandPageHeaderBadge()}
        label={label}
        status={status}
        onMouseEnter={setShowTooltip.on}
        onMouseLeave={setShowTooltip.off}
        icon={icon}
        ref={badgeRef}
      />
      {showTooltip && tooltipText && (
        <Tooltip anchorRef={badgeRef} size="l" direction="downLeft">
          <Text
            className={cnStandPageHeaderBadge('Tooltip')}
            size="xs"
            lineHeight="xs"
          >
            {tooltipText}
          </Text>
        </Tooltip>
      )}
    </>
  );
};
