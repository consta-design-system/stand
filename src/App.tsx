import React from 'react';

import { DocLayout } from '##/componets/DocLayout';

import { Pages } from '##/containers/Pages';
import { Menu } from '##/containers/Menu';
import { SideLinks } from '##/containers/SideLinks';
import { useMenu } from '##/hooks/useMenu';
// import { RightMenu } from '##/containers/RightMenu';
import { Header } from '##/containers/Header';

export const App: React.FC = () => {
  return (
    <DocLayout leftSide={<Menu />} rightSide={<SideLinks />} header={<Header />}>
      <Pages />
    </DocLayout>
  );
};
