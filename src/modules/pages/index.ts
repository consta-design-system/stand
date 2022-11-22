import { atom } from '@reatom/core';
import { startsWithSegment } from 'router5-helpers';

import { routerAtom } from '##/modules/router';
// @ts-ignore: При сборке стенды осутствуют
import { pages } from '##/stands';

export const pagesAtom =
  atom<{ routeName: string; mainPage?: boolean; path: string }[]>(pages);

export const pageAtom = atom((ctx) => {
  const routerName = ctx.spy(routerAtom).route?.name;
  const pages = ctx.spy(pagesAtom);

  if (!routerName) {
    return undefined;
  }

  const testStartsWithSegment = startsWithSegment(routerName);

  // если нашли точное совпадение по routeName применяем то применяем ее страницу,
  // если же нет, то пытаемся найти к какому сегменту принадлежит страница
  // и применяем страницу сегмента
  return (
    pages.find(
      (item: { routeName: string }) => item.routeName === routerName,
    ) ||
    pages.find((item: { routeName: string }) =>
      testStartsWithSegment(item.routeName),
    )
  );
});

export const mainPageAtom = atom((ctx) =>
  ctx.spy(pagesAtom).find((page) => page.mainPage),
);
