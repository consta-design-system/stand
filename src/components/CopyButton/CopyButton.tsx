import { IconConnection } from '@consta/icons/IconConnection';
import { Button } from '@consta/uikit/Button';
import React from 'react';

import { useMdxLink } from '##/hooks/useMdxLink';

export const CopyButton = (
  props: React.HTMLAttributes<HTMLAnchorElement> & { href: string },
) => {
  const { children, href, ...otherProps } = props;

  const handleClick: React.MouseEventHandler = (e) => {
    navigator.clipboard.writeText(`${window.location.origin}${link[0]}`);
  };

  const link = useMdxLink(href, handleClick);

  return (
    <Button
      as="a"
      onlyIcon
      size="xs"
      iconLeft={IconConnection}
      view="clear"
      aria-hidden
      href={link[0]}
      tabIndex={-1}
      onClick={link[1]}
      {...otherProps}
    />
  );
};
