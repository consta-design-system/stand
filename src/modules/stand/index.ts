import { createAtom } from '@reatom/core';
import { State } from 'router5';

import { routerAtom, routesNames } from '##/modules/router';
import { standsAtom } from '##/modules/stands';
import { generateStandId } from '##/utils/generateStandId';

export const standAtom = createAtom({ routerAtom, standsAtom }, ({ get }) => {
  const router = get('routerAtom');
  const standId = router.route?.params.stand as string | undefined;
  const libId = router.route?.params.lib as string | undefined;
  const stand = standId
    ? get('standsAtom')[generateStandId(libId, standId)]
    : undefined;

  return stand;
});

export const componentRepositoryUrlAtom = createAtom(
  { standAtom },
  ({ get }) => {
    const stand = get('standAtom');

    if (!stand) {
      return;
    }

    const {
      componentDir,
      lib: { repositoryUrl },
    } = stand;

    const componentUrl =
      componentDir &&
      repositoryUrl &&
      `${repositoryUrl}/tree/master/${componentDir}`;

    return componentUrl;
  },
);

export const getDocsUrl = (
  repositoryUrl: string | undefined,
  router: State,
  lazyAccess: Record<string, boolean>,
  path: string,
) => {
  if (!repositoryUrl) {
    return;
  }
  if (router.name === routesNames.LIBS_LIB_STAND) {
    return `${repositoryUrl}/tree/master/${path}.stand.mdx`;
  }
  if (
    router.name === routesNames.LIBS_LIB_STAND_TAB &&
    router.params.tab &&
    lazyAccess[router.params.tab]
  ) {
    return `${repositoryUrl}/tree/master/${path}.${router.params.tab}.stand.mdx`;
  }
};

export const docsRepositoryUrlAtom = createAtom(
  { routerAtom, standAtom },
  ({ get }) => {
    const router = get('routerAtom');
    const stand = get('standAtom');

    if (!stand || !router.route) {
      return;
    }

    const {
      lazyAccess,
      lib: { repositoryUrl },
      repositoryPath,
    } = stand;

    return getDocsUrl(repositoryUrl, router.route, lazyAccess, repositoryPath);
  },
);

export const issueRepositoryUrlAtom = createAtom({ standAtom }, ({ get }) => {
  const stand = get('standAtom');

  if (!stand) {
    return;
  }

  const {
    lib: { repositoryUrl },
  } = stand;

  const componentUrl = repositoryUrl && `${repositoryUrl}/issues/new/choose`;

  return componentUrl;
});

export const figmaAtom = createAtom({ standAtom }, ({ get }) => {
  const stand = get('standAtom');

  return stand?.stand.figma;
});

export const badgeLabelStatusMap = {
  deprecated: 'deprecated',
  canary: 'canary',
  stable: 'Стабильный',
  inWork: 'В работе',
};

export const badgeStatusMap = {
  deprecated: 'error',
  canary: 'success',
  stable: 'normal',
  inWork: undefined,
} as const;
