import './SearchDesktopDropDown.css';

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
import { leftSideElAtom } from '##/modules/layout';
import {
  dropDownTopPositionAtom,
  fieldRefAtom,
  inputFocusedAtom,
  isOpenDropdownAtom,
} from '##/modules/search';
import { cn } from '##/utils/bem';

const cnSearchDesktopDropDown = cn('SearchDesktopDropDown');

export const SearchDesktopDropDown = memo(() => {
  const [inputRef] = useAtom(fieldRefAtom);
  const [isOpen] = useAtom(isOpenDropdownAtom);
  const [dropDownTopPosition] = useAtom(dropDownTopPositionAtom);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [leftSideEl] = useAtom(leftSideElAtom);

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
          className={cnSearchDesktopDropDown(null, [
            cnListBox({ form: 'default ', border: true, shadow: true }),
            cnMixPopoverAnimate({ animate }),
          ])}
          direction="downStartLeft"
          anchorRef={inputRef}
          ref={popoverRef}
          container={leftSideEl || undefined}
          style={{ top: dropDownTopPosition }}
        >
          <SearchList className={cnSearchDesktopDropDown('List')} />
          <SearchLenght className={cnSearchDesktopDropDown('Lenght')} />
        </Popover>
      )}
    </Transition>
  );
});
