import React from 'react';

import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

export type PortalMenuOnClick<ITEM> = (args: {
  e: React.MouseEvent;
  item: ITEM;
}) => void;

export type PortalMenuPropSortGroup = (
  a: string | number,
  b: string | number,
) => number;

export type DefaultMenuGroup = {
  label?: string;
  initialOpen?: boolean;
  id: string;
};

export type DefaultMenuItem = {
  key: string;
  label: string;
  active?: boolean;
  groupId?: string;
  href: string;
  rightSide: React.ReactElement;
};

// Items

export type PortalMenuPropGetItemKey<ITEM> = (item: ITEM) => string;
export type PortalMenuPropGetItemLabel<ITEM> = (item: ITEM) => string;
export type PortalMenuPropGetItemActive<ITEM> = (
  item: ITEM,
) => boolean | undefined;
export type PortalMenuPropGetItemDescription<ITEM> = (
  item: ITEM,
) => string | undefined;
export type PortalMenuPropGetItemOnClick<ITEM> = (
  item: ITEM,
) => React.EventHandler<React.MouseEvent> | undefined;
export type PortalMenuPropGetItemRightSide<ITEM> = (
  item: ITEM,
) => React.ReactElement | undefined;
export type PortalMenuPropGetItemGroupId<ITEM> = (
  item: ITEM,
) => string | undefined;
export type PortalMenuPropGetItemSubMenu<ITEM> = (
  item: ITEM,
) => ITEM[] | undefined;
export type PortalMenuPropGetItemHref<ITEM> = (item: ITEM) => string;
export type PortalMenuPropGetItemParams<ITEM> = (
  item: ITEM,
) => Record<string, string> | undefined;

// Group

export type PortalMenuPropGetGroupKey<GROUP> = (group: GROUP) => string;
export type PortalMenuPropGetGroupLabel<GROUP> = (
  group: GROUP,
) => string | undefined;
export type PortalMenuPropGetGroupInitialOpen<GROUP> = (
  group: GROUP,
) => boolean | undefined;

export type PortalMenuProps<
  ITEM = DefaultMenuItem,
  GROUP = DefaultMenuGroup,
> = PropsWithHTMLAttributesAndRef<
  {
    onItemClick?: PortalMenuOnClick<ITEM>;
    additionalControls?: React.ReactElement;
    filters?: React.ReactElement;
    items: ITEM[];
    getItemLabel?: PortalMenuPropGetItemLabel<ITEM>;
    getItemActive?: PortalMenuPropGetItemActive<ITEM>;
    getItemRightSide?: PortalMenuPropGetItemRightSide<ITEM>;
    getItemGroupId?: PortalMenuPropGetItemGroupId<ITEM>;
    getItemHref?: PortalMenuPropGetItemHref<ITEM>;
    getGroupKey?: PortalMenuPropGetGroupKey<GROUP>;
    getGroupLabel?: PortalMenuPropGetGroupLabel<GROUP>;
    getGroupInitialOpen?: PortalMenuPropGetGroupInitialOpen<GROUP>;
    groups?: GROUP[];
    withoutGroups?: boolean;
    groupsByItems?: boolean;
  },
  HTMLDivElement
> &
  (ITEM extends { label: DefaultMenuItem['label'] | unknown }
    ? {}
    : {
        getItemLabel: PortalMenuPropGetItemLabel<ITEM>;
      }) &
  (GROUP extends { id: DefaultMenuGroup['id'] | unknown }
    ? {}
    : {
        getGroupKey: PortalMenuPropGetGroupKey<GROUP>;
      });

export type PortalMenuComponent = <
  ITEM = DefaultMenuItem,
  GROUP = DefaultMenuGroup,
>(
  props: PortalMenuProps<ITEM, GROUP>,
) => React.ReactElement | null;

export type PortalMenuItemProps = {
  onClick?: React.MouseEventHandler;
  className?: string;
  label: string;
  active?: boolean;
  rightSide?: React.ReactElement;
  href: string;
};

export type PortalMenuGroupProps<ITEM> = {
  onItemClick?: PortalMenuOnClick<ITEM>;
  className?: string;
  items: ITEM[];
  initialOpen?: boolean;
  label?: string;
  getItemLabel: PortalMenuPropGetItemLabel<ITEM>;
  getItemActive: PortalMenuPropGetItemActive<ITEM>;
  getItemRightSide: PortalMenuPropGetItemRightSide<ITEM>;
  getItemGroupId: PortalMenuPropGetItemGroupId<ITEM>;
  getItemHref: PortalMenuPropGetItemHref<ITEM>;
};
