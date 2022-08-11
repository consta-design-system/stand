import React from 'react';

type Result = {
  id: string;
  label: string;
};

const SEPARATOR = '\\';

const SYMBOLS =
  /\?|{|}|[|]|\s|\'|\"|;|:|\||\\|\/|\!|@|#|\$|%|\^|,|\.|&|\*|-|_|=|\+|\`|\~|<|§|>|\(|\)/g;

export const getStringChildren = (node: React.ReactNode): string => {
  if (typeof node !== 'object') {
    return node?.toString() ?? '';
  }
  const { props } = node as React.ReactElement;
  return getStringChildren(props?.children ?? '');
};

export const typographyHeaderConverter = (header: string): Result => {
  const array = header.split(SEPARATOR);
  const strId = array[1];
  return {
    id:
      strId === '' || !strId
        ? header.replace(SYMBOLS, '-').toLowerCase()
        : strId,
    label: array[0],
  };
};
