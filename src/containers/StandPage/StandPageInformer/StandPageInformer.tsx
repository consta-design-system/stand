import './StandPageInformer.css';

import { IconAlert } from '@consta/uikit/IconAlert';
import { Informer } from '@consta/uikit/Informer';
import { Text } from '@consta/uikit/Text';
import React from 'react';

import { Link } from '##/componets/Link';
import { Stand, StandStatus } from '##/exportTypes';
import { routesNames } from '##/modules/router';
import { cn } from '##/utils/bem';

type Props = {
  status?: StandStatus;
  stand: Stand<string>;
  stable?: Stand<string>;
  deprecated?: Stand<string>;
  canary?: Stand<string>;
  className?: string;
};

const cnStandPageInformer = cn('StandPageInformer');

const statusMap = {
  stable: 'system',
  canary: 'success',
  deprecated: 'alert',
} as const;

const statusTitle = {
  stable: 'У этого компонента есть другие версии',
  canary: 'Это экспериментальный компонент',
  deprecated: 'Этот компонент больше не поддерживается!',
} as const;

export const StandPageInformer = (props: Props) => {
  const { status, deprecated, canary, stand, stable, className } = props;

  if (
    !status ||
    status === 'inWork' ||
    (status === 'stable' && !(deprecated || canary)) ||
    !stand.version
  ) {
    return null;
  }

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
                  stand: stable.id,
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
                  stand: deprecated.id,
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
                  stand: canary.id,
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
      title={statusTitle[status]}
      className={cnStandPageInformer(null, [className])}
      view={status !== 'canary' ? 'filled' : 'bordered'}
      label={getContent()}
      status={statusMap[status]}
      icon={status === 'stable' ? IconAlert : undefined}
      size="s"
    />
  );
};
