import './StandPage.css';

import { cnMixSpace } from '@consta/uikit/MixSpace';
import { useAtom } from '@reatom/npm-react';
import React, { memo, useMemo } from 'react';
import { useRoute } from 'react-router5';

import { LazyDocs } from '##/componets/LazyDocs';
import { PageDecorator } from '##/containers/PageDecorator';
import { Variants } from '##/containers/Variants';
import {
  gapAtomMapFabric,
  gapMapAtom,
  sizeMapAtom,
} from '##/modules/adaptiveSize';
import { cn } from '##/utils/bem';

import { getStandPath, useStand } from './helpers';
import { StandPageHeader } from './StandPageHeader';
import { StandPageNavigation } from './StandPageNavigation';

const cnStandPage = cn('StandPage');

export const StandPage: React.FC = memo(() => {
  const stand = useStand();
  const standID = stand?.path;
  const route = useRoute();

  const [gap2xl] = useAtom(gapAtomMapFabric['2xl']);
  const [gap4xl] = useAtom(gapAtomMapFabric['4xl']);
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
      <div key={standID}>
        <StandPageHeader
          stand={stand.stand}
          className={cnMixSpace({
            mB: gap4xl,
          })}
        />
        <StandPageNavigation
          className={cnMixSpace({
            mB: gap2xl,
          })}
        />
        {tab?.id === '' && stand.lazyAccess.variants && (
          <Variants
            stand={route.route.params.stand as string}
            lib={route.route.params.lib as string}
          />
        )}
        {standPath && (
          <div className={cnStandPage('Doc')} style={{ ...gapMap, ...sizeMap }}>
            <LazyDocs key={standPath} id={standPath} />
          </div>
        )}
      </div>
    </PageDecorator>
  );
});
