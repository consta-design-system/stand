import './LibsPage.css';

import { cnMixSpace } from '@consta/uikit/MixSpace';
import { Text } from '@consta/uikit/Text';
import { useAction, useAtom } from '@reatom/npm-react';
import React, { Fragment, useEffect } from 'react';

import { LibDescription } from '##/componets/LibDescription';
import { libsIsOneLibAtom } from '##/modules/libs';
import {
  libsPageDescriptionAtom,
  libsPageItemsAtom,
  libsPageTitleAtom,
} from '##/modules/libsPage';
import { navigateToAction, routesNames } from '##/modules/router';
import { cn } from '##/utils/bem';

const cnLibsPage = cn('LibsPage');

export const LibsPage: React.FC = () => {
  const [groups] = useAtom(libsPageItemsAtom);
  const [title] = useAtom(libsPageTitleAtom);
  const [description] = useAtom(libsPageDescriptionAtom);
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
      <Text
        className={cnMixSpace({ mB: 'l' })}
        as="h1"
        weight="bold"
        size="3xl"
        lineHeight="m"
        view="primary"
      >
        {title}
      </Text>

      {description && (
        <div className={cnMixSpace({ mB: '3xl' })}>
          <LibDescription description={description} />
        </div>
      )}

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
                view="primary"
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
                view="primary"
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
