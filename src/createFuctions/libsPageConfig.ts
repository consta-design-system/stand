import { libsPageConfigAtom } from '##/modules/standsConfigs';
import { LibsPageConfig } from '##/types';

export const libsPageConfig = (props: LibsPageConfig) => {
  libsPageConfigAtom.set(props);
};
