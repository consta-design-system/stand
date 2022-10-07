import { Tabs } from '@consta/uikit/Tabs';
import React, { useEffect, useMemo } from 'react';
import { useRoute, useRouter } from 'react-router5';

import { useStand } from '##/containers/StandPage/helpers';
import { routesNames } from '##/modules/router';

import { NavigationItem, useNavigationList } from './helpers';

type Props = {
  className?: string;
};

export const StandPageNavigation = ({ className }: Props) => {
  const router = useRouter();
  const route = useRoute();
  const stand = useStand();

  const navigationList = useNavigationList();

  const value = useMemo(
    () =>
      navigationList.find((item) => {
        if (item.id) {
          return item.id === route.route.params.tab;
        }
        return routesNames.LIBS_LIB_STAND === route.route.name;
      }) as NavigationItem,
    [route],
  );

  const handleClick = ({ value }: { value: NavigationItem }) => {
    if (value.id) {
      router.navigate(routesNames.LIBS_LIB_STAND_TAB, {
        stand: stand?.id,
        lib: stand?.lib.id,
        tab: value.id,
      });
    } else {
      router.navigate(routesNames.LIBS_LIB_STAND, {
        stand: stand?.id,
        lib: stand?.lib.id,
      });
    }
  };

  useEffect(() => {
    if (navigationList.length === 1) {
      handleClick({ value: navigationList[0] });
    }
  }, [stand?.id]);

  if (navigationList.length <= 1) {
    return null;
  }

  return (
    <Tabs
      items={navigationList}
      onChange={handleClick}
      size="m"
      fitMode="scroll"
      className={className}
      value={value}
    />
  );
};
