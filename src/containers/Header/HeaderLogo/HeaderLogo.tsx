import './HeaderLogo.css';

import { Text } from '@consta/uikit/Text';
import { useAtom } from '@reatom/npm-react';
import React from 'react';
import { useRouter } from 'react-router5';

import { buildLink } from '##/hooks/useLink';
import { mainPageAtom } from '##/modules/pages';
import { cn } from '##/utils/bem';

const cnHeaderLogo = cn('HeaderLogo');

export const HeaderLogo = () => {
  const routeName = useAtom(mainPageAtom)[0]?.routeName;
  const router = useRouter();

  if (routeName) {
    const [link, onClick] = buildLink(router, { to: routeName });

    return (
      <Text
        className={cnHeaderLogo()}
        as="a"
        href={link}
        onClick={onClick}
        size="l"
        weight="bold"
      >
        Consta
      </Text>
    );
  }

  return (
    <Text size="l" weight="bold">
      Consta
    </Text>
  );
};
