import { Fn } from '@reatom/core';
import { useAction } from '@reatom/npm-react';
import {
  navigateToAction,
  NavigationToProps,
  plugin,
  transitionSuccessAction,
} from 'reatom-router5';
import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';

import { createRoutes } from '##/createFuctions';
import { ctx } from '##/modules/app';

export const { routesNames, routes, defaultRoute } = createRoutes();

const router = createRouter(routes, { defaultRoute });

router.usePlugin(browserPlugin(), plugin(ctx));

router.start();

export const useNavigate = (): Fn<[NavigationToProps], NavigationToProps> =>
  useAction(navigateToAction);

ctx.subscribe(transitionSuccessAction, (params) => {
  const payload = params[0]?.params[0];
  if (payload) {
    const { toState, fromState } = payload;

    if (
      toState?.params.stand !== undefined &&
      toState?.params.stand === fromState?.params.stand
    ) {
      return;
    }

    window.scrollTo(0, 0);
  }
});

export { router };
export * from 'reatom-router5';
export * from './useIsActiveRouter';
