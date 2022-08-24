import './Blockquote.css';

import React from 'react';

import { cn } from '##/utils/bem';

const cnBlockquote = cn('Blockquote');

export const Blockquote = (props: React.HTMLAttributes<HTMLQuoteElement>) => {
  const { children, className, ...otherProps } = props;

  return (
    <blockquote className={cnBlockquote(null, [className])} {...otherProps}>
      {children}
    </blockquote>
  );
};
