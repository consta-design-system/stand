import { Text } from '@consta/uikit/Text';
import { useAtom } from '@reatom/npm-react';
import React from 'react';

import { dimensionAtom } from '##/modules/dimension';
import { cn } from '##/utils/bem';
import { getSizeFromDimension } from '##/utils/typographySize';

const cnP = cn('P');

export const P = (props: React.HTMLAttributes<HTMLParagraphElement>) => {
  const { children, ...otherProps } = props;

  const [dimension] = useAtom(dimensionAtom);

  return (
    <Text
      size={getSizeFromDimension('m', dimension)}
      lineHeight="m"
      className={cnP()}
      as="p"
      weight="regular"
      {...otherProps}
    >
      {children}
    </Text>
  );
};
