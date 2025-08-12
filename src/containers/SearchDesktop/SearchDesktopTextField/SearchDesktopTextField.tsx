import { IconSearchStroked } from '@consta/icons/IconSearchStroked';
import { TextField } from '@consta/uikit/TextField';
import { useDebounce } from '@consta/uikit/useDebounce';
import { useAction, useAtom, useUpdate } from '@reatom/npm-react';
import React, { useRef } from 'react';

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

  const onChange = useAction((ctx, value: string | null) => {
    inputValueAtom(ctx, value);
    if (value?.trim()) {
      setSearchValueAtomDebounced(ctx, value);
    } else {
      searchValueAtom(ctx, value);
    }
  });

  useUpdate(fieldRefAtom, [ref]);

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
