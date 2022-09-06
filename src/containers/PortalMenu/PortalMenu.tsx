import './PortalMenu.css';

import { PortalMenuGroup } from '@consta/stand/src/containers/PortalMenu/PortalMenuGroup';
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

const cnPortalMenu = cn('PortalMenu');

const PortalMenuRender = <ITEM = DefaultMenuItem, GROUP = DefaultMenuGroup>(
  props: PortalMenuProps<ITEM, GROUP>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    className,
    additionalControls,

    // groups
    groups: groupsProp,
    getGroupKey,
    getGroupLabel,
    getGroupInitialOpen,

    // packages

    items,
    onItemClick,
    getItemActive,
    getItemDescription,
    getItemLabel,
    getItemOnClick,
    getItemGroupId,
    getItemBadge,
    getItemSubMenu,
    getItemHref,
    getItemParams,

    groupsByItems,
    withoutGroups,
    ...otherProps
  } = withDefaultGetters(props);

  const groups = getGroups<ITEM, GROUP>(
    items,
    getItemGroupId,
    groupsProp,
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
        {groups.map(({ group, items }, groupIndex) => (
          <PortalMenuGroup
            key={cnPortalMenu('Group', { groupIndex })}
            items={items}
            group={group}
            withoutGroups={withoutGroups}
            getGroupInitialOpen={getGroupInitialOpen}
            getGroupLabel={getGroupLabel}
            onItemClick={onItemClick}
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
    </div>
  );
};

export const PortalMenu = forwardRef(PortalMenuRender) as PortalMenuComponent;

export * from '##/containers/PortalMenu/types';
