import React from 'react';
import { useRoute } from 'react-router5';

import { DocLayout } from '##/componets/DocLayout';
import { Header } from '##/containers/Header';
import { Menu } from '##/containers/Menu';
import { Pages } from '##/containers/Pages';
import { SideLinks } from '##/containers/SideLinks';
import { VariantsPage } from '##/containers/VariantsPage';
import { useIframeSubscribe } from '##/hooks/useIframeSubscribe';
import { routesNames } from '##/modules/router';

export const App: React.FC = () => {
  useIframeSubscribe();
  const { route } = useRoute();

  if (route.name === routesNames.LIBS_VARIANTS) {
    return <VariantsPage />;
  }

  return (
    <DocLayout
      leftSide={<Menu />}
      rightSide={<SideLinks />}
      header={<Header />}
    >
      <Pages />
    </DocLayout>
  );
};
