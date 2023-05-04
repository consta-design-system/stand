import { Text } from '@consta/uikit/Text';
import { useAtom } from '@reatom/npm-react';
import React, { useRef } from 'react';

import { CopyButton } from '##/componets/CopyButton';
import { useHeader } from '##/hooks/useHeader';
import { sizeAtomMapFabric } from '##/modules/adaptiveSize';

import { cnH } from '../H';

export const H6 = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
  const { children, style, ...otherProps } = props;

  const ref = useRef<HTMLHeadingElement>(null);
  const { id, label } = useHeader(children, ref);

  const [size] = useAtom(sizeAtomMapFabric.xs);

  return (
    <Text
      ref={ref}
      className={cnH()}
      id={props.id ?? id}
      as="h6"
      size={size}
      weight="regular"
      lineHeight="m"
      style={{
        ...style,
        ['--h-line-height' as string]: `calc(var(--size-text-${size}) * 1.2)`,
      }}
      {...otherProps}
    >
      <CopyButton href={`#${id}`} className={cnH('CopyButton')} />
      {label}
    </Text>
  );
};
