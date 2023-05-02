import './A.css';

import { Text } from '@consta/uikit/Text';
import { useAtom } from '@reatom/npm-react';
import React from 'react';

import { useMdxLink } from '##/hooks/useMdxLink';
import { sizeAtomMapFabric } from '##/modules/adaptiveSize';
import { cn } from '##/utils/bem';

const cnA = cn('A');

export const A = (
  props: React.HTMLAttributes<HTMLAnchorElement> & { href?: string },
) => {
  const { children, className, href = '', ...otherProps } = props;

  const link = useMdxLink(href);
  const [size] = useAtom(sizeAtomMapFabric.s);

  return (
    <Text
      as="a"
      href={link[0]}
      view="link"
      className={cnA(null, [className])}
      onClick={link[1]}
      weight="medium"
      size={size}
      lineHeight="m"
      {...otherProps}
    >
      {children}
    </Text>
  );
};
