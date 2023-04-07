import React from 'react';

import { ListCardComponent } from '##/types';

import { ListCardBigItem } from '../ListCardBigItem';
import { cnListCardBox } from '../ListCardBox';
import { ListCardButtonMore } from '../ListCardButtonMore';
import { useMaxLenth } from '../useMaxLenth';

export const ListCardBig: ListCardComponent = ({
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

  return (
    <div className={cnListCardBox(null, [className])}>
      <div className={cnListCardBox('List', { adaptive: true })}>
        {shortItems.map((item, index) => (
          <ListCardBigItem {...item} key={index} />
        ))}
      </div>
      <ListCardButtonMore onClick={toggle} visible={showButtonMore} />
    </div>
  );
};
