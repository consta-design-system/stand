import { cnMixSpace } from '@consta/uikit/MixSpace';
import { useAtom } from '@reatom/npm-react';
import React, { memo, useMemo } from 'react';
import { useRoute } from 'react-router5';

import { LazyDocs } from '##/componets/LazyDocs';
import { PageDecorator } from '##/containers/PageDecorator';
import { Variants } from '##/containers/Variants';
import { dimensionAtom } from '##/modules/dimension';
import { getSpaceFromDimension } from '##/utils/typographySize';

import { getStandPath, useStand } from './helpers';
import { StandPageFeedback } from './StandPageFeedback';
import { StandPageFooter } from './StandPageFooter';
import { StandPageHeader } from './StandPageHeader';
import { StandPageNavigation } from './StandPageNavigation';

export const StandPage: React.FC = memo(() => {
  const stand = useStand();
  const standID = stand?.path;
  const route = useRoute();

  const [dimension] = useAtom(dimensionAtom);

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
            mB: getSpaceFromDimension('2xl', dimension),
            mT: getSpaceFromDimension('4xl', dimension),
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
            mT: getSpaceFromDimension('4xl', dimension),
          })}
        />
        <StandPageFooter
          className={cnMixSpace({
            mT: getSpaceFromDimension('4xl', dimension),
          })}
        />
      </div>
    </PageDecorator>
  );
});
