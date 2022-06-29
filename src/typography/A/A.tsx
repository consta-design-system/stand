import React from 'react';
import { Text } from '@consta/uikit/Text';
import { useMdxLink } from '@consta/stand/src/hooks/useMdxLink';

export const A = (props: React.HTMLAttributes<HTMLAnchorElement> & { href: string }) => {
  const { children, href: hrefProp = '', ...otherProps } = props;

  const { href, onClick } = useMdxLink(hrefProp); 

  return (
    <Text as="a" href={href} view="link" style={{ textDecoration: 'none' }} onClick={onClick} {...otherProps}>
      {children}
    </Text>
  );
};
