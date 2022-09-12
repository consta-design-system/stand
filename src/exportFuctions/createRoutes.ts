export type RouterItem = {
  name: string;
  path: string;
};

const routesNames = {
  LIBS: 'LIBS',
  LIBS_VARIANTS: 'LIBS.VARIANTS',
  LIBS_STAND: 'LIBS.STAND',
  LIBS_STAND_DESIGN: 'LIBS.STAND.DESIGN',
  LIBS_STAND_DEV: 'LIBS.STAND.DEV',
  LIBS_STAND_SANDBOX: 'LIBS.STAND.SANDBOX',
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
      name: routesNames.LIBS_STAND_DESIGN,
      path: '/design?:hash',
    },
    {
      name: routesNames.LIBS_STAND_DEV,
      path: '/dev?:hash',
    },
    {
      name: routesNames.LIBS_STAND_SANDBOX,
      path: '/sandbox?:hash',
    },
  ];

  return { routesNames, routes };
};
