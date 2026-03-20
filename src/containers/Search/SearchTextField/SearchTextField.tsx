import { IconSearchStroked } from '@consta/icons/IconSearchStroked';
import { TextField } from '@consta/uikit/TextField';
import { useAction, useAtom } from '@reatom/react';
import React, { memo, useEffect, useRef } from 'react';

import {
  fieldRefAtom,
  handleChangeAction,
  inputFocusedAtom,
  inputValueAtom,
} from '##/modules/search';

export const SearchTextField = memo(({ className }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [value] = useAtom(inputValueAtom);
  const onChange = useAction(handleChangeAction);

  // TODO: Перенести формирование fieldRefAtom непосредственно в DOM

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
      className={className}
    />
  );
});
