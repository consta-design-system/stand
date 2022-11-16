import { ThemePreset } from '@consta/uikit/Theme';
import { useDebounce } from '@consta/uikit/useDebounce';
import { useMutableRef } from '@consta/uikit/useMutableRef';
import { reatomContext, useAction, useAtom } from '@reatom/react';
import { useContext, useEffect } from 'react';
import { useRouter } from 'react-router5';

import { routesNames } from '##/modules/router';
import { themeAtom } from '##/modules/theme';
import { variantsAtom, VariantsAtomState } from '##/modules/variants';

export const useIframeSubscribe = () => {
  const [variants] = useAtom(variantsAtom);
  const store = useContext(reatomContext);
  const setVariantsAtom = useDebounce(useAction(variantsAtom.setState), 50);
  const setThemeAtom = useAction(themeAtom.set);
  const router = useRouter();

  const variantsRef = useMutableRef(variants);

  useEffect(() => {
    const unsubscribe = store.subscribe(variantsAtom, (state) => {
      const routerState = router.getState();
      if (routerState.name === routesNames.LIBS_VARIANTS) {
        window.top?.postMessage({
          type: 'form-iframe-variantsAtom',
          payload: state,
        });
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    window.onmessage = function (event) {
      const routerState = router.getState();

      const type = event?.data?.type as string;

      if (
        type === 'form-iframe-variantsAtom' &&
        routerState.name !== routesNames.LIBS_VARIANTS
      ) {
        const payload = event?.data?.payload as VariantsAtomState;
        if (JSON.stringify(variantsRef.current) === JSON.stringify(payload)) {
          return;
        }
        setVariantsAtom(payload);
      }

      if (
        routerState.name === routesNames.LIBS_VARIANTS &&
        type === 'to-iframe-variantsAtom'
      ) {
        const payload = event?.data?.payload as VariantsAtomState;
        if (JSON.stringify(variantsRef.current) === JSON.stringify(payload)) {
          return;
        }
        setVariantsAtom(payload);
      }

      if (
        routerState.name === routesNames.LIBS_VARIANTS &&
        type === 'to-iframe-themeAtom'
      ) {
        setThemeAtom(event?.data?.payload as ThemePreset);
      }
    };
  }, []);
};
