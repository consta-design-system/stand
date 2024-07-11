import './StandPageNavigation.css';

import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';
import { useTheme } from '@consta/uikit/Theme';
import { useBreakpoints } from '@consta/uikit/useBreakpoints';
import { useAction, useAtom } from '@reatom/npm-react';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { navigateToAction, routerAtom } from 'reatom-router5';

import { useStand } from '##/containers/StandPage/helpers';
import { routesNames } from '##/modules/router';
import { componentRepositoryUrlAtom, figmaAtom } from '##/modules/stand';
import { cn } from '##/utils/bem';

import { NavigationItem, useNavigationList } from './helpers';

type Props = {
  className?: string;
};

const cnStandPageNavigation = cn('StandPageNavigation');

export const StandPageNavigation = ({ className }: Props) => {
  const navigateTo = useAction(navigateToAction);
  const [router] = useAtom(routerAtom);
  const stand = useStand();
  const navigationList = useNavigationList();
  const ref = useRef<HTMLDivElement>(null);

  const { isDesktop } = useBreakpoints({
    ref,
    map: { isDesktop: 768 },
    isActive: true,
  });
  const { themeClassNames } = useTheme();

  const value = useMemo(
    () =>
      navigationList.find((item) => {
        if (item.id) {
          return item.id === router.route?.params.tab;
        }
        return routesNames.LIBS_LIB_STAND === router.route?.name;
      }) as NavigationItem,
    [router],
  );

  const codesandboxUrl = stand?.stand.sandbox;
  const [figmaUrl] = useAtom(figmaAtom);
  const [githubUrl] = useAtom(componentRepositoryUrlAtom);

  const hasLinks = Boolean(codesandboxUrl || figmaUrl || githubUrl);

  const handleClick = useCallback((value: NavigationItem) => {
    if (value.id) {
      navigateTo({
        name: routesNames.LIBS_LIB_STAND_TAB,
        params: {
          stand: stand?.id,
          lib: stand?.lib.id,
          tab: value.id,
        },
      });
    } else {
      navigateTo({
        name: routesNames.LIBS_LIB_STAND,
        params: {
          stand: stand?.id,
          lib: stand?.lib.id,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (
      navigationList.length === 1 &&
      router.route?.name !== routesNames.LIBS_LIB_STAND
    ) {
      navigateTo({
        name: routesNames.LIBS_LIB_STAND,
        params: {
          stand: stand?.id,
          lib: stand?.lib.id,
        },
      });
    }
  }, [stand?.id]);

  if (navigationList.length <= 1) {
    return null;
  }

  return (
    <div ref={ref} className={cnStandPageNavigation(null, [className])}>
      <div
        className={cnStandPageNavigation('Wrapper', {
          isDesktop,
          hasLinks,
        })}
      >
        {hasLinks && isDesktop && (
          <div
            className={cnStandPageNavigation('Links', [
              themeClassNames.color.invert,
            ])}
          />
        )}
        <div className={cnStandPageNavigation('Tabs')}>
          <ChoiceGroup
            size="s"
            items={navigationList}
            value={value}
            name="StandPageNavigation"
            onChange={handleClick}
          />
        </div>
      </div>
    </div>
  );
};
