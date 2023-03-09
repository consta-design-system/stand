import './PortalMenuItem.css';

import { Text } from '@consta/uikit/Text';
import { useTheme } from '@consta/uikit/Theme';
import React from 'react';

import { PortalMenuItemProps } from '##/containers/PortalMenu/types';
import { cn } from '##/utils/bem';

const cnPortalMenuItem = cn('PortalMenuItem');

export const PortalMenuItem = (props: PortalMenuItemProps) => {
  const { onClick, label, active, rightSide, href } = props;

  const { themeClassNames } = useTheme();

  return (
    <a
      className={cnPortalMenuItem({
        active,
      })}
      onClick={onClick}
      href={href}
    >
      <div
        className={cnPortalMenuItem('Body', [
          active ? themeClassNames.color.invert : undefined,
        ])}
      >
        <Text className={cnPortalMenuItem('Label')} size="s" lineHeight="xs">
          {label}
        </Text>
        {rightSide && (
          <div className={cnPortalMenuItem('Controls')}>{rightSide}</div>
        )}
      </div>
    </a>
  );
};
