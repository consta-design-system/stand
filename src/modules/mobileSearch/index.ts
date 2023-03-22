import { action, atom } from '@reatom/core';
import { onUpdate } from '@reatom/hooks';
import { navigateToAction, routerAtom } from 'reatom-router5';

import { htmlModsActionAdd } from '##/modules/theme';

export const mobileSearchIsActiveAtom = atom((ctx) => {
  const router = ctx.spy(routerAtom);
  return Boolean(router.route?.params.search);
});

export const mobileSearchToogleAction = action((ctx) => {
  const isActive = ctx.get(mobileSearchIsActiveAtom);
  const { route } = ctx.get(routerAtom);

  if (!route) {
    return;
  }

  if (isActive) {
    window.history.back();
  } else {
    navigateToAction(ctx, {
      name: route.name,
      params: { ...route.params, search: true },
    });
  }
});

onUpdate(mobileSearchIsActiveAtom, (ctx, isActive) => {
  htmlModsActionAdd(ctx, { noScroll: isActive });
});
