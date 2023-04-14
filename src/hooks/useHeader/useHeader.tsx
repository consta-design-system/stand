import { useDebounce } from '@consta/uikit/useDebounce';
import { useAtom } from '@reatom/npm-react';
import React, { useEffect, useMemo } from 'react';
import { routerAtom } from 'reatom-router5';

import { headerHeightAtom } from '##/modules/layout';
import {
  getStringChildren,
  typographyHeaderConverter,
} from '##/utils/typographyHeaderConverter';

type UseHeader = (
  children: React.ReactNode,
  ref: React.RefObject<HTMLHeadingElement>,
) => {
  id: string;
  label: string;
};

export const useHeader: UseHeader = (children, ref) => {
  const [route] = useAtom(routerAtom);
  const [height] = useAtom(headerHeightAtom);
  const hash = route.route?.params.hash as string | undefined;

  const returnedParams = useMemo(() => {
    const str = getStringChildren(children);
    return typographyHeaderConverter(str);
  }, [children]);

  const changeActive = useDebounce(() => {
    if (returnedParams.id && hash) {
      if (hash === returnedParams.id) {
        const top = ref.current?.offsetTop ?? 0;
        window.scrollTo({
          top: top - height,
          left: 0,
          behavior: 'smooth',
        });
      }
    }
  }, 50);

  useEffect(changeActive, [hash, returnedParams.id, ref.current]);

  return returnedParams;
};
