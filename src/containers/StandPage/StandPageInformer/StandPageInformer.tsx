import './StandPageInformer.css';

import { IconAlert } from '@consta/uikit/IconAlert';
import { Informer } from '@consta/uikit/Informer';
import { Text } from '@consta/uikit/Text';
import React from 'react';

import { Link } from '##/componets/Link';
import { routesNames } from '##/modules/router';
import { Stand, StandStatus } from '##/types';
import { cn } from '##/utils/bem';

type Props = {
  status?: StandStatus;
  stand: Stand<string>;
  stable?: Stand<string>;
  deprecated?: Stand<string>;
  canary?: Stand<string>;
  className?: string;
  lib: string;
};

const cnStandPageInformer = cn('StandPageInformer');

const statusTitle = {
  stable: 'У этого компонента есть другая версия',
  canary: 'Это совсем новый компонент',
  deprecated: 'Этот компонент больше не поддерживается',
} as const;

export const StandPageInformer = (props: Props) => {
  const { status, deprecated, canary, stand, stable, className, lib } = props;

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
      if (!stable) {
        return null;
      }
      return (
        <>
          <Text size="s" lineHeight="m">
            В будущем он заменит стабильную версию. Всё уже работает, но
            параметры могут немного поменяться.{' '}
            <Text
              view="link"
              size="s"
              lineHeight="m"
              as="a"
              href="https://github.com/consta-design-system/uikit/issues/new/choose"
            >
              Обсудить на GitHub
            </Text>
          </Text>
          <Text size="s" lineHeight="m">
            Стабильная версия —{' '}
            <Link
              to={`${routesNames.LIBS_LIB_STAND}`}
              className={cnStandPageInformer('Link')}
              params={{
                stand: stable.id,
                lib,
              }}
            >
              {`v${stable.version} Stable`}
            </Link>
          </Text>
        </>
      );
    }
    if (status === 'deprecated') {
      if (!stable) {
        return null;
      }
      return (
        <Text size="s" lineHeight="m">
          Лучше использовать актуальную версию —{' '}
          <Link
            to={`${routesNames.LIBS_LIB_STAND}`}
            className={cnStandPageInformer('Link')}
            params={{
              stand: stable.id,
              lib,
            }}
          >
            Stable
          </Link>
        </Text>
      );
    }
    if (status === 'stable') {
      return (
        <>
          {deprecated && (
            <Text size="s" lineHeight="m">
              Устаревшая —{' '}
              <Link
                to={`${routesNames.LIBS_LIB_STAND}`}
                className={cnStandPageInformer('Link')}
                params={{
                  stand: deprecated.id,
                  lib,
                }}
              >
                Deprecated
              </Link>
            </Text>
          )}
          {canary && (
            <Text size="s" lineHeight="m">
              Новая —{' '}
              <Link
                to={`${routesNames.LIBS_LIB_STAND}`}
                className={cnStandPageInformer('Link')}
                params={{
                  stand: canary.id,
                  lib,
                }}
              >
                Canary
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
      view="filled"
      label={getContent()}
      status="system"
      icon={IconAlert}
      size="s"
    />
  );
};
