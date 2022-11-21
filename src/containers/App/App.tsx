import { useAtom } from '@reatom/npm-react';
import React from 'react';
import { useRoute } from 'react-router5';
import { startsWithSegment } from 'router5-helpers';

import { DocLayout } from '##/componets/DocLayout';
import { LazyPage } from '##/componets/LazyPage';
import { Header } from '##/containers/Header';
import { Menu } from '##/containers/Menu';
import { Pages } from '##/containers/Pages';
import { SideLinks } from '##/containers/SideLinks';
import { VariantsPage } from '##/containers/VariantsPage';
import { useIframeSubscribe } from '##/hooks/useIframeSubscribe';
import { pageAtom } from '##/modules/pages';
import { routesNames } from '##/modules/router';

const CustomPage = () => {
  const [page] = useAtom(pageAtom);

  if (page) {
    return <LazyPage id={page.path} />;
  }

  return null;
};

export const App: React.FC = () => {
  const { route } = useRoute();
  const testStartsWithSegment = startsWithSegment(route.name);

  useIframeSubscribe();

  if (route.name === routesNames.LIBS_VARIANTS) {
    return <VariantsPage />;
  }

  if (testStartsWithSegment(routesNames.LIBS)) {
    return (
      <DocLayout
        leftSide={<Menu />}
        rightSide={<SideLinks />}
        header={<Header />}
      >
        <Pages />
      </DocLayout>
    );
  }

  return <CustomPage />;
};
