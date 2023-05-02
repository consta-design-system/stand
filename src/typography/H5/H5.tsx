import { Text } from '@consta/uikit/Text';
import { useAtom } from '@reatom/npm-react';
import React, { useRef } from 'react';

import { CopyButton } from '##/componets/CopyButton';
import { useHeader } from '##/hooks/useHeader';
import { sizeAtomMapFabric } from '##/modules/adaptiveSize';

import { cnH } from '../H';

export const H5 = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
  const { children, ...otherProps } = props;

  const ref = useRef<HTMLHeadingElement>(null);
  const { id, label } = useHeader(children, ref);

  const [size] = useAtom(sizeAtomMapFabric.xs);

  return (
    <Text
      ref={ref}
      className={cnH()}
      id={props.id ?? id}
      as="h5"
      size={size}
      weight="medium"
      lineHeight="xs"
      {...otherProps}
    >
      <CopyButton href={`#${id}`} className={cnH('CopyButton')} />
      {label}
    </Text>
  );
};
