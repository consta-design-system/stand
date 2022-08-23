import './StandPage.css';

import { StandPageDecorator } from '@consta/stand/src/containers/StandPage/StandPageDecorator';
import React, { useMemo } from 'react';
import { useRoute } from 'react-router5';

import { LazyDocs } from '##/componets/LazyDocs';
import { routesNames } from '##/modules/router';
import { cn } from '##/utils/bem';

import { StandPageFigma } from './StandPageFigma';
import { StandPageFooter } from './StandPageFooter';
import { StandPageHeader } from './StandPageHeader';
import { StandPageInformer } from './StandPageInformer';
import { StandPageNavigation } from './StandPageNavigation';
import { StandPageSandbox } from './StandPageSandbox';
import { useStand } from './useStand';

const cnStandPage = cn('StandPage');

const standPathMap = {
  [routesNames.LIBS_STAND]: '',
  [routesNames.LIBS_STAND_DESIGN]: '_design',
  [routesNames.LIBS_STAND_DEV]: '_dev',
};

const getStandPath = (routerName: string, standID: string) =>
  `${standID}${standPathMap[routerName]}`;

export const StandPage: React.FC = () => {
  const stand = useStand();
  const standID = stand?.path;
  const route = useRoute();
  const routeName = route.route.name;

  if (!standID) {
    return null;
  }

  const standPath = getStandPath(routeName, standID);

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
    <StandPageDecorator>
      <div key={standID}>
        <StandPageHeader stand={stand.stand} />
        <StandPageInformer
          stand={stand.stand}
          status={standStatus}
          deprecated={deprecated}
          canary={canary}
          stable={stable}
          className={cnStandPage('Informer')}
        />
        <StandPageNavigation className={cnStandPage('Navigation')} />
        {stand.stand.figma && routeName === routesNames.LIBS_STAND_DESIGN && (
          <StandPageFigma
            className={cnStandPage('Figma')}
            link={stand.stand.figma}
          />
        )}
        {routeName === routesNames.LIBS_STAND_SANDBOX &&
          (stand.stand.sandbox ? (
            <StandPageSandbox
              className={cnStandPage('SandBox')}
              link={stand.stand.sandbox}
            />
          ) : (
            'раздел в разработке'
          ))}
        {(routeName === routesNames.LIBS_STAND ||
          routeName === routesNames.LIBS_STAND_DESIGN ||
          routeName === routesNames.LIBS_STAND_DEV) && (
          <LazyDocs key={standPath} id={standPath} />
        )}
        <StandPageFooter className={cnStandPage('Footer')} />
      </div>
    </StandPageDecorator>
  );
};
