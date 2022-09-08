import { reatomContext, useAction } from '@reatom/react';
import React, { useContext, useEffect } from 'react';

import { variantsAtom } from '##/exportAtoms/variants';
import { themeAtom } from '##/modules/theme';

export const useIframeBridge = (
  iframeRef: React.RefObject<HTMLIFrameElement>,
) => {
  const clear = useAction(variantsAtom.clear);
  const store = useContext(reatomContext);
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
};
