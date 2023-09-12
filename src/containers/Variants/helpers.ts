import { useAction, useAtom } from '@reatom/npm-react';
import { createContext, useContext } from 'react';

import {
  variantsIsFullScreen,
  variantsToggleFullScreen,
} from '##/modules/variants';

export const useFullScreen = () => {
  const [open] = useAtom(variantsIsFullScreen);
  const toggle = useAction(variantsToggleFullScreen);
  return [open, toggle] as const;
};

export const resolutions = [
  {
    label: 'Телефон',
    value: 320,
  },
  {
    label: 'Планшет',
    value: 960,
  },
  {
    label: 'Ноутбук',
    value: 1333,
  },
  {
    label: 'Без ограничений',
    value: 1333,
  },
];

export const ZIndexContext = createContext<number | undefined>(undefined);

export function useZIndex() {
  return useContext(ZIndexContext);
}
