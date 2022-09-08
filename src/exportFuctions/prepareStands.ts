import { CreatedStand, LibWithStands, PreparedStand } from '##/exportTypes';

const sort = (a: CreatedStand, b: CreatedStand) => {
  if (a.stand.order && b.stand.order) {
    return a.stand.order - b.stand.order;
  }
  if (a.stand.order) {
    return -1;
  }
  if (b.stand.order) {
    return 1;
  }
  if (a.stand.id < b.stand.id) {
    return -1;
  }
  if (a.stand.id > b.stand.id) {
    return 1;
  }
  return 0;
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

const getLazyAccess = (lazyAccess: string[], path: string) => {
  const lazyAcces = {
    stand: false,
    dev: false,
    design: false,
    image: false,
    variants: false,
  };

  for (let index = 0; index < lazyAccess.length; index++) {
    const item = lazyAccess[index];

    if (item === `${path}.stand.mdx`) {
      lazyAcces.stand = true;
    }
    if (item === `${path}.dev.stand.mdx`) {
      lazyAcces.dev = true;
    }
    if (item === `${path}.design.stand.mdx`) {
      lazyAcces.design = true;
    }
    if (item === `${path}.image.svg`) {
      lazyAcces.image = true;
    }
    if (item === `${path}.variants.tsx`) {
      lazyAcces.variants = true;
    }

    if (
      !Object.keys(lazyAcces).find(
        (key) => lazyAcces[key as keyof typeof lazyAcces] === false,
      )
    ) {
      break;
    }
  }

  return lazyAcces;
};

export const prepareStands = (
  initStands: CreatedStand[],
  paths: string[],
  lazyAccess: string[],
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
            id: `${item.lib.id}-${stand.group}-${stand.id}${
              stand.status ? `-${stand.status}` : ''
            }`
              .replace(/\W|_/g, '-')
              .toLowerCase(),
          })),
      },
      id: `${item.lib.id}-${item.stand.group}-${item.stand.id}${
        item.stand.status ? `-${item.stand.status}` : ''
      }`
        .replace(/\W|_/g, '-')
        .toLowerCase(),
      path: paths[index],
      lazyAccess: getLazyAccess(lazyAccess, paths[index]),
    }))
    .sort(sort)
    .forEach((stand) => {
      stands[stand.id] = stand as PreparedStand;
      addToLib(stand as PreparedStand, libs);
    });

  const standsKeys = Object.keys(stands);

  standsKeys.forEach((key) => {
    stands[key].lib = libs.find(
      (item) => item.id === stands[key].lib.id,
    ) as LibWithStands;
  });

  return { stands, libs };
};
