import React from 'react';
import { useRoute } from 'react-router5';
import { startsWithSegment } from 'router5-helpers';

import { LibPageMenu } from '##/containers/LibPageMenu';
import { LibsPageMenu } from '##/containers/LibsPageMenu';
import { routesNames } from '##/modules/router';

export const Menu: React.FC = () => {
  const route = useRoute();

  const routeName = route.route?.name;

  const testStartsWithSegment = startsWithSegment(routeName);

  if (routeName === routesNames.LIBS) {
    return <LibsPageMenu />;
  }

  if (
    routeName === routesNames.LIBS_LIB ||
    testStartsWithSegment(routesNames.LIBS_LIB)
  ) {
    return <LibPageMenu />;
  }

  return null;
};
