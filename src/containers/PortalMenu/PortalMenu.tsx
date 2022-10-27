import './PortalMenu.css';

import { getGroups } from '@consta/uikit/__internal__/src/utils/getGroups';
import { useForkRef } from '@consta/uikit/useForkRef';
import React, { forwardRef, useRef } from 'react';

import { withDefaultGetters } from '##/containers/PortalMenu/helper';
import {
  DefaultMenuGroup,
  DefaultMenuItem,
  PortalMenuComponent,
  PortalMenuProps,
} from '##/containers/PortalMenu/types';
import { cn } from '##/utils/bem';

import { PortalMenuGroup } from './PortalMenuGroup';
import { PortalMenuItem } from './PortalMenuItem';

const cnPortalMenu = cn('PortalMenu');

const PortalMenuRender = <ITEM = DefaultMenuItem, GROUP = DefaultMenuGroup>(
  props: PortalMenuProps<ITEM, GROUP>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    className,
    additionalControls,
    filters,

    // groups
    groups: groupsProp,
    getGroupKey,
    getGroupLabel,
    getGroupInitialOpen,

    // packages

    items,
    onItemClick,
    getItemActive,
    getItemLabel,
    getItemGroupId,
    getItemRightSide,
    getItemHref,

    groupsByItems,
    withoutGroups,
    ...otherProps
  } = withDefaultGetters(props);

  const groups = getGroups<ITEM, GROUP>(
    items,
    getItemGroupId,
    groupsByItems ? undefined : groupsProp,
    groupsByItems ? undefined : getGroupKey,
    undefined,
  );

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cnPortalMenu(null, [className])}
      ref={useForkRef([containerRef, ref])}
      {...otherProps}
    >
      {additionalControls}
      <div className={cnPortalMenu('List')}>
        {!withoutGroups && groups.length
          ? groups.map(({ group, items, key }, groupIndex) => {
              return (
                <PortalMenuGroup
                  key={cnPortalMenu('Group', { groupIndex })}
                  items={items}
                  initialOpen={group ? getGroupInitialOpen(group) : true}
                  label={group ? getGroupLabel(group) : key.toString()}
                  onItemClick={onItemClick}
                  getItemActive={getItemActive}
                  getItemLabel={getItemLabel}
                  getItemGroupId={getItemGroupId}
                  getItemRightSide={getItemRightSide}
                  getItemHref={getItemHref}
                />
              );
            })
          : items.map((item, itemIndex) => (
              <PortalMenuItem
                key={cnPortalMenu('Item', { itemIndex })}
                onClick={(e) => onItemClick?.({ e, item })}
                active={getItemActive(item)}
                label={getItemLabel(item)}
                rightSide={getItemRightSide(item)}
                href={getItemHref(item)}
              />
            ))}
      </div>
      {filters}
    </div>
  );
};

export const PortalMenu = forwardRef(PortalMenuRender) as PortalMenuComponent;

export * from './types';
