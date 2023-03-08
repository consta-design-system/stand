import './StandPage.css';

import React, { memo, useMemo } from 'react';
import { useRoute } from 'react-router5';

import { LazyDocs } from '##/componets/LazyDocs';
import { PageDecorator } from '##/containers/PageDecorator';
import { Variants } from '##/containers/Variants';
import { cn } from '##/utils/bem';

import { getStandPath, useStand } from './helpers';
import { StandPageFigma } from './StandPageFigma';
import { StandPageFooter } from './StandPageFooter';
import { StandPageHeader } from './StandPageHeader';
import { StandPageNavigation } from './StandPageNavigation';
import { StandPageSandbox } from './StandPageSandbox';

const cnStandPage = cn('StandPage');

export const StandPage: React.FC = memo(() => {
  const stand = useStand();
  const standID = stand?.path;
  const route = useRoute();

  const tab = useMemo(
    () =>
      stand?.lib.standTabs?.find(
        (item) => item.id === (route.route.params.tab || ''),
      ),
    [route.route.params.tab],
  );

  if (!standID) {
    return null;
  }

  const standPath = getStandPath(tab?.id, standID, stand);

  return (
    <PageDecorator>
      <div key={standID}>
        <StandPageHeader stand={stand.stand} />
        <StandPageNavigation className={cnStandPage('Navigation')} />
        {tab?.id === '' && stand.lazyAccess.variants && (
          <Variants
            stand={route.route.params.stand as string}
            lib={route.route.params.lib as string}
          />
        )}
        {tab?.figma && stand.stand.figma && (
          <StandPageFigma
            className={cnStandPage('Figma')}
            link={stand.stand.figma}
          />
        )}
        {tab?.sandbox && stand.stand.sandbox && (
          <StandPageSandbox
            className={cnStandPage('SandBox')}
            id={stand.stand.sandbox}
          />
        )}
        {standPath && <LazyDocs key={standPath} id={standPath} />}
        <StandPageFooter className={cnStandPage('Footer')} />
      </div>
    </PageDecorator>
  );
});
