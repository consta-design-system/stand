import './HeaderLogo.css';

import { useAtom } from '@reatom/npm-react';
import React from 'react';
import { useRouter } from 'react-router5';

import { buildLink } from '##/hooks/useLink';
import Logo from '##/images/Logo.image.svg';
import { mainPageAtom } from '##/modules/pages';
import { cn } from '##/utils/bem';

const cnHeaderLogo = cn('HeaderLogo');

export const HeaderLogo = () => {
  const routeName = useAtom(mainPageAtom)[0]?.routeName;
  const router = useRouter();
  const [link, onClick] = routeName
    ? buildLink(router, { to: routeName })
    : [undefined, undefined];

  const Tag = onClick ? 'a' : 'span';

  return (
    <Tag className={cnHeaderLogo()} href={link} onClick={onClick}>
      <Logo className={cnHeaderLogo('Image')} />
    </Tag>
  );
};
