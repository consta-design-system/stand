import { IconsProvider } from '@consta/icons/IconsProvider';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router5';

import { App } from '##/containers/App/App';
import { AppTheme } from '##/containers/AppTheme';
import { libsAtom } from '##/modules/libs';
import { router } from '##/modules/router';
// @ts-ignore: При сборке стенды осутствуют
import { libs } from '##/stands';

libsAtom.set(libs);

const Root = () => (
  <RouterProvider router={router}>
    <IconsProvider>
      <AppTheme>
        <App />
      </AppTheme>
    </IconsProvider>
  </RouterProvider>
);

createRoot(document.getElementById('app') as Element).render(<Root />);
