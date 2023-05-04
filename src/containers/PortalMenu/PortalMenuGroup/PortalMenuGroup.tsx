import './PortalMenuGroup.css';

import { Collapse } from '@consta/uikit/Collapse';
import { useFlag } from '@consta/uikit/useFlag';
import React, { useEffect, useRef } from 'react';

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

  const renders = useRef(0).current++;

  useEffect(() => {
    if (initialOpen) {
      setIsOpen.on();
    }
  }, [initialOpen]);

  return (
    <div
      className={cnPortalMenuGroup({ firstRender: renders === 0 }, [className])}
    >
      <Collapse
        iconPosition="right"
        size="xs"
        directionIcon="down"
        closeDirectionIcon="up"
        label={label || ''}
        isOpen={isOpen}
        onClick={setIsOpen.toggle}
        iconView="ghost"
        view="secondary"
        hoverEffect
        horizontalSpace="s"
      >
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
      </Collapse>
    </div>
  );
};
