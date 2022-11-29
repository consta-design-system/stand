import './Example.css';

import {
  getLastPoint,
  useComponentBreakpoints,
} from '@consta/uikit/useComponentBreakpoints';
import { useForkRef } from '@consta/uikit/useForkRef';
import React, { forwardRef, useRef } from 'react';

import { cn } from '##/utils/bem';
import { PropsWithHTMLAttributes } from '##/utils/types/PropsWithHTMLAttributes';

export type StoryBookModsProps = PropsWithHTMLAttributes<
  {
    col?: number | Record<string, number>;
    children: React.ReactNode | React.ReactNode[];
  },
  HTMLDivElement
>;

export const cnExample = cn('Example');

export const Example = forwardRef(
  (props: StoryBookModsProps, ref: React.Ref<HTMLDivElement>) => {
    const { children, className, col, style, ...otherProps } = props;

    const rootRef = useRef(null);

    const lastPoint = getLastPoint(
      useComponentBreakpoints(rootRef, typeof col === 'object' ? col : {}),
    );

    const display = col ? 'grid' : 'flex';

    return (
      <div
        {...otherProps}
        className={cnExample({ display }, [className])}
        style={{
          ['--example-col' as string]:
            typeof col === 'object' ? lastPoint || 1 : col,
          ...style,
        }}
        ref={useForkRef([ref, rootRef])}
      >
        {Array.isArray(children)
          ? children.map((item, index) => (
              <div key={index} className={cnExample('Item')}>
                {item}
              </div>
            ))
          : children}
      </div>
    );
  },
);
