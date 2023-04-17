import { Text } from '@consta/uikit/Text';
import { useAtom } from '@reatom/npm-react';
import React, { useRef } from 'react';

import { CopyButton } from '##/componets/CopyButton';
import { useHeader } from '##/hooks/useHeader';
import { dimensionAtom } from '##/modules/dimension';
import { getSizeFromDimension } from '##/utils/typographySize';

import { cnH } from '../H';

export const H3 = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
  const { children, ...otherProps } = props;

  const ref = useRef<HTMLHeadingElement>(null);
  const { id, label } = useHeader(children, ref);

  const [dimension] = useAtom(dimensionAtom);

  return (
    <Text
      ref={ref}
      className={cnH()}
      id={props.id ?? id}
      as="h3"
      size={getSizeFromDimension('m', dimension)}
      weight="bold"
      lineHeight="m"
      {...otherProps}
    >
      <CopyButton href={`#${id}`} className={cnH('CopyButton')} />
      {label}
    </Text>
  );
};
