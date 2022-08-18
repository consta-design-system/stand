import { Tabs } from '@consta/uikit/TabsCanary';
import React, { useEffect, useMemo } from 'react';
import { useRoute, useRouter } from 'react-router5';

import { useStand } from '../useStand';
import {
  getGuardItemNavigate,
  getNavigationList,
  NavigationItem,
} from './helpers';

type Props = {
  className?: string;
};

export const StandPageNavigation = (props: Props) => {
  const { className } = props;
  const router = useRouter();
  const route = useRoute();
  const stand = useStand();

  const navigationList = useMemo(() => getNavigationList(stand), [stand?.id]);

  const value = useMemo(
    () =>
      navigationList.find(
        (item) => item.id === route.route.name,
      ) as NavigationItem,
    [route],
  );

  const handleClick = ({ value }: { value: NavigationItem }) => {
    router.navigate(value.id, { stand: stand?.id });
  };

  useEffect(() => {
    if (navigationList.length === 1) {
      const guardRouteName = getGuardItemNavigate(stand);
      if (guardRouteName && route.route.name !== guardRouteName) {
        router.navigate(
          guardRouteName,
          { stand: stand?.id },
          { replace: true },
        );
      }
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
