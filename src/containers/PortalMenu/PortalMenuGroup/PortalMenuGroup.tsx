import './PortalMenuGroup.css';

import { Collapse } from '@consta/uikit/Collapse';
import { useComponentSize } from '@consta/uikit/useComponentSize';
import { useFlag } from '@consta/uikit/useFlag';
import React, { useEffect, useRef } from 'react';

import { PortalMenuGroupProps } from '##/containers/PortalMenu/types';
import { cn } from '##/utils/bem';

import { PortalMenuItem } from '../PortalMenuItem/PortalMenuItem';

const cnPortalMenuGroup = cn('PortalMenuGroup');

export const PortalMenuGroup = <ITEM, GROUP>(
  props: PortalMenuGroupProps<ITEM, GROUP>,
) => {
  const {
    group,
    items,
    className,
    getGroupLabel,
    getItemActive,
    getItemHref,
    getItemBadge,
    getItemLabel,
    getItemDescription,
    getItemGroupId,
    getItemOnClick,
    getGroupInitialOpen,
    getItemParams,
    getItemSubMenu,
    onItemClick,
  } = props;

  const [isOpen, setIsOpen] = useFlag();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (group) {
      setIsOpen[getGroupInitialOpen(group) ? 'on' : 'off']();
    }
  }, [group]);

  const { height } = useComponentSize(containerRef);

  return (
    <div className={cnPortalMenuGroup(null, [className])}>
      <Collapse
        iconPosition="right"
        size="m"
        directionIcon="down"
        closeDirectionIcon="up"
        label={group ? getGroupLabel(group) ?? '' : ''}
        isOpen={isOpen}
        onClick={setIsOpen.toogle}
        style={{
          ['--portal-collapse-height' as string]: `${height}px`,
        }}
      >
        <div className={cnPortalMenuGroup('List')} ref={containerRef}>
          {items.map((item, itemIndex) => (
            <PortalMenuItem
              key={cnPortalMenuGroup('Item', { itemIndex })}
              item={item}
              onClick={(e) => onItemClick?.({ e, item })}
              getItemActive={getItemActive}
              getItemDescription={getItemDescription}
              getItemLabel={getItemLabel}
              getItemOnClick={getItemOnClick}
              getItemGroupId={getItemGroupId}
              getItemBadge={getItemBadge}
              getItemSubMenu={getItemSubMenu}
              getItemHref={getItemHref}
              getItemParams={getItemParams}
            />
          ))}
        </div>
      </Collapse>
    </div>
  );
};
