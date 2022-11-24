import { Fn } from '@reatom/core';
import { useAction } from '@reatom/npm-react';
import { navigateToAction, NavigationToProps, plugin } from 'reatom-router5';
import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';

import { createRoutes } from '##/createFuctions';
import { ctx } from '##/modules/app';

export const { routesNames, routes } = createRoutes();

const router = createRouter(routes, { defaultRoute: routesNames.LIBS });

router.usePlugin(browserPlugin(), plugin(ctx));

router.start();

export const useNavigate = (): Fn<[NavigationToProps], NavigationToProps> =>
  useAction(navigateToAction);

export { router };
export * from 'reatom-router5';
export * from './useIsActiveRouter';
