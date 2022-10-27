import './PortalMenuGroup.css';

import { Collapse } from '@consta/uikit/Collapse';
import { useComponentSize } from '@consta/uikit/useComponentSize';
import { useFlag } from '@consta/uikit/useFlag';
import React, { useRef } from 'react';

import { PortalMenuGroupProps } from '##/containers/PortalMenu/types';
import { cn } from '##/utils/bem';

import { PortalMenuItem } from '../PortalMenuItem/PortalMenuItem';

const cnPortalMenuGroup = cn('PortalMenuGroup');

export const PortalMenuGroup = <ITEM,>(props: PortalMenuGroupProps<ITEM>) => {
  const {
    items,
    className,
    getItemActive,
    getItemHref,
    getItemRightSide,
    getItemLabel,
    onItemClick,
    label,
    initialOpen,
  } = props;

  const [isOpen, setIsOpen] = useFlag(initialOpen);

  const containerRef = useRef<HTMLDivElement>(null);

  const { height } = useComponentSize(containerRef);

  return (
    <div className={cnPortalMenuGroup(null, [className])}>
      <Collapse
        iconPosition="right"
        size="m"
        directionIcon="down"
        closeDirectionIcon="up"
        label={label || ''}
        isOpen={isOpen}
        onClick={setIsOpen.toogle}
        style={{
          ['--portal-collapse-height' as string]: `${height}px`,
        }}
      >
        <div className={cnPortalMenuGroup('List')} ref={containerRef}>
          {items.map((item, itemIndex) => {
            return (
              <PortalMenuItem
                key={cnPortalMenuGroup('Item', { itemIndex })}
                onClick={(e) => onItemClick?.({ e, item })}
                active={getItemActive(item)}
                label={getItemLabel(item)}
                rightSide={getItemRightSide(item)}
                href={getItemHref(item)}
              />
            );
          })}
        </div>
      </Collapse>
    </div>
  );
};
