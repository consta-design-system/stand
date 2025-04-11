import { plugin, transitionSuccessAction } from 'reatom-router5';
import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';

import { createRoutes } from '##/createFuctions';
import { ctx } from '##/modules/app';

export const { routesNames, routes, defaultRoute } = createRoutes();

export const router = createRouter(routes, { defaultRoute });

router.usePlugin(
  browserPlugin({ useHash: !!process.env.BROWSER_HASH }),
  plugin(ctx),
);

router.start();

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

export const buildPath = (route: string, params?: Record<string, unknown>) =>
  (process.env.BROWSER_HASH ? '#' : '') + router.buildPath(route, params);

export * from 'reatom-router5';
export * from './useIsActiveRouter';
