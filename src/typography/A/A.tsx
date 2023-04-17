import './A.css';

import { Text } from '@consta/uikit/Text';
import { useAtom } from '@reatom/npm-react';
import React from 'react';

import { useMdxLink } from '##/hooks/useMdxLink';
import { dimensionAtom } from '##/modules/dimension';
import { cn } from '##/utils/bem';
import { getSizeFromDimension } from '##/utils/typographySize';

const cnA = cn('A');

export const A = (
  props: React.HTMLAttributes<HTMLAnchorElement> & { href?: string },
) => {
  const { children, className, href = '', ...otherProps } = props;

  const link = useMdxLink(href);
  const [dimension] = useAtom(dimensionAtom);

  return (
    <Text
      as="a"
      href={link[0]}
      view="link"
      className={cnA(null, [className])}
      onClick={link[1]}
      weight="medium"
      size={getSizeFromDimension('s', dimension)}
      lineHeight="m"
      {...otherProps}
    >
      {children}
    </Text>
  );
};
