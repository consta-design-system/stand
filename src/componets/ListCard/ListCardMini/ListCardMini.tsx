import React from 'react';

import { ListCardComponent } from '##/types';

import { cnListCardBox } from '../ListCardBox';
import { ListCardButtonMore } from '../ListCardButtonMore';
import { ListCardMiniItem } from '../ListCardMiniItem';
import { useMaxLenth } from '../useMaxLenth';

export const ListCardMini: ListCardComponent = ({
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
          <ListCardMiniItem {...item} key={index} />
        ))}
      </div>
      <ListCardButtonMore onClick={toggle} visible={showButtonMore} />
    </div>
  );
};
