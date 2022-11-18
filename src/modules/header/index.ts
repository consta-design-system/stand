import { atom } from '@reatom/core';
import { startsWithSegment } from 'router5-helpers';

import { routerAtom, routesNames } from '##/modules/router';

import { standsAtom } from '../stands';

export type MenuItem = {
  label: string;
  routeName: string;
  params: Record<string, string>;
  active: boolean;
};

// export const headerMenuAtom = atom(({ spy }) => {});

export const headerMenuAtom = atom((ctx) => {
  const stands = ctx.spy(standsAtom);
  const { route: currentRoute } = ctx.spy(routerAtom);

  const menu: MenuItem[] = [];

  if (!currentRoute) {
    return menu;
  }

  const testStartsWithSegment = startsWithSegment(currentRoute.name);

  const menuKeys = Object.keys(stands).filter(
    (key) => stands[key].stand.visibleOnHeader,
  );

  let activeBusy = false;

  for (let index = 0; index < menuKeys.length; index++) {
    const key = menuKeys[index];

    const active =
      testStartsWithSegment(routesNames.LIBS_LIB_STAND) &&
      stands[key].lib.id === currentRoute.params.lib &&
      stands[key].id === currentRoute.params.stand;

    menu.push({
      label: stands[key].stand.title,
      routeName: routesNames.LIBS_LIB_STAND,
      params: {
        lib: stands[key].lib.id,
        stand: stands[key].id,
      },
      active,
    });

    if (activeBusy === false && active) {
      activeBusy = true;
    }
  }

  if (menu.length) {
    menu.unshift({
      routeName: routesNames.LIBS,
      label: 'Библиотеки и компоненты',
      params: {},
      active: !activeBusy && testStartsWithSegment(routesNames.LIBS),
    });
  }

  return menu;
});

export const headerWithMenuAtom = atom((ctx) => {
  return !!ctx.spy(headerMenuAtom).length;
});
