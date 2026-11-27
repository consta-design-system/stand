import { TextPropView } from '@consta/uikit/Text';

import {
  ExampleDefaultItem,
  ExampleItemStatus,
  ExamplePropGetItemDescription,
  ExamplePropGetItemLabel,
  ExamplePropGetItemNode,
  ExamplePropGetItemStatus,
  ExampleProps,
} from './types';

const defaultGetItemLabel: ExamplePropGetItemLabel<ExampleDefaultItem> = (
  item,
) => item.label;

const defaultGetItemDescription: ExamplePropGetItemDescription<
  ExampleDefaultItem
> = (item) => item.description;

const defaultGetItemNode: ExamplePropGetItemNode<ExampleDefaultItem> = (item) =>
  item.node;

const defaultGetItemStatus: ExamplePropGetItemStatus<ExampleDefaultItem> = (
  item,
) => item.status;

export const withDefaultGetters = (props: ExampleProps) => ({
  ...props,
  getItemLabel: props.getItemLabel || defaultGetItemLabel,
  getItemDescription: props.getItemDescription || defaultGetItemDescription,
  getItemNode: props.getItemNode || defaultGetItemNode,
  getItemStatus: props.getItemStatus || defaultGetItemStatus,
});

export const getDisplay = (lastPoint?: number | string | false) => {
  if (!lastPoint || lastPoint === 'flex') {
    return 'flex';
  }
  if (lastPoint === 1 || lastPoint === '1') {
    return 'block';
  }
  return 'grid';
};

export const getCol = (lastPoint?: number | string | false) => {
  if (!lastPoint || lastPoint === 'flex') {
    return undefined;
  }
  if (lastPoint === 1 || lastPoint === '1') {
    return undefined;
  }
  return lastPoint;
};

export const mapExamples = <ITEM>(
  getItemDescription: ExamplePropGetItemDescription<ITEM>,
  getItemLabel: ExamplePropGetItemLabel<ITEM>,
  getItemNode: ExamplePropGetItemNode<ITEM>,
  getItemStatus: ExamplePropGetItemStatus<ITEM>,
  children?: ExampleProps['children'],
  items?: ITEM[],
): ExampleDefaultItem[] => {
  if (items) {
    return items.map((item) => ({
      label: getItemLabel(item),
      description: getItemDescription(item),
      node: getItemNode(item),
      status: getItemStatus(item),
    }));
  }
  if (Array.isArray(children)) {
    return children.map((item) => ({
      node: item,
    }));
  }
  if (children) {
    return [{ node: children }];
  }
  return [];
};

export const isWithInfo = (examples: ExampleDefaultItem[]) =>
  Boolean(examples.find((item) => item.label || item.description));

export const mapStatusToTextView: Record<ExampleItemStatus, TextPropView> = {
  error: 'alert',
  success: 'success',
  system: 'secondary',
  warning: 'warning',
};
