import { ctx } from '##/modules/app';
import { libsMenuConfigAtom } from '##/modules/standsConfigs';
import { LibsMenuConfig } from '##/types';

export const libsMenuConfig = (props: LibsMenuConfig) => {
  libsMenuConfigAtom(ctx, props);
};
