import React from 'react';

import { DocLayout } from '##/componets/DocLayout';

import { Pages } from '##/containers/Pages';
import { Menu } from '##/containers/Menu';
import { SideLinks } from '##/componets/SideLinks';
import { useMenu } from '##/hooks/useMenu';

export const App: React.FC = () => {
  const { menu, links, showMenu } = useMenu();

  return (
    <DocLayout leftSide={<Menu />} rightSide={showMenu ? <SideLinks menu={menu} links={links} /> : undefined}>
      <Pages />
    </DocLayout>
  );
};
