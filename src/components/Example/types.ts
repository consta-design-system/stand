import { PropsWithHTMLAttributes } from '@consta/uikit/__internal__/src/utils/types/PropsWithHTMLAttributes';

export type ExampleItemStatus = 'success' | 'error' | 'warning' | 'system';

export type ExampleDefaultItem = {
  node?: React.ReactNode;
  label?: string | number;
  description?: string | number | React.ReactNode;
  status?: ExampleItemStatus;
};

export type ExamplePropGetItemLabel<ITEM> = (
  item: ITEM,
) => ExampleDefaultItem['label'];

export type ExamplePropGetItemNode<ITEM> = (
  item: ITEM,
) => ExampleDefaultItem['node'];

export type ExamplePropGetItemDescription<ITEM> = (
  item: ITEM,
) => ExampleDefaultItem['description'];

export type ExamplePropGetItemStatus<ITEM> = (
  item: ITEM,
) => ExampleDefaultItem['status'];

export type ExampleProps<ITEM = ExampleDefaultItem> = PropsWithHTMLAttributes<
  {
    children?: React.ReactNode | React.ReactNode[];
    col?: number | Record<string, number>;
    separately?: boolean;
    items?: ITEM[];
    getItemNode?: ExamplePropGetItemNode<ITEM>;
    getItemLabel?: ExamplePropGetItemLabel<ITEM>;
    getItemDescription?: ExamplePropGetItemDescription<ITEM>;
    getItemStatus?: ExamplePropGetItemStatus<ITEM>;
  },
  HTMLDivElement
>;

export type ExampleComponent = <ITEM = ExampleDefaultItem>(
  props: ExampleProps<ITEM>,
) => React.ReactElement | null;
