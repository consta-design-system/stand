import React, { memo } from 'react';

import { SearchDropDown } from './SearchDropDown';
import { SearchTextField } from './SearchTextField';

export const Search = memo(() => {
  return (
    <>
      <SearchTextField />
      <SearchDropDown />
    </>
  );
});
