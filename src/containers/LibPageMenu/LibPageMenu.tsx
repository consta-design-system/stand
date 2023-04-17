import './LibPageMenu.css';

import { IconBackward } from '@consta/icons/IconBackward';
import { Badge } from '@consta/uikit/Badge';
import { Button } from '@consta/uikit/Button';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { Text } from '@consta/uikit/Text';
import { useAction, useAtom } from '@reatom/npm-react';
import React, { memo, useCallback } from 'react';
import { useRoute, useRouter } from 'react-router5';

import { PortalMenu } from '##/containers/PortalMenu';
import { PortalMenuItem } from '##/containers/PortalMenu/PortalMenuItem';
import { useScrollToActive } from '##/hooks/useScrollToActive';
import { headerLeftSideHeightAtom } from '##/modules/header';
import { openLeftSideAtom } from '##/modules/layout';
import { libAtom } from '##/modules/lib';
import { libsAtom } from '##/modules/libs';
import { routesNames, useIsActiveRouter } from '##/modules/router';
import {
  libPageMenuFiltersHeightAtom,
  searchValueAtom,
  visibleListAtom,
} from '##/modules/standsMenu';
import { Group, PreparedStand } from '##/types';
import { cn } from '##/utils/bem';

import { LibPageMenuFilters } from './LibPageMenuFilters';

const mapBadgeProps = {
  stable: undefined,
  canary: {
    label: 'canary',
    status: 'normal',
  },
  inWork: {
    label: 'в работе',
    status: 'warning',
  },
  deprecated: {
    label: 'deprecated',
    status: 'error',
  },
} as const;

const getItemLabel = (item: PreparedStand) => item.stand.title;
const getItemGroupId = (item: PreparedStand) => item.stand.group;
const getGroupLabel = (group: { title: string }) => group.title;
const getGroupKey = (group: { id: string }) => group.id;
const getItemRightSide = (item: PreparedStand) => {
  if (!item.stand.status) {
    return undefined;
  }

  const props = mapBadgeProps[item.stand.status];

  if (!props) {
    return undefined;
  }

  return <Badge {...props} size="s" view="stroked" form="round" />;
};

const cnLibPageMenu = cn('LibPageMenu');

export const LibPageMenu = memo(() => {
  const [libs] = useAtom(libsAtom);
  const [lib] = useAtom(libAtom);
  const [headerLeftSideHeight] = useAtom(headerLeftSideHeightAtom);
  const [libPageMenuFiltersHeight] = useAtom(libPageMenuFiltersHeightAtom);

  const [searchValue] = useAtom(searchValueAtom);
  const [visibleList] = useAtom(visibleListAtom);
  const router = useRouter();
  const route = useRoute();
  const openPrimaryMenuSetFalse = useAction(openLeftSideAtom.setFalse);

  useScrollToActive();

  const getIsActive = useIsActiveRouter();

  const getItemActive = (item: PreparedStand) =>
    getIsActive(routesNames.LIBS_LIB_STAND, {
      stand: item.id,
      lib: item.lib.id,
    });

  const navigateToBack = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    router.navigate(routesNames.LIBS);
    openPrimaryMenuSetFalse();
  }, []);

  const navigateToReview = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      router.navigate(routesNames.LIBS_LIB, { lib: lib?.id });
      openPrimaryMenuSetFalse();
    },
    [lib?.id],
  );

  const onItemClick = useCallback(
    ({ e, item }: { e: React.MouseEvent; item: PreparedStand }) => {
      e.preventDefault();
      router.navigate(routesNames.LIBS_LIB_STAND, {
        lib: item.lib.id,
        stand: item.id,
      });
      openPrimaryMenuSetFalse();
    },
    [],
  );

  const getItemHref = useCallback((item: PreparedStand) => {
    return router.buildPath(routesNames.LIBS_LIB_STAND, {
      lib: item.lib.id,
      stand: item.id,
    });
  }, []);

  const getGroupIsOpen = (group: Group | undefined) => {
    return !!visibleList.find(
      (item) =>
        (item.stand.group === group?.id && getItemActive(item)) ||
        group?.initialOpen,
    );
  };

  const additionalControls = () => (
    <PortalMenuItem
      href={router.buildPath(routesNames.LIBS_LIB, { lib: lib?.id })}
      active={route.route.name === routesNames.LIBS_LIB}
      onClick={navigateToReview}
      className={cnLibPageMenu('ButtonReview')}
    >
      <Text weight="semibold">{lib?.title}</Text>
      <Text size="s" view="secondary">
        обзор
      </Text>
    </PortalMenuItem>
  );

  if (!lib) {
    return null;
  }

  return (
    <>
      <div
        className={cnLibPageMenu()}
        style={{
          ['--header-left-side-height' as string]: `${headerLeftSideHeight}px`,
          ['--filters-left-side-height' as string]: `${libPageMenuFiltersHeight}px`,
        }}
      >
        {libs?.length > 1 && (
          <Text
            className={cnLibPageMenu('ButtonBack', [
              cnMixSpace({ pH: 'm', pV: 's' }),
            ])}
            as="a"
            href={router.buildPath(routesNames.LIBS)}
            onClick={navigateToBack}
            size="s"
            weight="semibold"
          >
            <Button
              as="span"
              iconLeft={IconBackward}
              size="xs"
              form="round"
              view="ghost"
            />
            Назад
          </Text>
        )}
        <PortalMenu
          items={visibleList}
          className={cnMixSpace({ pH: 'm', pT: 'm' })}
          groups={lib.groups as Group[]}
          additionalControls={additionalControls()}
          getItemLabel={getItemLabel}
          getItemHref={getItemHref}
          getGroupLabel={getGroupLabel}
          getItemActive={getItemActive}
          getItemRightSide={getItemRightSide}
          onItemClick={onItemClick}
          getGroupKey={getGroupKey}
          withoutGroups={!!searchValue && searchValue.trim() !== ''}
          getGroupInitialOpen={getGroupIsOpen}
          getItemGroupId={getItemGroupId}
        />
      </div>
      <LibPageMenuFilters />
    </>
  );
});
