export type RouterItem = {
  name: string;
  path: string;
};

const routesNames = {
  LIBS: 'LIBS',
  LIBS_VARIANTS: 'LIBS.VARIANTS',
  LIBS_STAND: 'LIBS.STAND',
  LIBS_STAND_TAB: 'LIBS.STAND.TAB',
};

export const createRoutes = (path = '/libs') => {
  const routes: RouterItem[] = [
    {
      name: routesNames.LIBS,
      path: `${path}?:hash`,
    },
    {
      name: routesNames.LIBS_VARIANTS,
      path: `/variants/:stand`,
    },
    {
      name: routesNames.LIBS_STAND,
      path: '/:stand?:hash?:variants',
    },
    {
      name: routesNames.LIBS_STAND_TAB,
      path: '/:tab?:hash',
    },
  ];

  return { routesNames, routes };
};
