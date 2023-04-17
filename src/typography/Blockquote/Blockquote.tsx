import './Blockquote.css';

import { Text } from '@consta/uikit/Text';
import { useAtom } from '@reatom/npm-react';
import React from 'react';

import { dimensionAtom } from '##/modules/dimension';
import { cn } from '##/utils/bem';
import { getSizeFromDimension } from '##/utils/typographySize';

const cnBlockquote = cn('Blockquote');

export const Blockquote = (props: React.HTMLAttributes<HTMLQuoteElement>) => {
  const { children, className, ...otherProps } = props;

  const [dimension] = useAtom(dimensionAtom);

  return (
    <Text
      as="blockquote"
      className={cnBlockquote(null, [className])}
      size={getSizeFromDimension('m', dimension)}
      lineHeight="m"
      weight="regular"
      {...otherProps}
    >
      {children}
    </Text>
  );
};
