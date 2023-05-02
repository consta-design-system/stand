import { cnMixSpace } from '@consta/uikit/MixSpace';
import { useAtom } from '@reatom/npm-react';
import React, { memo, useMemo } from 'react';
import { useRoute } from 'react-router5';

import { LazyDocs } from '##/componets/LazyDocs';
import { PageDecorator } from '##/containers/PageDecorator';
import { Variants } from '##/containers/Variants';
import { gapAtomMapFabric } from '##/modules/adaptiveSize';

import { getStandPath, useStand } from './helpers';
import { StandPageFeedback } from './StandPageFeedback';
import { StandPageFooter } from './StandPageFooter';
import { StandPageHeader } from './StandPageHeader';
import { StandPageNavigation } from './StandPageNavigation';

export const StandPage: React.FC = memo(() => {
  const stand = useStand();
  const standID = stand?.path;
  const route = useRoute();

  const [gap2xl] = useAtom(gapAtomMapFabric['2xl']);
  const [gap4xl] = useAtom(gapAtomMapFabric['4xl']);

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
        <StandPageNavigation
          className={cnMixSpace({
            mB: gap2xl,
            mT: gap4xl,
          })}
        />
        {tab?.id === '' && stand.lazyAccess.variants && (
          <Variants
            stand={route.route.params.stand as string}
            lib={route.route.params.lib as string}
          />
        )}
        {standPath && <LazyDocs key={standPath} id={standPath} />}
        <StandPageFeedback
          className={cnMixSpace({
            mT: gap4xl,
          })}
        />
        <StandPageFooter
          className={cnMixSpace({
            mT: gap4xl,
          })}
        />
      </div>
    </PageDecorator>
  );
});
