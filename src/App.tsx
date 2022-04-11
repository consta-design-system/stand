import React from 'react';

import { routerAtom, routesNames } from '##/modules/router';
import { standsAtom } from '##/modules/stands';
import { libsAtom } from '##/modules/libs';
import { useAtom } from '@reatom/react';
import { useRoute, useRouter } from 'react-router5';

import { LibsPage } from '##/pages/LibsPage';

export const App: React.FC = () => {
  // const [router] = useAtom(routerAtom);
  const [stands] = useAtom(standsAtom);
  const [libs] = useAtom(libsAtom);
  const route = useRoute();
  const router = useRouter();

  console.log(route.route?.name);

  // if (route.route?.name === routesNames.LIBS) {
  //   return <LibsPage />;
  // }

  console.log(stands);
  console.log(libs);

  return (
    <div>
      !
      <button onClick={() => router.navigate(routesNames.LIBS_LIB, { libId: 'uikit' })}>fff</button>
    </div>
  );
};
