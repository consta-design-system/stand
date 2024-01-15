import './A.css';

import { Text } from '@consta/uikit/Text';
import React from 'react';

import { useMdxLink } from '##/hooks/useMdxLink';
import { cn } from '##/utils/bem';

const cnA = cn('A');

export const A = (
  props: React.HTMLAttributes<HTMLAnchorElement> & { href?: string },
) => {
  const { children, className, href = '', ...otherProps } = props;

  const link = useMdxLink(href);

  return (
    <Text
      as="a"
      href={link[0]}
      view="link"
      className={cnA(null, [className])}
      onClick={link[1]}
      weight="medium"
      lineHeight="m"
      {...otherProps}
    >
      {children}
    </Text>
  );
};
