import React from 'react';

import { NavigationOptions } from 'router5';

import { PropsWithHTMLAttributes } from '##/utils/types/PropsWithHTMLAttributes';

import { useLink } from '##/hooks/useLink';

export const Link: React.FC<
  PropsWithHTMLAttributes<
    { href?: never; to: string; params?: Record<string, string>; options?: NavigationOptions },
    HTMLAnchorElement
  >
> = ({ to, onClick, params, options, ...props }) => {
  const link = useLink({ to, params, options, onClick });

  return (
    <a {...props} href={link[0]} onClick={link[1]}>
      {props.children}
    </a>
  );
};
