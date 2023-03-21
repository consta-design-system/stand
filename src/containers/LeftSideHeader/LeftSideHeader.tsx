import './LeftSideHeader.css';

import { cnMixSpace } from '@consta/uikit/MixSpace';
import { useAction, useAtom, useUpdate } from '@reatom/npm-react';
import React, { memo, useEffect, useRef } from 'react';
import { useRouter } from 'react-router5';

import { Search } from '##/containers/Search';
import { buildLink } from '##/hooks/useLink';
import Logo from '##/images/Logo.image.svg';
import { headerLeftSideRefAtom } from '##/modules/header';
import {
  leftSideDistanceHelperHeightAtom,
  leftSideDistanceToSearchAtom,
  leftSideFixedSearchFieldAtom,
  leftSideSearchFieldHeightAtom,
} from '##/modules/layout';
import { mainPageAtom } from '##/modules/pages';
import { cn } from '##/utils/bem';

const cnLeftSideHeader = cn('LeftSideHeader');

export const LeftSideHeader = memo(() => {
  const setLeftSideDistance = useAction(leftSideDistanceToSearchAtom);
  const setLeftSideSearchFieldHeight = useAction(leftSideSearchFieldHeightAtom);
  const [searchFixed] = useAtom(leftSideFixedSearchFieldAtom);
  const [distanceHelperHeight] = useAtom(leftSideDistanceHelperHeightAtom);
  const distanseRefHelper = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const headerLeftSideRef = useRef<HTMLDivElement>(null);
  const routeName = useAtom(mainPageAtom)[0]?.routeName;
  const router = useRouter();

  const [link, onClick] = routeName
    ? buildLink(router, { to: routeName })
    : [undefined, undefined];

  useEffect(() => {
    setLeftSideDistance(distanseRefHelper.current?.offsetTop || 0);
  }, [distanseRefHelper.current]);

  useEffect(() => {
    setLeftSideSearchFieldHeight(fieldRef.current?.clientHeight || 0);
  }, [fieldRef.current]);

  useUpdate(headerLeftSideRefAtom, [headerLeftSideRef]);

  const LinkTag = onClick ? 'a' : 'span';

  return (
    <div className={cnLeftSideHeader()} ref={headerLeftSideRef}>
      <LinkTag
        className={cnLeftSideHeader('LogoWrapper', [
          cnMixSpace({ mT: '2xl', mB: 'xl', pH: 'xl' }),
        ])}
        href={link}
        onClick={onClick}
      >
        <Logo className={cnLeftSideHeader('Logo')} />
      </LinkTag>
      <div ref={distanseRefHelper} style={{ height: distanceHelperHeight }} />
      <div
        className={cnLeftSideHeader('SearchBox', { fixed: searchFixed }, [
          cnMixSpace({ pH: 'xl', pV: 'xs' }),
        ])}
        ref={fieldRef}
      >
        <Search />
      </div>
      <div className={cnLeftSideHeader('Separator')} />
    </div>
  );
});
