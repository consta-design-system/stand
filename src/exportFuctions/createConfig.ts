import { CreatedStand, Group, Lib, Stand, StandTab } from '##/exportTypes';

const defaultStandTabs: StandTab[] = [
  { id: '', label: 'Обзор' },
  { id: 'dev', label: 'Разрабодчикам' },
  { id: 'design', label: 'Дизайнерам', figma: true },
  { id: 'sandbox', label: 'Песочница', sandbox: true },
];

export const createConfig = <GROUP extends Group>(libProps: Lib<GROUP>) => {
  const createStand = (standProps: Stand<GROUP['id']>): CreatedStand => ({
    stand: standProps,
    lib: { standTabs: defaultStandTabs, ...libProps },
  });
  return { createStand };
};
