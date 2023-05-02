import './Blockquote.css';

import { Text } from '@consta/uikit/Text';
import { useAtom } from '@reatom/npm-react';
import React from 'react';

import { sizeAtomMapFabric } from '##/modules/adaptiveSize';
import { cn } from '##/utils/bem';

const cnBlockquote = cn('Blockquote');

export const Blockquote = (props: React.HTMLAttributes<HTMLQuoteElement>) => {
  const { children, className, ...otherProps } = props;

  const [size] = useAtom(sizeAtomMapFabric.m);

  return (
    <Text
      as="blockquote"
      className={cnBlockquote(null, [className])}
      size={size}
      lineHeight="m"
      weight="regular"
      {...otherProps}
    >
      {children}
    </Text>
  );
};
