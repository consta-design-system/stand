import './ListCardMiniItem.css';

import { cnMixCard } from '@consta/uikit/MixCard';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { Text } from '@consta/uikit/Text';
import React from 'react';

import { useLink } from '##/hooks/useLink';
import { ListCardItem } from '##/types';
import { cn } from '##/utils/bem';

const cnListCardMiniItem = cn('ListCardMiniItem');

export const ListCardMiniItem = (props: ListCardItem) => {
  const { label, description, routeName, routeParams } = props;

  const [href, onClick] = useLink({
    to: routeName,
    params: routeParams,
  });

  return (
    <div
      className={cnListCardMiniItem(null, [
        cnMixCard({ border: true, form: 'round' }),
        cnMixSpace({ p: 'l', pB: 'xl' }),
      ])}
    >
      <div className={cnListCardMiniItem('Info')}>
        <Text
          size="s"
          lineHeight="xs"
          className={cnListCardMiniItem('Title', [
            description ? cnMixSpace({ mB: 's' }) : undefined,
          ])}
          as="a"
          href={href}
          onClick={onClick}
          view="link"
          weight="bold"
        >
          {label}
        </Text>
        <Text size="s" lineHeight="m" as="p">
          {description}
        </Text>
      </div>
    </div>
  );
};
