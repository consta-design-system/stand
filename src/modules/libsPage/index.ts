import { IconComponent } from '@consta/icons/Icon';
import { atom } from '@reatom/core';

import { ListCardBig, ListCardMini } from '##/componets/ListCard';
import { libsAtom } from '##/modules/libs';
import { routesNames } from '##/modules/router';
import {
  libsMenuConfigAtom,
  libsPageConfigAtom,
} from '##/modules/standsConfigs';
import {
  LibsPageConfigGroup,
  LibWithStands,
  ListCardComponent,
  PreparedStand,
} from '##/types';

type Item = {
  label: string;
  routeName: string;
  routeParams: {};
  description?: string;
  figmaUrl?: string;
  repositoryUrl?: string;
  icon?: IconComponent;
  status?: 'deprecated' | 'canary' | 'stable' | 'inWork';
  lazyImage?: string;
};

type Group = {
  label?: string;
  description?: string;
  items: Item[];
  renderList: ListCardComponent;
  visibleLabel?: boolean;
  maxCount: number | undefined;
  buttonMore: boolean | undefined;
};

const getStandGroup = (stand: PreparedStand) =>
  stand.lib.groups.find((group) => group.id === stand.stand.group);

const defaultGroupLabel = 'no-group';

const addToGroup = (
  groups: Group[],
  item: Item,
  label: string | undefined,
  description: string | undefined,
  renderList: ListCardComponent,
  maxCount: number | undefined,
  buttonMore: boolean | undefined,
  hiddenLabel: boolean | undefined,
) => {
  const groupLabel = label || defaultGroupLabel;

  const resultGroupIndex = groups.findIndex(
    (group) => group.label === groupLabel,
  );

  if (resultGroupIndex >= 0) {
    groups[resultGroupIndex].items.push(item);
  } else {
    const group: Group = {
      label: groupLabel,
      description,
      items: [item],
      renderList,
      visibleLabel: !hiddenLabel && groupLabel !== defaultGroupLabel,
      maxCount,
      buttonMore,
    };
    groups.push(group);
  }
};

const getExtractedLibs = (
  libs: LibWithStands[],
  configGroup: Record<string, LibsPageConfigGroup>,
  extractLibs: Record<string, boolean>,
) => {
  const groups: Group[] = [];

  for (let libIndex = 0; libIndex < libs.length; libIndex++) {
    const lib = libs[libIndex];

    if (extractLibs[lib.id]) {
      for (
        let standsIndex = 0;
        standsIndex < lib.stands.length;
        standsIndex++
      ) {
        const stand = lib.stands[standsIndex];
        const libGroup = getStandGroup(stand);
        const groupLabel = libGroup?.title || defaultGroupLabel;
        const config = configGroup[groupLabel];
        const groupDescription = config?.description || libGroup?.description;

        const renderList =
          config?.renderList || libGroup?.renderList || ListCardMini;

        const item: Item = {
          label: stand.stand.title,
          description: stand.stand.description,
          routeName: routesNames.LIBS_LIB_STAND,
          routeParams: { lib: stand.lib.id, stand: stand.id },
          icon: stand.stand.icon,
          figmaUrl: stand.stand.figma,
          repositoryUrl: stand.stand.github,
          status: stand.stand.status,
          lazyImage: stand.lazyAccess.image
            ? `${stand.path}_image_svg`
            : 'no-image',
        };

        addToGroup(
          groups,
          item,
          groupLabel,
          groupDescription,
          renderList,
          config?.maxCount,
          config?.buttonMore,
          config?.hiddenLabel,
        );
      }
    } else {
      const item: Item = {
        label: lib.title,
        description: lib.description,
        routeName: routesNames.LIBS_LIB,
        routeParams: { lib: lib.id },
        repositoryUrl: lib.repositoryUrl,
        figmaUrl: lib.figmaUrl,
        status: lib.status,
      };

      const config = configGroup[lib.group || ''];

      addToGroup(
        groups,
        item,
        lib.group,
        config?.description,
        config?.renderList || ListCardBig,
        config?.maxCount,
        config?.buttonMore,
        config?.hiddenLabel,
      );
    }
  }

  return groups;
};

const configAtom = atom((ctx) => {
  const config = ctx.spy(libsPageConfigAtom);
  const configGroups: Record<string, LibsPageConfigGroup> = {};
  const extractLibs: Record<string, boolean> = {};

  if (config.groups) {
    for (let index = 0; index < config.groups.length; index++) {
      const element = config.groups[index];
      configGroups[element.label] = element;
    }
  }

  if (config.extractLibs) {
    for (let index = 0; index < config.extractLibs.length; index++) {
      const element = config.extractLibs[index];
      extractLibs[element] = true;
    }
  }

  return [configGroups, extractLibs] as const;
});

export const libsPageItemsAtom = atom((ctx) => {
  const libs = ctx.spy(libsAtom);
  const config = ctx.spy(configAtom);

  return getExtractedLibs(libs, config[0], config[1]);
});

export const libsPageTitleAtom = atom((ctx) => {
  const config = ctx.spy(libsPageConfigAtom);
  return config.title;
});

export const libsPageMenuCollapsedConfigAtom = atom((ctx) => {
  const { groups } = ctx.spy(libsMenuConfigAtom);
  const groupsConfig: Record<string, boolean> = {};

  if (!groups) {
    return groupsConfig;
  }

  for (let index = 0; index < groups.length; index++) {
    const element = groups[index];
    groupsConfig[element.label] = element.initialOpen;
  }

  return groupsConfig;
});
