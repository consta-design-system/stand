import React, { memo } from 'react';

import { SearchTextField } from '##/containers/Search';

import { SearchDesktopDropDown } from './SearchDesktopDropDown';

export const SearchDesktop = memo(() => {
  return (
    <>
      <SearchTextField />
      <SearchDesktopDropDown />
    </>
  );
});
