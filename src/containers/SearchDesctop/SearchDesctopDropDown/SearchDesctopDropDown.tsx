import './SearchDesctopDropDown.css';

import { cnListBox } from '@consta/uikit/ListCanary';
import {
  animateTimeout,
  cnMixPopoverAnimate,
} from '@consta/uikit/MixPopoverAnimate';
import { Popover } from '@consta/uikit/Popover';
import { useClickOutside } from '@consta/uikit/useClickOutside';
import { useAction, useAtom } from '@reatom/npm-react';
import React, { memo, useRef } from 'react';
import { Transition } from 'react-transition-group';

import { SearchLenght, SearchList } from '##/containers/Search';
import {
  fieldRefAtom,
  inputFocusedAtom,
  isOpenDropdownAtom,
} from '##/modules/search';
import { cn } from '##/utils/bem';

const cnSearchDesctopDropDown = cn('SearchDesctopDropDown');

export const SearchDesctopDropDown = memo(() => {
  const [inputRef] = useAtom(fieldRefAtom);
  const [isOpen] = useAtom(isOpenDropdownAtom);
  const popoverRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    isActive: true,
    ignoreClicksInsideRefs: [popoverRef, inputRef],
    handler: useAction(inputFocusedAtom.setFalse),
  });

  return (
    <Transition
      nodeRef={popoverRef}
      in={isOpen}
      timeout={animateTimeout}
      unmountOnExit
    >
      {(animate) => (
        <Popover
          className={cnSearchDesctopDropDown(null, [
            cnListBox({ form: 'default ', border: true, shadow: true }),
            cnMixPopoverAnimate({ animate }),
          ])}
          direction="downStartLeft"
          anchorRef={inputRef}
          ref={popoverRef}
        >
          <SearchList className={cnSearchDesctopDropDown('List')} />
          <SearchLenght className={cnSearchDesctopDropDown('Lenght')} />
        </Popover>
      )}
    </Transition>
  );
});
