import './LibsPage.css';

import { cnMixSpace } from '@consta/uikit/MixSpace';
import { Text } from '@consta/uikit/Text';
import { useAction, useAtom } from '@reatom/npm-react';
import React, { Fragment, useEffect } from 'react';

import { libsIsOneLibAtom } from '##/modules/libs';
import { libsPageItemsAtom, libsPageTitleAtom } from '##/modules/libsPage';
import { navigateToAction, routesNames } from '##/modules/router';
import { cn } from '##/utils/bem';

const cnLibsPage = cn('LibsPage');

export const LibsPage: React.FC = () => {
  const [groups] = useAtom(libsPageItemsAtom);
  const [title] = useAtom(libsPageTitleAtom);
  const [isOneLib] = useAtom(libsIsOneLibAtom);
  const navigateTo = useAction(navigateToAction);

  // если библиотека одна то редереким на сраницу библиотеки
  useEffect(() => {
    if (isOneLib) {
      navigateTo({
        name: routesNames.LIBS_LIB,
        params: { lib: isOneLib.id },
        opts: { replace: true },
      });
    }
  }, []);

  return (
    <div className={cnLibsPage()}>
      <div className={cnLibsPage('Title')}>
        <Text
          className={cnMixSpace({ mB: 'l' })}
          as="h1"
          weight="bold"
          size="3xl"
          lineHeight="m"
        >
          {title}
        </Text>

        <Text size="m" lineHeight="m" className={cnMixSpace({ mB: '4xl' })}>
          Библиотеки дизайн-системы Consta для разработчиков написаны на React и
          хранятся в репозиториях на GitHub — в открытом доступе.
          <br />
          <br />
          Все сущности из этих библиотек (например, элементы интерфейса)
          существуют в виде макетов, их можно найти в соответствующих{' '}
          <Text
            view="link"
            size="m"
            lineHeight="m"
            as="a"
            href="https://www.figma.com/community/file/853774806786762374"
          >
            библиотеках в Figma
          </Text>
        </Text>
      </div>

      {groups.map((group, groupIndex) => {
        const List = group.renderList;

        return (
          <Fragment key={groupIndex}>
            {group.label && group.visibleLabel && (
              <Text
                className={cnMixSpace({ mB: 'l' })}
                as="h2"
                size="2xl"
                lineHeight="m"
              >
                {group.label}
              </Text>
            )}
            {group.description && (
              <Text
                className={cnMixSpace({ mB: 'l' })}
                as="p"
                size="m"
                lineHeight="m"
              >
                {group.description}
              </Text>
            )}
            <List
              className={cnLibsPage('Section')}
              items={group.items}
              maxCount={group.maxCount}
              buttonMore={group.buttonMore}
            />
          </Fragment>
        );
      })}
    </div>
  );
};
