import { Text } from '@consta/uikit/Text';
import React, { useRef } from 'react';

import { CopyButton } from '##/componets/CopyButton';
import { useHeader } from '##/hooks/useHeader';

import { cnH } from '../H';

export const H4 = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
  const { children, style, ...otherProps } = props;

  const ref = useRef<HTMLHeadingElement>(null);
  const { id } = useHeader(children, ref);

  return (
    <Text
      {...otherProps}
      ref={ref}
      className={cnH()}
      id={props.id ?? id}
      as="h4"
      weight="bold"
      style={{
        ...style,
        ['--h-size' as string]: `var(--lazy-docs-size-m)`,
      }}
    >
      <CopyButton href={`#${id}`} className={cnH('CopyButton')} />
      {children}
    </Text>
  );
};
