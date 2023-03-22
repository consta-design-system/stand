import { reatomContext, useAction, useAtom } from '@reatom/npm-react';
import { createContext, useContext, useEffect, useRef } from 'react';

import { variantThemeAtom } from '##/modules/theme';
import {
  variantsActionClear,
  variantsAtom,
  variantsIsFullScreen,
  variantsToggleFullScreen,
} from '##/modules/variants';

export const useIframeBridge = () => {
  const clear = useAction(variantsActionClear);
  const store = useContext(reatomContext);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const unsubscribeVariantsAtom = store?.subscribe(variantsAtom, (state) => {
      iframeRef.current?.contentWindow?.postMessage({
        type: 'to-iframe-variantsAtom',
        payload: state,
      });
    });

    const unsubscribeThemeAtom = store?.subscribe(variantThemeAtom, (state) => {
      iframeRef.current?.contentWindow?.postMessage({
        type: 'to-iframe-themeAtom',
        payload: state,
      });
    });

    return () => {
      unsubscribeVariantsAtom?.();
      unsubscribeThemeAtom?.();
    };
  }, []);

  useEffect(() => {
    return () => {
      clear();
    };
  }, []);

  return iframeRef;
};

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
