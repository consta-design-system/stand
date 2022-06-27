import React from 'react';

import { routesNames } from '##/modules/router';
import { libsAtom } from '##/modules/libs';
import { useAtom } from '@reatom/react';
import { useRoute } from 'react-router5';
import { startsWithSegment } from 'router5-helpers';

import { LibsPage } from '##/containers/LibsPage';
import { LibPage } from '##/containers/LibPage';
import { StandPage } from '##/containers/StandPage';

import { standsAtom } from '##/modules/stands';

export const Pages: React.FC = () => {
  const [libs] = useAtom(libsAtom);
  const [stands] = useAtom(standsAtom);
  const route = useRoute();

  console.log(stands);

  const routeName = route.route?.name;
  const libsLength = libs.length;

  const testStartsWithSegment = startsWithSegment(routeName);

  if (routeName === routesNames.LIBS && libsLength > 1) {
    return <LibsPage />;
  }

  if (routeName === routesNames.LIBS || routeName === routesNames.LIBS_LIB) {
    return <LibPage />;
  }

  if (testStartsWithSegment(routesNames.LIBS_LIB_STAND)) {
    return <StandPage />;
  }

  return null;
};
