import { useFlag } from '@consta/uikit/useFlag';

import { ListCardItem } from '##/types';

const getShortArray = (items: ListCardItem[], maxCount?: number) => {
  if (typeof maxCount === 'undefined') {
    return items;
  }

  return items.slice(0, maxCount);
};

export const useMaxLenth = (
  items: ListCardItem[],
  maxCount?: number,
  buttonMore?: boolean,
) => {
  const [isOpen, setOpen] = useFlag();
  const shortItems = getShortArray(items, maxCount);

  return [
    isOpen ? items : shortItems,
    setOpen.toggle,
    isOpen || typeof maxCount === 'undefined' || maxCount >= items.length
      ? false
      : buttonMore,
  ] as const;
};
