import { atom } from '@reatom/core';
import { NavigationToProps } from 'reatom-router5';

import { libIdAtom } from '##/modules/lib';
import { routesNames } from '##/modules/router';

import { standOthersVersionsAtom, standStatusAtom } from './stand';

type HeaderInfo = {
  title: string;
  description?: string;
  link?: NavigationToProps;
  linkLabel?: string;
};

export const standHeaderInfoAtom = atom((ctx) => {
  const status = ctx.spy(standStatusAtom);
  const { canary, stable } = ctx.spy(standOthersVersionsAtom);
  const lib = ctx.get(libIdAtom);

  if (!status || (status === 'stable' && !canary)) {
    return undefined;
  }

  if (status === 'stable') {
    const info: HeaderInfo = {
      title: 'Компонент с разными версиями',
      description: canary
        ? 'Это стабильный компонент у которого есть'
        : undefined,
      linkLabel: canary ? 'новая версия' : undefined,
      link: canary
        ? {
            name: routesNames.LIBS_LIB_STAND,
            params: {
              stand: canary.id,
              lib,
            },
          }
        : undefined,
    };
    return info;
  }

  if (status === 'canary') {
    const info: HeaderInfo = {
      title: stable ? 'Компонент с разными версиями' : 'Тестовый компонент',
      description: stable ? 'Это новый компонент, у которого есть' : undefined,
      linkLabel: stable ? 'стабильная версия' : undefined,
      link: stable
        ? {
            name: routesNames.LIBS_LIB_STAND,
            params: {
              stand: stable.id,
              lib,
            },
          }
        : undefined,
    };
    return info;
  }

  if (status === 'deprecated') {
    const info: HeaderInfo = {
      title: 'Компонент больше не поддерживается',
      description: stable ? ' Используйте актуальную версию' : undefined,
      linkLabel: 'Stable',
      link: stable
        ? {
            name: routesNames.LIBS_LIB_STAND,
            params: {
              stand: stable.id,
              lib,
            },
          }
        : undefined,
    };
    return info;
  }

  if (status === 'inWork') {
    const info: HeaderInfo = {
      title: 'Компонент в работе',
      description: 'Есть дизайн макеты, но стадия реализации ещё не завершена',
    };
    return info;
  }
});

const iconViewMap = {
  deprecated: 'alert',
  canary: 'success',
  inWork: 'link',
  stable: undefined,
} as const;

export const standHeaderIconViewAtom = atom((ctx) => {
  const status = ctx.spy(standStatusAtom);
  return iconViewMap[status || 'stable'];
});
