import React from 'react';
import { useRoute } from 'react-router5';

import { LibPage } from '##/containers/LibPage';
import { LibsPage } from '##/containers/LibsPage';
import { StandPage } from '##/containers/StandPage';
import { routesNames } from '##/modules/router';

export const Pages: React.FC = () => {
  const { route } = useRoute();

  if (route.name === routesNames.LIBS) {
    return <LibsPage />;
  }

  if (route.name === routesNames.LIBS_LIB) {
    return <LibPage />;
  }

  if (
    route.name === routesNames.LIBS_LIB_STAND ||
    route.name === routesNames.LIBS_LIB_STAND_TAB
  ) {
    return <StandPage />;
  }

  return null;
};
