export type RouterItem = {
  name: string;
  path: string;
};

const generateRouteName = (path: string, libsLenght: number, name?: string) =>
  `${path === '/' ? '' : 'LIBS.'}${libsLenght > 1 ? 'LIB.' : ''}${name ? name : ''}`;

export const createRoutes = (path = '/', libsLenght = 1) => {
  console.log(libsLenght);

  const routesNames = {
    LIBS: 'LIBS',
    LIBS_LIB: libsLenght > 1 ? generateRouteName(path, 0, 'LIB') : 'LIB',
    LIBS_LIB_STAND: generateRouteName(path, libsLenght, 'STAND'),
    LIBS_LIB_STAND_DESIGN: generateRouteName(path, libsLenght, 'STAND.DESIGN'),
    LIBS_LIB_STAND_DEV: generateRouteName(path, libsLenght, 'STAND.DEV'),
    LIBS_LIB_STAND_SANDBOX: generateRouteName(path, libsLenght, 'STAND.SANDBOX'),
  };

  const routes = [
    {
      name: routesNames.LIBS,
      path: `${path}?:hash`,
    },
    {
      name: routesNames.LIBS_LIB,
      path: '/:libId?:hash',
    },
    {
      name: routesNames.LIBS_LIB_STAND,
      path: '/:standId?:hash',
    },
    {
      name: routesNames.LIBS_LIB_STAND_DEV,
      path: '/dev?:hash',
    },
    {
      name: routesNames.LIBS_LIB_STAND_DESIGN,
      path: '/design?:hash',
    },
    {
      name: routesNames.LIBS_LIB_STAND_SANDBOX,
      path: '/sandbox?:hash',
    },
  ];

  return { routesNames, routes };
};
