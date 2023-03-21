// @ts-ignore: При сборке стенды осутствуют
import { routes as additionalRoutes } from '##/stands/router';

export type RouterItem = {
  name: string;
  path: string;
};

const routesNames = {
  LIBS: 'LIBS',
  LIBS_VARIANTS: 'LIBS-VARIANTS',
  LIBS_LIB: 'LIBS.LIB',
  LIBS_LIB_STAND: 'LIBS.LIB.STAND',
  LIBS_LIB_STAND_TAB: 'LIBS.LIB.STAND.TAB',
};

export const createRoutes = () => {
  const routes: RouterItem[] = [
    ...additionalRoutes,
    {
      name: routesNames.LIBS,
      path: `/libs?:hash?:search`,
    },
    {
      name: routesNames.LIBS_VARIANTS,
      path: `/libs-variants/:lib/:stand?:search`,
    },
    {
      name: routesNames.LIBS_LIB,
      path: `/:lib?:hash?:search`,
    },
    {
      name: routesNames.LIBS_LIB_STAND,
      path: '/:stand?:variants?:hash?:search',
    },
    {
      name: routesNames.LIBS_LIB_STAND_TAB,
      path: '/:tab?:hash?:search',
    },
  ];

  return { routesNames, routes };
};
