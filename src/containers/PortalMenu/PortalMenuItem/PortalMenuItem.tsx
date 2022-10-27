import './PortalMenuItem.css';

import { Text } from '@consta/uikit/Text';
import React from 'react';

import { PortalMenuItemProps } from '##/containers/PortalMenu/types';
import { cn } from '##/utils/bem';

const cnPortalMenuItem = cn('PortalMenuItem');

export const PortalMenuItem = (props: PortalMenuItemProps) => {
  const { onClick, className, label, active, rightSide, href } = props;

  return (
    <div className={cnPortalMenuItem(null, [className])}>
      <a
        className={cnPortalMenuItem('Button', {
          active,
        })}
        onClick={onClick}
        href={href}
      >
        <Text
          className={cnPortalMenuItem('Label')}
          size="m"
          lineHeight="m"
          view={active ? 'brand' : 'primary'}
        >
          {label}
        </Text>
        {rightSide && (
          <div className={cnPortalMenuItem('Controls')}>{rightSide}</div>
        )}
      </a>
    </div>
  );
};
