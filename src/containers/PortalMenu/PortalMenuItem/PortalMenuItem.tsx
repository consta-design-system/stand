import './PortalMenuItem.css';

import { Text } from '@consta/uikit/Text';
import { useTheme } from '@consta/uikit/Theme';
import React from 'react';

import { PortalMenuItemProps } from '##/containers/PortalMenu/types';
import { cn } from '##/utils/bem';

const cnPortalMenuItem = cn('PortalMenuItem');

export const PortalMenuItem = (
  props: Omit<PortalMenuItemProps, 'label'> & {
    children?: React.ReactNode;
    label?: string;
    className?: string;
  },
) => {
  const { onClick, label, active, rightSide, href, children, className } =
    props;

  const { themeClassNames } = useTheme();

  return (
    <a
      className={cnPortalMenuItem(
        {
          active,
        },
        [className],
      )}
      onClick={onClick}
      href={href}
    >
      <div
        className={cnPortalMenuItem('Body', [
          active ? themeClassNames.color.accent : undefined,
        ])}
      >
        {children}
        {label && (
          <Text className={cnPortalMenuItem('Label')} size="s" lineHeight="xs">
            {label}
          </Text>
        )}
        {rightSide && (
          <div className={cnPortalMenuItem('Controls')}>{rightSide}</div>
        )}
      </div>
    </a>
  );
};
