import './LibsPage.css';

import { cnMixSpace } from '@consta/uikit/MixSpace';
import { Text } from '@consta/uikit/Text';
import { useAtom } from '@reatom/react';
import React, { useEffect } from 'react';
import { useRouter } from 'react-router5';

import { LibCard } from '##/componets/LibCard';
import { libsAtom } from '##/modules/libs';
import { routesNames } from '##/modules/router';
import { cn } from '##/utils/bem';

const cnLibsPage = cn('LibsPage');

export const LibsPage: React.FC = () => {
  const [libs] = useAtom(libsAtom);
  const router = useRouter();

  // если библиотека одна то редереким на сраницу библиотеки
  useEffect(() => {
    if (libs.length <= 1) {
      router.navigate(
        routesNames.LIBS_STAND,
        { stand: libs[0].id },
        { replace: true },
      );
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
          Библиотеки
        </Text>

        <Text size="m" lineHeight="m" className={cnMixSpace({ mB: 'xl' })}>
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

      <div className={cnLibsPage('Section')}>
        {libs.map((lib) => (
          <LibCard lib={lib} />
        ))}
      </div>
    </div>
  );
};
