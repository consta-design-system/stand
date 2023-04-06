import { useTheme } from '@consta/uikit/Theme';
import React from 'react';

import { ListCardComponent } from '##/types';

import { ListCardBannerItem } from '../ListCardBannerItem';
import { cnListCardBox } from '../ListCardBox';
import { ListCardButtonMore } from '../ListCardButtonMore';
import { useMaxLenth } from '../useMaxLenth';

export const ListCardBanner: ListCardComponent = ({
  items,
  maxCount,
  buttonMore,
  className,
}) => {
  const { themeClassNames } = useTheme();
  const [shortItems, toggle, showButtonMore] = useMaxLenth(
    items,
    maxCount,
    buttonMore,
  );

  return (
    <div className={cnListCardBox(null, [className])}>
      <div className={cnListCardBox('List', [themeClassNames.color.accent])}>
        {shortItems.map((item, index) => (
          <ListCardBannerItem {...item} key={index} />
        ))}
      </div>

      <ListCardButtonMore onClick={toggle} visible={showButtonMore} />
    </div>
  );
};
