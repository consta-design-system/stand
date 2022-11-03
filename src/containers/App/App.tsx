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
import { routesNames } from '##/modules/router';
// @ts-ignore: При сборке стенды осутствуют
import { pages } from '##/stands';

const pageResolver = (
  test: (segment: string) => boolean,
  routeName: string,
) => {
  // если нашли точное совпадение по routeName применяем то применяем ее страницу,
  // если же нет, то пытаемся найти к какомы сегменту принадлежит страница
  // и показываем страницу сегмента
  const page =
    pages.find((item: { routeName: string }) => item.routeName === routeName) ||
    pages.find((item: { routeName: string }) => test(item.routeName));

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

  return pageResolver(testStartsWithSegment, route.name);
};
