import { createRoutes } from '@consta/stand/src/createFuctions';
import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';

import { store } from '##/modules/app';

import { plugin } from './router';

export const { routesNames, routes } = createRoutes();

const router = createRouter(routes, { defaultRoute: routesNames.LIBS });

router.usePlugin(browserPlugin());
router.usePlugin(plugin(store));
router.start();
// router.subscribe((state) => console.log(state));

export { router };
export { routerAtom } from './router';
export * from './useIsActiveRouter';
