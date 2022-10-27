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
import { StandPageInformer } from './StandPageInformer';
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

  const standStatus = stand.stand.status;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { deprecated, canary, stable } = useMemo(() => {
    const others = stand.stand.otherVersion;
    return {
      deprecated: others?.find((el) => el.status === 'deprecated'),
      canary: others?.find((el) => el.status === 'canary'),
      stable: others?.find((el) => el.status === 'stable'),
    };
  }, [standID]);

  return (
    <PageDecorator>
      <div key={standID}>
        <StandPageHeader stand={stand.stand} />
        <StandPageInformer
          lib={route.route.params.lib as string}
          stand={stand.stand}
          status={standStatus}
          deprecated={deprecated}
          canary={canary}
          stable={stable}
          className={cnStandPage('Informer')}
        />
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
