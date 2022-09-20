import './H5.css';

import { Text } from '@consta/uikit/Text';
import React, { useRef } from 'react';

import { CopyButton } from '##/componets/CopyButton';
import { useHeader } from '##/hooks/useHeader';
import { cn } from '##/utils/bem';

const cnH5 = cn('H5');

export const H5 = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
  const { children, ...otherProps } = props;

  const ref = useRef<HTMLHeadingElement>(null);
  const { id, label } = useHeader(children, ref);

  return (
    <Text
      ref={ref}
      className={cnH5()}
      id={props.id ?? id}
      as="h5"
      size="m"
      weight="semibold"
      lineHeight="xs"
      {...otherProps}
    >
      <CopyButton href={`#${id}`} className={cnH5('CopyButton')} />
      {label}
    </Text>
  );
};
