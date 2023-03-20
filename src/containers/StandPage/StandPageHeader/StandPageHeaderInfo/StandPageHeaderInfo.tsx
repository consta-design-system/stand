import './StandPageHeaderInfo.css';

import { IconAlert } from '@consta/icons/IconAlert';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { Text } from '@consta/uikit/Text';
import React, { useMemo } from 'react';
import { useRoute } from 'react-router5';

import { Link } from '##/componets/Link';
import { routesNames } from '##/modules/router';
import { Stand } from '##/types';
import { cn } from '##/utils/bem';

import { getOthersVersion } from '../../helpers';

type Props = {
  stand: Stand;
  className?: string;
};

const iconViewMap = {
  deprecated: 'alert',
  canary: 'success',
  inWork: 'link',
  stable: undefined,
} as const;

const cnStandPageHeaderInfo = cn('StandPageHeaderInfo');

const getInfo = (stand: Stand, lib: string) => {
  const { status } = stand;

  const { stable, canary } = getOthersVersion(stand);
  if (!status || (status === 'stable' && !canary)) {
    return undefined;
  }
  if (status === 'stable') {
    return {
      title: 'Компонент с разными версиями',
      description: canary
        ? 'Это стабильный компонент у которого есть новая версия'
        : undefined,
    };
  }
  if (status === 'canary') {
    return {
      title: stable ? 'Компонент с разными версиями' : 'Тестовый компонент',
      descripton: stable ? (
        <>
          Это новый компонент, у которого есть{' '}
          <Link
            to={`${routesNames.LIBS_LIB_STAND}`}
            params={{
              stand: stable.id,
              lib,
            }}
          >
            стабильная версия
          </Link>
        </>
      ) : undefined,
    };
  }
  if (status === 'deprecated') {
    return {
      title: 'Компонент больше не поддерживается',
      description: stable ? (
        <>
          Используйте актуальную версию —{' '}
          <Link
            to={`${routesNames.LIBS_LIB_STAND}`}
            params={{
              stand: stable.id,
              lib,
            }}
          >
            Stable
          </Link>
        </>
      ) : undefined,
    };
  }
  if (status === 'inWork') {
    return {
      title: 'Компонент в работе',
      description: 'Есть дизайн макеты, но стадия реализации ещё не завершена',
    };
  }
};

export const StandPageHeaderInfo = (props: Props) => {
  const { stand, className } = props;
  const view = iconViewMap[stand.status ?? 'stable'];

  const route = useRoute();

  const info = useMemo(
    () => getInfo(stand, route.route.params.lib as string),
    [],
  );

  if (!info) {
    return null;
  }

  const { title, description } = info;

  return (
    <div
      className={cnStandPageHeaderInfo(
        { withDescription: !!info.description },
        [className, cnMixSpace({ p: 's' })],
      )}
    >
      <IconAlert
        size="s"
        view={view}
        className={cnStandPageHeaderInfo('Icon', [
          cnMixSpace({ mR: 's', mT: description ? '3xs' : undefined }),
        ])}
      />
      <div className={cnStandPageHeaderInfo('Content')}>
        <Text weight="bold" size="s" lineHeight="xs">
          {title}
        </Text>
        {description && (
          <Text
            size="s"
            lineHeight="m"
            className={cnStandPageHeaderInfo('Description', [
              cnMixSpace({ mT: 'xs' }),
            ])}
          >
            {description}
          </Text>
        )}
      </div>
    </div>
  );
};
