import './H2.css';

import { CopyButton } from '@consta/stand/src/componets/CopyButton';
import { Text } from '@consta/uikit/Text';
import React, { useRef } from 'react';

import { useHeader } from '##/hooks/useHeader';
import { cn } from '##/utils/bem';

const cnH2 = cn('H2');

export const H2 = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
  const { children, ...otherProps } = props;

  const ref = useRef<HTMLHeadingElement>(null);
  const { id, label } = useHeader(children, ref);

  return (
    <Text
      ref={ref}
      className={cnH2()}
      id={props.id ?? id}
      as="h2"
      size="2xl"
      weight="semibold"
      lineHeight="m"
      {...otherProps}
    >
      <CopyButton href={`#${id}`} className={cnH2('CopyButton')} />

      {label}
    </Text>
  );
};
