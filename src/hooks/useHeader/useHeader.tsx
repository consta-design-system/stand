import { useDebounce } from '@consta/uikit/useDebounce';
import { useAction, useAtom } from '@reatom/npm-react';
import React, { useEffect, useMemo } from 'react';
import { useRoute } from 'react-router5';

import { headerHeightAtom } from '##/modules/layout';
import { activeItemAtom } from '##/modules/menuMdx';
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
  const route = useRoute();
  const { params } = route.route;
  const setActiveItem = useAction(activeItemAtom);

  const [height] = useAtom(headerHeightAtom);

  const { id, label } = useMemo(() => {
    const str = getStringChildren(children);
    return typographyHeaderConverter(str);
  }, [children]);

  const hash = useMemo(() => params.hash, [params]);

  const changeActive = useDebounce(() => {
    if (id && hash) {
      if (hash === id) {
        const top = ref.current?.offsetTop ?? 0;
        window.scrollTo({
          top: top - height,
          left: 0,
          behavior: 'smooth',
        });
        setActiveItem({
          label,
          href: `#${id}`,
        });
      }
    }
  }, 50);

  useEffect(changeActive, [hash, id, ref.current]);

  return {
    id,
    label,
  };
};
