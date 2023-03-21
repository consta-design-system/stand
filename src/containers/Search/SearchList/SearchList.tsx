import './SearchList.css';

import { cnMixSpace } from '@consta/uikit/MixSpace';
import { Text } from '@consta/uikit/Text';
import { useAction, useAtom } from '@reatom/npm-react';
import React, { memo } from 'react';
import { useRouter } from 'react-router5';

import { buildLink } from '##/hooks/useLink';
import { routesNames } from '##/modules/router';
import {
  historyItemOnClickAction,
  searchListDataAtom,
  searchListIsResultAtom,
  searchListLengthAtom,
  standOnClickAction,
} from '##/modules/search';
import { cn } from '##/utils/bem';

import { SearchListItem } from '../SearchListItem';

const cnSearchList = cn('SearchList');

export const SearchList = memo(({ className }: { className?: string }) => {
  const [data] = useAtom(searchListDataAtom);
  const [length] = useAtom(searchListLengthAtom);
  const [listIsResult] = useAtom(searchListIsResultAtom);
  const router = useRouter();
  const standOnClickHandle = useAction(standOnClickAction);
  const historyItemOnClickHandle = useAction(historyItemOnClickAction);

  if (listIsResult && !length) {
    return (
      <div
        className={cnSearchList('NoResult', [
          cnMixSpace({ p: 'm' }),
          className,
        ])}
      >
        <Text className={cnMixSpace({ mB: '3xs' })} size="s">
          Ничего не нашли
        </Text>
        <Text view="secondary" size="xs">
          Попробуйте спросить по-другому
        </Text>
      </div>
    );
  }

  return (
    <div className={cnSearchList({ listIsResult }, [className])}>
      {data.map((item, index) => {
        const { type, label } = item;
        if (type === 'history') {
          return (
            <SearchListItem
              key={index}
              type={type}
              label={label}
              onClick={() => historyItemOnClickHandle(label)}
            />
          );
        }

        const [href, onClick] = buildLink(
          router,
          {
            to: routesNames.LIBS_LIB_STAND,
            params: { lib: item.lib, stand: item.id },
          },
          () => standOnClickHandle(item),
        );

        const { description, status } = item;

        return (
          <SearchListItem
            key={index}
            href={href}
            onClick={onClick}
            type={type}
            label={label}
            description={description}
            status={status}
          />
        );
      })}
    </div>
  );
});
