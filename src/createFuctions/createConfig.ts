import {
  CreatedStand,
  Group,
  Lib,
  PageConfig,
  Stand,
  StandTab,
} from '##/types';

const defaultStandTabs: StandTab[] = [
  { id: '', label: 'Обзор' },
  { id: 'dev', label: 'Разработчикам' },
  { id: 'design', label: 'Дизайнерам', figma: true },
  { id: 'sandbox', label: 'Песочница', sandbox: true },
];

export const createConfig = <GROUP extends Group>(libProps: Lib<GROUP>) => {
  const createStand = (standProps: Stand<GROUP['id']>): CreatedStand => ({
    stand: standProps,
    lib: { standTabs: defaultStandTabs, ...libProps },
    type: 'stand',
  });
  const createPage = (pageConfig: PageConfig) => ({
    ...pageConfig,
    type: 'page',
  });
  return { createStand, createPage };
};
