import React from 'react';

import { DocLayout } from '##/componets/DocLayout';

import { LibPageMenu } from './LibPageMenu';
// import { LibsPageContent } from './LibsPageContent';

export const LibPage: React.FC = () => {
  return (
    <DocLayout leftSide={<LibPageMenu />}>
      {/* <LibsPageContent /> */}
      <p></p>
    </DocLayout>
  );
};
