import './ListCardListItem.css';

import { IconForward } from '@consta/icons/IconForward';
import { Button } from '@consta/uikit/Button';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { Text } from '@consta/uikit/Text';
import React from 'react';

import { useLink } from '##/hooks/useLink';
import { ListCardItem } from '##/types';
import { cn } from '##/utils/bem';

const cnListCardListItem = cn('ListCardListItem');

export const ListCardListItem = (
  props: ListCardItem & { className?: string },
) => {
  const { label, routeName, routeParams, icon, className } = props;

  const [href, onClick] = useLink({
    to: routeName,
    params: routeParams,
  });

  const Icon = icon;

  return (
    <div
      className={cnListCardListItem(null, [cnMixSpace({ p: 'l' }), className])}
    >
      {Icon && <Icon view="link" className={cnListCardListItem('Icon')} />}
      <Text
        size="s"
        lineHeight="xs"
        className={cnListCardListItem('Text')}
        as="a"
        href={href}
        onClick={onClick}
        view="link"
        weight="bold"
      >
        {label}
      </Text>
      <Button
        as="a"
        className={cnListCardListItem('Button')}
        iconLeft={IconForward}
        onlyIcon
        view="ghost"
        href={href}
        onClick={onClick}
      />
    </div>
  );
};
