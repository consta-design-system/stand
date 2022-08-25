import { LibWithStands } from '@consta/stand/src/exportTypes';
import { useAtom } from '@reatom/react';
import React from 'react';
import { useRoute, useRouter } from 'react-router5';
import { Router, State } from 'router5';

import { buildLink } from '##/hooks/useLink';
import { libsAtom } from '##/modules/libs';

export type ReturnItem = [string, React.MouseEventHandler | undefined];

export type UseMdxLinkReturn<T> = T extends [] ? ReturnItem[] : ReturnItem;

const getPath = (str: string) => {
  const p1 = str.split('|');
  const p2 = str.split('/');

  if (p1.length > p2.length) {
    return p1;
  }
  return p2;
};

const buildNavigateParams = (
  href: string,
): [string, Record<string, string>] => {
  const decoded = decodeURI(href.slice(2, href.length)).toString();
  const parts = getPath(decoded);
  const routeParams: Record<string, string> = {};
  let routeName = '';
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (i === 0) {
      routeName = part;
      continue;
    }
    if (part.includes(':')) {
      const [key, value] = part.split(':');
      routeParams[key] = value;
      continue;
    }
    routeParams.hash = part;
  }
  return [routeName, routeParams];
};

export type useMdxLinkHref = string | string[];

const ROOT_DOMEN = 'consta.design';

const buildMdxLink = (
  router: Router,
  route: State,
  href: string,
  onClick: React.MouseEventHandler | undefined,
  libs?: LibWithStands[],
): UseMdxLinkReturn<string> => {
  if (href[0] === '#' && href[1] === '#') {
    const [to, params] = buildNavigateParams(href);
    const libName = (params.stand ?? '').split('-')[0];
    if (libs?.find((lib) => lib.id === libName)) {
      return buildLink(router, { to, params }, onClick);
    }
    return [`https://${libName}.${ROOT_DOMEN}/libs/${params.stand}`, undefined];
  }
  if (href[0] === '#') {
    const params = {
      ...route.params,
      hash: decodeURI(href.slice(1, href.length)),
    };
    const to = route.name;
    return buildLink(router, { to, params }, onClick);
  }
  return [href, onClick];
};

export const useMdxLink = <T extends useMdxLinkHref>(
  href: T,
  onClick?: React.MouseEventHandler,
): UseMdxLinkReturn<T> => {
  const router = useRouter();
  const [libs] = useAtom(libsAtom);
  const { route } = useRoute();

  if (Array.isArray(href)) {
    return href.map((item) =>
      buildMdxLink(router, route, item, onClick, libs),
    ) as UseMdxLinkReturn<T>;
  }
  return buildMdxLink(
    router,
    route,
    href,
    onClick,
    libs,
  ) as UseMdxLinkReturn<T>;
};
