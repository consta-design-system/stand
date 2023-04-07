import './ListCardList.css';

import { cnMixCard } from '@consta/uikit/MixCard';
import { useComponentBreakpoints } from '@consta/uikit/useComponentBreakpoints';
import React, { useRef } from 'react';

import { ListCardComponent, ListCardItem } from '##/types';
import { cn } from '##/utils/bem';

import { cnListCardBox } from '../ListCardBox';
import { ListCardButtonMore } from '../ListCardButtonMore';
import { ListCardListItem } from '../ListCardListItem';
import { useMaxLenth } from '../useMaxLenth';

const cnListCardList = cn('ListCardList');

const getColumns = (
  items: ListCardItem[],
  isDesctop: boolean,
): [ListCardItem[], ListCardItem[]] => {
  if (!isDesctop) {
    return [items, []];
  }
  const columns: [ListCardItem[], ListCardItem[]] = [[], []];
  for (let index = 1; index <= items.length; index++) {
    columns[index % 2 ? 0 : 1].push(items[index - 1]);
  }

  return columns;
};

const renderCol = (items: ListCardItem[]) => {
  if (items.length) {
    return (
      <div
        className={cnListCardList('Col', [
          cnMixCard({ border: true, form: 'round' }),
        ])}
      >
        {items.map((item, index) => (
          <ListCardListItem
            {...item}
            key={index}
            className={cnListCardList('Item')}
          />
        ))}
      </div>
    );
  }
};

export const ListCardList: ListCardComponent = ({
  items,
  maxCount,
  buttonMore,
  className,
}) => {
  const [shortItems, toggle, showButtonMore] = useMaxLenth(
    items,
    maxCount,
    buttonMore,
  );

  const ref = useRef<HTMLDivElement>(null);
  const { desctop } = useComponentBreakpoints(ref, { desctop: 800 });
  const [col1, col2] = getColumns(shortItems, desctop);

  return (
    <div ref={ref} className={cnListCardBox(null, [className])}>
      <div ref={ref} className={cnListCardList({ desctop })}>
        {renderCol(col1)}
        {renderCol(col2)}
      </div>

      <ListCardButtonMore visible={showButtonMore} onClick={toggle} />
    </div>
  );
};
