import './LeftSideHeader.css';

import { cnMixSpace } from '@consta/uikit/MixSpace';
import { useAction, useAtom } from '@reatom/react';
import React, { memo } from 'react';
import { useRouter } from 'react-router5';

import { SearchDesktop } from '##/containers/SearchDesktop';
import { buildLink } from '##/hooks/useLink';
import Logo from '##/images/Logo.image.svg';
import { headerLeftSideElementAtom } from '##/modules/header';
import {
  distanseElementAtom,
  fieldElementAtom,
  leftSideDistanceHelperHeightAtom,
  leftSideFixedSearchFieldAtom,
} from '##/modules/layout';
import { mainPageAtom } from '##/modules/pages';
import { cn } from '##/utils/bem';

const cnLeftSideHeader = cn('LeftSideHeader');

export const LeftSideHeader = memo(() => {
  const [searchFixed] = useAtom(leftSideFixedSearchFieldAtom);
  const [distanceHelperHeight] = useAtom(leftSideDistanceHelperHeightAtom);

  // const headerLeftSideRef = useRef<HTMLDivElement>(null);
  const routeName = useAtom(mainPageAtom)[0]?.routeName;
  const router = useRouter();
  const setDistanseElement = useAction(distanseElementAtom.set);
  const setFieldElement = useAction(fieldElementAtom.set);
  const setHeaderLeftSideElement = useAction(headerLeftSideElementAtom.set);

  const [link, onClick] = routeName
    ? buildLink(router, { to: routeName })
    : [undefined, undefined];

  const LinkTag = onClick ? 'a' : 'span';

  return (
    <div className={cnLeftSideHeader()} ref={setHeaderLeftSideElement}>
      <LinkTag
        className={cnLeftSideHeader('LogoWrapper', [
          cnMixSpace({ mT: '2xl', mB: 'xl', pH: 'xl' }),
        ])}
        href={link}
        onClick={onClick}
      >
        <Logo className={cnLeftSideHeader('Logo')} />
      </LinkTag>
      <div ref={setDistanseElement} style={{ height: distanceHelperHeight }} />
      <div
        className={cnLeftSideHeader('SearchBox', { fixed: searchFixed }, [
          cnMixSpace({ pH: 'xl', pV: 'xs' }),
        ])}
        ref={setFieldElement}
      >
        <SearchDesktop />
      </div>
      <div className={cnLeftSideHeader('Separator')} />
    </div>
  );
});
