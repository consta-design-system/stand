import React, { useRef } from 'react';
import { Text } from '@consta/uikit/Text';
import { cn } from '##/utils/bem';
import './H5.css';
import { useHeader } from '##/hooks/useHeader';

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
            size="l"
            weight="semibold"
            lineHeight="m" 
            {...otherProps}
        >
            {label}
        </Text>
    )
}