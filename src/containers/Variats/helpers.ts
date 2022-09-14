import { reatomContext, useAction } from '@reatom/react';
import { useContext, useEffect, useRef } from 'react';
import { useRoute, useRouter } from 'react-router5';

import { variantsAtom } from '##/exportAtoms/variants';
import { routesNames } from '##/modules/router';
import { htmlModsAtom, themeAtom } from '##/modules/theme';

export const useIframeBridge = () => {
  const clear = useAction(variantsAtom.clear);
  const store = useContext(reatomContext);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const unsubscribeVariantsAtom = store.subscribe(variantsAtom, (state) => {
      iframeRef.current?.contentWindow?.postMessage({
        type: 'to-iframe-variantsAtom',
        payload: state,
      });
    });

    const unsubscribeThemeAtom = store.subscribe(themeAtom, (state) => {
      iframeRef.current?.contentWindow?.postMessage({
        type: 'to-iframe-themeAtom',
        payload: state,
      });
    });

    return () => {
      unsubscribeVariantsAtom();
      unsubscribeThemeAtom();
    };
  }, []);

  useEffect(() => {
    return clear;
  }, []);

  return iframeRef;
};

export const useFullScreen = () => {
  const router = useRouter();
  const route = useRoute();
  const addHtmlMod = useAction(htmlModsAtom.add);
  const delHtmlMod = useAction(htmlModsAtom.del);

  const open = !!route.route.params.variants;

  const stand = route.route.params.stand as string;

  const toggle = () => {
    router.navigate(routesNames.LIBS_STAND, {
      stand,
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
