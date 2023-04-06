import { ctx } from '##/modules/app';
import { libsPageConfigAtom } from '##/modules/standsConfigs';
import { LibsPageConfig } from '##/types';

export const libsPageConfig = (props: LibsPageConfig) => {
  libsPageConfigAtom(ctx, props);
};
