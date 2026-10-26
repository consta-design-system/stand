import { IconSearchStroked } from '@consta/icons/IconSearchStroked';
import { TextField } from '@consta/uikit/TextField';
import { useDebounce } from '@consta/uikit/useDebounce';
import { useAction, useAtom } from '@reatom/react';
import React, { useEffect, useRef } from 'react';

import {
  fieldRefAtom,
  inputFocusedAtom,
  inputValueAtom,
  searchValueAtom,
} from '##/modules/search';

export const SearchDesktopTextField = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [value] = useAtom(inputValueAtom);

  const setSearchValueAtomDebounced = useDebounce(searchValueAtom, 300);

  const onChange = useAction((value: string | null) => {
    inputValueAtom.set(value);
    if (value?.trim()) {
      setSearchValueAtomDebounced.set(value);
    } else {
      searchValueAtom.set(value);
    }
  });

  // Перенести формирование fieldRefAtom непосредственно в DOM

  useEffect(() => {
    fieldRefAtom.set(ref);
  }, [ref]);

  return (
    <TextField
      view="clear"
      leftSide={IconSearchStroked}
      placeholder="Компонент или статья"
      size="s"
      ref={ref}
      onFocus={useAction(inputFocusedAtom.setTrue)}
      value={value}
      onChange={onChange}
      withClearButton
    />
  );
};
