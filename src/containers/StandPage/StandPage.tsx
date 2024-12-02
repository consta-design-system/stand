import './StandPage.css';

import { useAtom } from '@reatom/npm-react';
import React, { memo, useMemo } from 'react';
import { useRoute } from 'react-router5';

import { LazyDocs } from '##/componets/LazyDocs';
import { PageDecorator } from '##/containers/PageDecorator';
import { Variants } from '##/containers/Variants';
import { gapMapAtom, sizeMapAtom } from '##/modules/adaptiveSize';
import { cn } from '##/utils/bem';

import { getStandPath, useStand } from './helpers';
import { StandPageHeader } from './StandPageHeader';
import { StandPageNavigation } from './StandPageNavigation';

const cnStandPage = cn('StandPage');

export const StandPage: React.FC = memo(() => {
  const stand = useStand();
  const standID = stand?.path;
  const route = useRoute();

  const [gapMap] = useAtom(gapMapAtom);
  const [sizeMap] = useAtom(sizeMapAtom);

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
      <div key={standID} style={{ ...gapMap, ...sizeMap }}>
        <StandPageHeader
          stand={stand.stand}
          className={cnStandPage('Header')}
        />
        <StandPageNavigation className={cnStandPage('Navigation')} />
        {tab?.id === '' && stand.lazyAccess.variants && (
          <Variants
            stand={route.route.params.stand as string}
            lib={route.route.params.lib as string}
          />
        )}
        {standPath && (
          <div className={cnStandPage('Docs')}>
            <LazyDocs key={standPath} id={standPath} />
          </div>
        )}
      </div>
    </PageDecorator>
  );
});
