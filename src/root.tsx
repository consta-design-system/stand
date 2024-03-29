import { IconsProvider } from '@consta/icons/IconsProvider';
import { reatomContext } from '@reatom/npm-react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router5';

import { App } from '##/containers/App/App';
import { AppTheme } from '##/containers/AppTheme';
import { ctx } from '##/modules/app';
import { libsAtom } from '##/modules/libs';
import { router } from '##/modules/router';
// @ts-ignore: При сборке стенды осутствуют
import { libs } from '##/stands';

libsAtom(ctx, libs);

const Root = () => (
  <RouterProvider router={router}>
    <reatomContext.Provider value={ctx}>
      <IconsProvider>
        <AppTheme>
          <App />
        </AppTheme>
      </IconsProvider>
    </reatomContext.Provider>
  </RouterProvider>
);

createRoot(document.getElementById('app') as Element).render(<Root />);
