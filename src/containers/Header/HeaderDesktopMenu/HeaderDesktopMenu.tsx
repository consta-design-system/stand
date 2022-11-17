import './HeaderDesktopMenu.css';

import { Menu } from '@consta/header/Menu';
import { useAtom } from '@reatom/npm-react';
import React from 'react';
import { useRouter } from 'react-router5';

import { headerMenuAtom } from '##/modules/header';
import { cn } from '##/utils/bem';

const cnHeaderDesktopMenu = cn('HeaderDesktopMenu');

export const HeaderDesktopMenu = () => {
  const [menu] = useAtom(headerMenuAtom);

  const router = useRouter();

  return (
    <Menu
      className={cnHeaderDesktopMenu()}
      items={menu}
      style={{ zIndex: 101 }}
      getItemHref={(item) => router.buildPath(item.routeName, item.params)}
      onItemClick={({ e, item }) => {
        e.preventDefault();
        router.navigate(item.routeName, item.params);
      }}
    />
  );
};
