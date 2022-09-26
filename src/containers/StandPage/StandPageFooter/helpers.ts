import { createAtom } from '@reatom/core';
import { useAtom } from '@reatom/react';
import { State } from 'router5';

import { routerAtom, routesNames } from '##/modules/router';
import { standAtom } from '##/modules/stand';

const getDocsUrl = (
  repositoryUrl: string | undefined,
  router: State,
  lazyAccess: Record<string, boolean>,
  path: string,
) => {
  if (!repositoryUrl) {
    return;
  }
  if (router.name === routesNames.LIBS_STAND) {
    return `${repositoryUrl}/tree/master/${path}.stand.mdx`;
  }
  if (
    router.name === routesNames.LIBS_STAND_TAB &&
    router.params.tab &&
    lazyAccess[router.params.tab]
  ) {
    return `${repositoryUrl}/tree/master/${path}.stand.${router.params.tab}.mdx`;
  }
};

const footerAtom = createAtom({ routerAtom, standAtom }, ({ get }) => {
  const router = get('routerAtom');
  const stand = get('standAtom');

  if (!stand || !router.route) {
    return {};
  }

  const {
    lazyAccess,
    componentDir,
    lib: { repositoryUrl },
    path,
  } = stand;

  const componentUrl =
    componentDir &&
    repositoryUrl &&
    `${repositoryUrl}/tree/master/${componentDir}`;

  const docsUrl = getDocsUrl(repositoryUrl, router.route, lazyAccess, path);

  return { componentUrl, docsUrl };
});

export const useFooter = () => useAtom(footerAtom)[0];
