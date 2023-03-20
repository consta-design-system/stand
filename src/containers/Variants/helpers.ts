import { reatomContext, useAction } from '@reatom/npm-react';
import { createContext, useContext, useEffect, useRef } from 'react';
import { useRoute, useRouter } from 'react-router5';

import { routesNames } from '##/modules/router';
import {
  htmlModsActionAdd,
  htmlModsActionDel,
  variantThemeAtom,
} from '##/modules/theme';
import { variantsActionClear, variantsAtom } from '##/modules/variants';

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
  const router = useRouter();
  const route = useRoute();
  const addHtmlMod = useAction(htmlModsActionAdd);
  const delHtmlMod = useAction(htmlModsActionDel);

  const open = !!route.route.params.variants;

  const toggle = () => {
    router.navigate(routesNames.LIBS_LIB_STAND, {
      ...route.route.params,
      variants: open ? undefined : true,
    });
  };

  useEffect(() => {
    if (open) {
      addHtmlMod({ name: 'noScroll', value: true });
    } else {
      addHtmlMod({ name: 'noScroll', value: false });
    }

    return () => delHtmlMod('noScroll');
  }, [open]);

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
