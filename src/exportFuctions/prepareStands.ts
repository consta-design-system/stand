import {
  CreatedStand,
  LibWithStands,
  PreparedStand,
  StandTab,
} from '##/exportTypes';
import { generateStandId } from '##/utils/generateStandId';

const sort = (
  a: { order?: number; title: string },
  b: { order?: number; title: string },
) => {
  if (a.order && b.order) {
    return a.order - b.order;
  }
  if (a.order) {
    return -1;
  }
  if (b.order) {
    return 1;
  }
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
};

const sortStands = (a: CreatedStand, b: CreatedStand) => {
  return sort(a.stand, b.stand);
};

const addToLib = (stand: PreparedStand, libs: LibWithStands[]) => {
  const indexLib = libs.findIndex((item) => item.id === stand.lib.id);

  const standWithGroup = {
    ...stand,
    group: stand.stand.group || 'Библиотеки компонентов',
  };

  if (indexLib !== -1) {
    libs[indexLib].stands.push(standWithGroup);
  } else {
    libs.push({
      ...stand.lib,
      stands: [standWithGroup],
    });
  }
};

const getLazyAccess = (
  lazyAccess: string[],
  path: string,
  tabs?: StandTab[],
) => {
  const lazyAcces: Record<string, boolean> = {};

  if (!tabs) {
    return lazyAcces;
  }

  for (
    let lazyAccesIndex = 0;
    lazyAccesIndex < lazyAccess.length;
    lazyAccesIndex++
  ) {
    const item = lazyAccess[lazyAccesIndex];

    for (let tabsIndex = 0; tabsIndex < tabs.length; tabsIndex++) {
      const tab = tabs[tabsIndex];

      if (tab.id && item === `${path}.${tab.id}.stand.mdx`) {
        lazyAcces[tab.id] = true;
      }
    }

    if (item === `${path}.stand.mdx`) {
      lazyAcces.stand = true;
    }

    if (item === `${path}.image.svg`) {
      lazyAcces.image = true;
    }

    if (item === `${path}.variants.tsx`) {
      lazyAcces.variants = true;
    }
  }

  return lazyAcces;
};

export const prepareStands = (
  initStands: CreatedStand[],
  paths: string[],
  lazyAccess: string[],
  componentDirs: string[],
) => {
  const stands: Record<string, PreparedStand> = {};
  const libs: LibWithStands[] = [];

  initStands
    .map((item, index) => ({
      ...item,
      stand: {
        ...item.stand,
        visibleOnLibPage:
          typeof item.stand.visibleOnLibPage === 'undefined'
            ? true
            : item.stand.visibleOnLibPage,
        otherVersion: initStands
          .filter(
            (el) =>
              el.stand.id === item.stand.id &&
              el.stand.status !== item.stand.status,
          )
          .map(({ stand }) => ({
            ...stand,
            visibleOnLibPage:
              typeof item.stand.visibleOnLibPage === 'undefined'
                ? true
                : item.stand.visibleOnLibPage,
            id: generateStandId(stand.group, stand.id, stand.status),
          })),
      },
      id: generateStandId(item.stand.group, item.stand.id, item.stand.status),
      path: paths[index],
      lazyAccess: getLazyAccess(lazyAccess, paths[index], item.lib.standTabs),
      componentDir: componentDirs[index] || undefined,
    }))
    .sort(sortStands)
    .forEach((stand) => {
      stands[generateStandId(stand.lib.id, stand.id)] = stand as PreparedStand;
      addToLib(stand as PreparedStand, libs);
    });

  const standsKeys = Object.keys(stands);

  standsKeys.forEach((key) => {
    stands[key].lib = libs.find(
      (item) => item.id === stands[key].lib.id,
    ) as LibWithStands;
  });

  return { stands, libs: libs.sort(sort) };
};
