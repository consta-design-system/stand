import { Text } from '@consta/uikit/Text';
import { useAtom } from '@reatom/npm-react';
import React, { useRef } from 'react';

import { CopyButton } from '##/componets/CopyButton';
import { useHeader } from '##/hooks/useHeader';
import { sizeAtomMapFabric } from '##/modules/adaptiveSize';

import { cnH } from '../H';

export const H4 = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
  const { children, ...otherProps } = props;

  const ref = useRef<HTMLHeadingElement>(null);
  const { id, label } = useHeader(children, ref);

  const [size] = useAtom(sizeAtomMapFabric.s);

  return (
    <Text
      ref={ref}
      className={cnH()}
      id={props.id ?? id}
      as="h4"
      size={size}
      weight="regular"
      lineHeight="xs"
      {...otherProps}
    >
      <CopyButton href={`#${id}`} className={cnH('CopyButton')} />
      {label}
    </Text>
  );
};
