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
      <Text
        className={cnMixSpace({ mB: '2xl' })}
        as="h1"
        weight="semibold"
        size="4xl"
        lineHeight="m"
      >
        Обзор
      </Text>

      <Text
        as="h2"
        size="3xl"
        weight="semibold"
        className={cnMixSpace({ mB: 'xl' })}
      >
        Библиотеки компонентов
      </Text>

      {libs.map((lib) => (
        <LibCard
          key={lib.id}
          id={lib.id}
          title={lib.title}
          description={lib.shortDescription || lib.description}
          image={lib.image}
        />
      ))}
    </div>
  );
};
