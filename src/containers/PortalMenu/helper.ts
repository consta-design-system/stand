// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import React from 'react';

import {
  DefaultMenuGroup,
  DefaultMenuItem,
  PortalMenuPropGetGroupKey,
  PortalMenuPropGetGroupLabel,
  PortalMenuPropGetItemActive,
  PortalMenuPropGetItemGroupId,
  PortalMenuPropGetItemHref,
  PortalMenuPropGetItemLabel,
  PortalMenuPropGetItemRightSide,
  PortalMenuProps,
} from '../PortalMenu/types';

// Items

const defaultGetItemLabel: PortalMenuPropGetItemLabel<DefaultMenuItem> = (
  item,
) => item.label;
const defaultGetItemActive: PortalMenuPropGetItemActive<DefaultMenuItem> = (
  item,
) => item.active;
const defaultGetItemRightSide: PortalMenuPropGetItemRightSide<
  DefaultMenuItem
> = (item) => item.rightSide;
const defaultGetItemGroupId: PortalMenuPropGetItemGroupId<DefaultMenuItem> = (
  item,
) => item.groupId;
const defaultGetItemHref: PortalMenuPropGetItemHref<DefaultMenuItem> = (item) =>
  item.href;

// Group

export const defaultGetGroupKey: PortalMenuPropGetGroupKey<DefaultMenuGroup> = (
  item,
) => item.id;
export const defaultGetGroupLabel: PortalMenuPropGetGroupLabel<
  DefaultMenuGroup
> = (item) => item.label;

export function withDefaultGetters<
  ITEM = DefaultMenuItem,
  GROUP = DefaultMenuGroup,
>(props: PortalMenuProps<ITEM, GROUP>) {
  return {
    ...props,
    getItemLabel: props.getItemLabel ?? defaultGetItemLabel,
    getItemActive: props.getItemActive ?? defaultGetItemActive,
    getItemRightSide: props.getItemRightSide ?? defaultGetItemRightSide,
    getItemGroupId: props.getItemGroupId ?? defaultGetItemGroupId,
    getItemHref: props.getItemHref ?? defaultGetItemHref,
    getGroupKey: props.getGroupKey ?? defaultGetGroupKey,
    getGroupLabel: props.getGroupLabel ?? defaultGetGroupLabel,
  };
}
