import { atom } from '@reatom/core';
import { State } from 'router5';

import { routerAtom, routesNames } from '##/modules/router';
import { standsAtom } from '##/modules/stands';
import { PreparedStand, PreparedStandNopreparedLibs } from '##/types';
import { generateStandId } from '##/utils/generateStandId';

export const standAtom = atom((ctx) => {
  const router = ctx.spy(routerAtom);
  const standId = router.route?.params.stand as string | undefined;
  const libId = router.route?.params.lib as string | undefined;
  const stand = standId
    ? ctx.spy(standsAtom)[generateStandId(libId, standId)]
    : undefined;

  return stand;
});

export const getComponentRepositoryUrl = (stand: PreparedStand | undefined) => {
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
};

export const componentRepositoryUrlAtom = atom((ctx) => {
  const stand = ctx.spy(standAtom);
  return getComponentRepositoryUrl(stand);
});

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

export const docsRepositoryUrlAtom = atom((ctx) => {
  const router = ctx.spy(routerAtom);
  const stand = ctx.spy(standAtom);

  if (!stand || !router.route) {
    return;
  }

  const {
    lazyAccess,
    lib: { repositoryUrl },
    repositoryPath,
  } = stand;

  return getDocsUrl(repositoryUrl, router.route, lazyAccess, repositoryPath);
});

export const issueRepositoryUrlAtom = atom((ctx) => {
  const stand = ctx.spy(standAtom);

  if (!stand) {
    return;
  }

  const {
    lib: { repositoryUrl },
  } = stand;

  return repositoryUrl && `${repositoryUrl}/issues/new/choose`;
});

export const figmaAtom = atom((ctx) => ctx.spy(standAtom)?.stand.figma);

const isVersion =
  (version: PreparedStandNopreparedLibs['stand']['status']) =>
  (stand: PreparedStandNopreparedLibs) =>
    stand.stand.status === version;

export const standOthersVersionsAtom = atom((ctx) => {
  const stand = ctx.spy(standAtom);
  const others = stand?.stand.otherVersion || [];

  return {
    deprecated: others.find(isVersion('deprecated')),
    canary: others.find(isVersion('canary')),
    stable: others.find(isVersion('stable')),
  };
});

export const standStatusAtom = atom((ctx) => {
  const stand = ctx.spy(standAtom);
  return stand?.stand.status;
});

export const badgeLabelStatusMap = {
  deprecated: 'deprecated',
  canary: 'canary',
  stable: 'Стабильный',
  inWork: 'В работе',
};

export const badgeStatusMap = {
  deprecated: 'error',
  canary: 'normal',
  stable: 'system',
  inWork: 'normal',
} as const;
