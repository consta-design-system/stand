import React from 'react';

type Result = {
  id: string;
  label: string;
};

const SEPARATOR = '\\';

const SYMBOLS =
  /\?|{|}|[|]|\s|\'|\"|;|:|\||\\|\/|\!|@|#|\$|%|\^|,|\.|&|\*|-|_|=|\+|\`|\~|<|§|>|\(|\)/g;

const REMOVE_SYMBOLS = /\?|\(|\)|{|}|[|]/g;

export const getStringChildren = (node: React.ReactNode): string => {
  if (typeof node !== 'object') {
    return node?.toString() ?? '';
  }
  if (Array.isArray(node)) {
    return node.map((item) => getStringChildren(item)).join('');
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
        ? header.replace(REMOVE_SYMBOLS, '').replace(SYMBOLS, '-').toLowerCase()
        : strId,
    label: array[0],
  };
};
