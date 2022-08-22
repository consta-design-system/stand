import './StandPageInformer.css';

import { Informer } from '@consta/uikit/Informer';
import { Text } from '@consta/uikit/Text';
import React from 'react';

import { Link } from '##/componets/Link';
import { Stand } from '##/exportTypes';
import { routesNames } from '##/modules/router';
import { cn } from '##/utils/bem';

type Props = {
  status?: Stand['status'];
  stand: Stand<string>;
  stable?: Stand<string>;
  deprecated?: Stand<string>;
  canary?: Stand<string>;
  libId?: string;
  className?: string;
};

const cnStandPageInformer = cn('StandPageInformer');

export const StandPageInformer = (props: Props) => {
  const {
    status = 'inWork',
    deprecated,
    canary,
    stand,
    stable,
    className,
    libId = 'uikit',
  } = props;

  if (status === 'inWork' || (status === 'stable' && !(deprecated || canary))) {
    return null;
  }

  const getStatus = () => {
    if (status === 'stable') {
      return 'system';
    }
    if (status === 'canary') {
      return 'success';
    }
    if (status === 'deprecated') {
      return 'alert';
    }
  };

  const getTitle = () => {
    if (status === 'deprecated') {
      return 'Этот компонент больше не поддерживается!';
    }
    if (status === 'stable') {
      return 'У этого компонента есть другие версии';
    }
    if (status === 'canary') {
      return 'Это экспериментальный компонент';
    }
  };

  const getContent = () => {
    if (status === 'canary') {
      return (
        <>
          Компонент имеет нестабильный API. Вы можете внести предложения{' '}
          <Text
            view="link"
            size="m"
            lineHeight="xs"
            as="a"
            href="https://github.com/consta-design-system/uikit/issues/new/choose"
          >
            в обсуждении на GitHub
          </Text>
        </>
      );
    }
    if (status === 'deprecated') {
      return (
        <>
          <Text size="m" lineHeight="xs">
            Начиная с версии библиотеки <b>{stand?.version}</b> компонент больше
            не поддерживается командой.
          </Text>
          <Text size="m" lineHeight="xs">
            Не рекомендуем использовать его в проектах.
          </Text>
          {stable && (
            <Text size="m" lineHeight="xs">
              Стабильная версия компонента:{' '}
              <Link
                to={`${routesNames.LIBS_STAND}`}
                className={cnStandPageInformer('Link', { deprecated: true })}
                params={{
                  stand:
                    `${libId}-${stable.group}-${stable.id}-${stable.status}`
                      .replace(/\W|_/g, '-')
                      .toLowerCase(),
                }}
              >
                {stable.version}
              </Link>
              .
            </Text>
          )}
        </>
      );
    }
    if (status === 'stable') {
      return (
        <>
          {deprecated && (
            <Text size="m" lineHeight="xs">
              Устаревшие (deprecated):{' '}
              <Link
                to={`${routesNames.LIBS_STAND}`}
                className={cnStandPageInformer('Link')}
                params={{
                  stand:
                    `${libId}-${deprecated.group}-${deprecated.id}-${deprecated.status}`
                      .replace(/\W|_/g, '-')
                      .toLowerCase(),
                }}
              >
                {deprecated.version}
              </Link>
            </Text>
          )}
          {canary && (
            <Text size="m" lineHeight="xs">
              Обновленные (canary):{' '}
              <Link
                to={`${routesNames.LIBS_STAND}`}
                className={cnStandPageInformer('Link')}
                params={{
                  stand:
                    `${libId}-${canary.group}-${canary.id}-${canary.status}`
                      .replace(/\W|_/g, '-')
                      .toLowerCase(),
                }}
              >
                {canary.version}
              </Link>
            </Text>
          )}
        </>
      );
    }
  };

  return (
    <Informer
      title={getTitle()}
      className={cnStandPageInformer(null, [className])}
      view={status === 'deprecated' ? 'filled' : 'bordered'}
      label={getContent()}
      status={getStatus()}
      size="s"
    />
  );
};
