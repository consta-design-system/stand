export type RouterItem = {
  name: string;
  path: string;
};

export const createRoutes = (path: string = '/') => {
  const routesNames = {
    LIBS: 'LIBS',
    LIBS_LIB: 'LIBS.LIB',
    LIBS_LIB_STAND: 'LIBS.LIB.STAND',
    LIBS_LIB_STAND_DESIGN: 'LIBS.LIB.STAND.DESIGN',
    LIBS_LIB_STAND_DEV: 'LIBS.LIB.STAND.DEV',
    LIBS_LIB_STAND_SANDBOX: 'LIBS.LIB.STAND.SANDBOX',
  };

  const routes = [
    {
      name: routesNames.LIBS,
      path: path,
    },
    {
      name: routesNames.LIBS_LIB,
      path: '/:libId',
    },
    {
      name: routesNames.LIBS_LIB_STAND,
      path: '/:standId',
    },
    {
      name: routesNames.LIBS_LIB_STAND_DESIGN,
      path: '/design',
    },
    {
      name: routesNames.LIBS_LIB_STAND_SANDBOX,
      path: '/sandbox',
    },
  ];

  return { routesNames, routes };
};
