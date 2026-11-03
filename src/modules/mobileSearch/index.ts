import { action, computed } from '@reatom/core';

import { navigateToAction, routerAtom } from '##/modules/router';
import { htmlModsActionAdd } from '##/modules/theme';

export const mobileSearchIsActiveAtom = computed(() => {
  const router = routerAtom();
  return Boolean(router.route?.params.search);
});

export const mobileSearchToggleAction = action(() => {
  const isActive = mobileSearchIsActiveAtom();
  const { route } = routerAtom();

  if (!route) {
    return;
  }

  if (isActive) {
    window.history.back();
  } else {
    navigateToAction({
      name: route.name,
      params: { ...route.params, search: true },
    });
  }
});

mobileSearchIsActiveAtom.subscribe((isActive) => {
  htmlModsActionAdd({ noScroll: isActive });
});
