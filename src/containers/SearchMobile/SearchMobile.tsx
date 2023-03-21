import './SearchMobile.css';

import { cnMixSpace } from '@consta/uikit/MixSpace';
import { useAtom } from '@reatom/npm-react';
import React, { memo } from 'react';
import { Transition } from 'react-transition-group';

import {
  SearchLenght,
  SearchList,
  SearchTextField,
} from '##/containers/Search';
import { headerHeightAtom } from '##/modules/layout';
import { mobileSearchIsActiveAtom } from '##/modules/mobileSearch';
import { cn } from '##/utils/bem';

const cnSearchMobile = cn('SearchMobile');

export const SearchMobile = memo(() => {
  const [isActive] = useAtom(mobileSearchIsActiveAtom);
  const [headerHeight] = useAtom(headerHeightAtom);

  return (
    <Transition timeout={300} in={isActive} unmountOnExit>
      {(animate) => (
        <div
          className={cnSearchMobile({ animate })}
          style={{ ['--header-height' as string]: `${headerHeight}px` }}
        >
          <SearchTextField
            className={cnSearchMobile('Field', [
              cnMixSpace({ pH: 's', pV: 'xs' }),
            ])}
          />
          <SearchLenght className={cnSearchMobile('Lenght')} />
          <SearchList className={cnSearchMobile('List')} />
        </div>
      )}
    </Transition>
  );
});
