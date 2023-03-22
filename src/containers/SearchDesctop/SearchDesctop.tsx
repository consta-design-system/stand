import React, { memo } from 'react';

import { SearchTextField } from '##/containers/Search';

import { SearchDesctopDropDown } from './SearchDesctopDropDown';

export const SearchDesctop = memo(() => {
  return (
    <>
      <SearchTextField />
      <SearchDesctopDropDown />
    </>
  );
});
