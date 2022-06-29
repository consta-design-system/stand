import React from 'react';
import { Text } from '@consta/uikit/Text';
import { useHref } from '##/hooks/useHref';

export const A = (props: React.HTMLAttributes<HTMLAnchorElement> & { href: string }) => {
  const { children, href: hrefProp = '', ...otherProps } = props;

  const { href, onClick } = useHref(hrefProp); 

  return (
    <Text as="a" href={href} view="link" style={{ textDecoration: 'none' }} onClick={onClick} {...otherProps}>
      {children}
    </Text>
  );
};
