import { PreparedStand } from '##/exportTypes';
import { routesNames } from '##/modules/router';

export type NavigationItem = {
  label: string;
  id: string;
};

const navigationList: NavigationItem[] = [
  {
    label: 'Обзор',
    id: routesNames.LIBS_STAND,
  },
  {
    label: 'Дизайнеру',
    id: routesNames.LIBS_STAND_DESIGN,
  },
  {
    label: 'Разработчику',
    id: routesNames.LIBS_STAND_DEV,
  },
  { label: 'Песочница', id: routesNames.LIBS_STAND_SANDBOX },
];

export const getNavigationList = (stand?: PreparedStand): NavigationItem[] => {
  if (!stand) {
    return [];
  }
  return navigationList.filter((item) => {
    if (item.id === routesNames.LIBS_STAND) {
      return stand.pathAccess.stand;
    }
    if (item.id === routesNames.LIBS_STAND_DESIGN) {
      return stand.pathAccess.design || !!stand.stand.figma;
    }
    if (item.id === routesNames.LIBS_STAND_DEV) {
      return stand.pathAccess.dev;
    }
    if (item.id === routesNames.LIBS_STAND_SANDBOX) {
      return stand.stand.sandbox;
    }
    return false;
  });
};

export const getGuardItemNavigate = (
  stand: PreparedStand | undefined,
): string | undefined => {
  if (!stand) {
    return;
  }
  if (stand?.pathAccess.stand) {
    return routesNames.LIBS_STAND;
  }
  if (stand?.pathAccess.dev) {
    return routesNames.LIBS_STAND_DEV;
  }
  if (stand?.pathAccess.design || !!stand.stand.figma) {
    return routesNames.LIBS_STAND_DESIGN;
  }
  if (stand.stand.sandbox) {
    return routesNames.LIBS_STAND_SANDBOX;
  }
};
