import './CopyButton.css';

import { Button } from '@consta/uikit/Button';
import { IconConnection } from '@consta/uikit/IconConnection';
import React from 'react';

import { useMdxLink } from '##/hooks/useMdxLink';
import { cn } from '##/utils/bem';

const cnCopyButton = cn('CopyButton');

export const CopyButton = (
  props: React.HTMLAttributes<HTMLAnchorElement> & { href: string },
) => {
  const { className, children, href, ...otherProps } = props;

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
      className={cnCopyButton(null, [className])}
      {...otherProps}
    />
  );
};
