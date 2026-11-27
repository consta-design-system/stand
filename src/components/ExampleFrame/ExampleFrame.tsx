import './ExampleFrame.css';

import React, { forwardRef } from 'react';

import { cn } from '##/utils/bem';

const cnExampleFrame = cn('ExampleFrame');

export const ExampleFrame = forwardRef(
  (
    { className, children, ...props }: React.HTMLAttributes<HTMLDivElement>,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    return (
      <div {...props} className={cnExampleFrame(null, [className])} ref={ref}>
        <div className={cnExampleFrame('Bg', { type: 'color' })} />
        <div className={cnExampleFrame('Bg', { type: 'image' })} />
        {children}
      </div>
    );
  },
);
