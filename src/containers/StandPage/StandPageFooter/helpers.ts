import { useAtom } from '@reatom/npm-react';

import {
  componentRepositoryUrlAtom,
  docsRepositoryUrlAtom,
} from '##/modules/stand';

export const useFooter = () => {
  const componentUrl = useAtom(componentRepositoryUrlAtom)[0];
  const docsUrl = useAtom(docsRepositoryUrlAtom)[0];

  return { componentUrl, docsUrl };
};
