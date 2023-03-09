import './StandPage.css';

import { cnMixSpace } from '@consta/uikit/MixSpace';
import React, { memo, useMemo } from 'react';
import { useRoute } from 'react-router5';

import { LazyDocs } from '##/componets/LazyDocs';
import { PageDecorator } from '##/containers/PageDecorator';
import { Variants } from '##/containers/Variants';
import { cn } from '##/utils/bem';

import { getStandPath, useStand } from './helpers';
import { StandPageFeedback } from './StandPageFeedback';
import { StandPageFooter } from './StandPageFooter';
import { StandPageHeader } from './StandPageHeader';
import { StandPageNavigation } from './StandPageNavigation';

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
        <StandPageHeader
          stand={stand.stand}
          className={cnMixSpace({ mB: '2xl' })}
        />
        <StandPageNavigation className={cnMixSpace({ mB: '3xl' })} />
        {tab?.id === '' && stand.lazyAccess.variants && (
          <Variants
            stand={route.route.params.stand as string}
            lib={route.route.params.lib as string}
          />
        )}
        {standPath && <LazyDocs key={standPath} id={standPath} />}
        <StandPageFeedback className={cnStandPage('Feedback')} />
        <StandPageFooter className={cnStandPage('Footer')} />
      </div>
    </PageDecorator>
  );
});
