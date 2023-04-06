import './ListCardBannerItem.css';

import { Button } from '@consta/uikit/Button';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { Text } from '@consta/uikit/Text';
import React from 'react';

import { useLink } from '##/hooks/useLink';
import { ListCardItem } from '##/types';
import { cn } from '##/utils/bem';

const cnListCardBannerItem = cn('ListCardBannerItem');

export const ListCardBannerItem = (props: ListCardItem) => {
  const { label, description, routeName, routeParams } = props;

  const [href, onClick] = useLink({
    to: routeName,
    params: routeParams,
  });

  return (
    <div
      className={cnListCardBannerItem(null, [cnMixSpace({ p: 'l', pB: 'xl' })])}
    >
      <Text
        size="s"
        lineHeight="xs"
        className={cnListCardBannerItem('Title', [cnMixSpace({ mB: 's' })])}
        as="a"
        href={href}
        onClick={onClick}
        weight="bold"
      >
        {label}
      </Text>
      <div className={cnListCardBannerItem('Info')}>
        <Text
          className={cnListCardBannerItem('Description')}
          size="s"
          lineHeight="m"
          as="p"
        >
          {description}
        </Text>
        <Button
          className={cnListCardBannerItem('Button')}
          view="secondary"
          label="Посмотреть"
          as="a"
          href={href}
          onClick={onClick}
        />
      </div>
    </div>
  );
};
