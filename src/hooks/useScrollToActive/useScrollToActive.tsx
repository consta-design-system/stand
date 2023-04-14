import { useAtom } from '@reatom/npm-react';
import { useEffect } from 'react';
import { useRouter } from 'react-router5';

import { leftSideSearchFieldHeightAtom } from '##/modules/layout';
import { libIdAtom } from '##/modules/lib';
import { libPageMenuFiltersHeightAtom } from '##/modules/standsMenu';

const getElementByHref = (
  href: string,
  prefix?: string,
): Element | undefined => {
  return document.querySelectorAll(
    `${prefix ? `${prefix}` : ''}[href='${href}']`,
  )[0];
};

export const useScrollToActive = (timeout = 600) => {
  const router = useRouter();
  const libId = useAtom(libIdAtom);
  const [filterHeight] = useAtom(libPageMenuFiltersHeightAtom);
  const [searchHeight] = useAtom(leftSideSearchFieldHeightAtom);

  useEffect(() => {
    const element = getElementByHref(
      router.getState().path,
      '.stand--PortalMenu ',
    );

    const elementRects = element?.getClientRects()[0];
    const elementTop = elementRects?.top || 0;
    const elementHeight = elementRects?.height || 0;

    const validBottom = window.innerHeight - elementHeight - filterHeight;
    const validTop = searchHeight;

    const timeoutId = setTimeout(() => {
      if (elementTop > validBottom || elementTop < validTop) {
        element?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest',
        });
      }
    }, timeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [libId]);
};
