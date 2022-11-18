import './LibPageMenu.css';

import { Badge } from '@consta/uikit/Badge';
import { Button } from '@consta/uikit/Button';
import { IconArrowLeft } from '@consta/uikit/IconArrowLeft';
import { IconSearch } from '@consta/uikit/IconSearch';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import { useAction, useAtom } from '@reatom/npm-react';
import React, { memo, useCallback } from 'react';
import { useRoute, useRouter } from 'react-router5';

import { PortalMenu } from '##/containers/PortalMenu';
import { PortalMenuItem } from '##/containers/PortalMenu/PortalMenuItem';
import { useScrollToActive } from '##/hooks/useScrollToActive';
import { openPrimaryMenuAtom, openSecondaryMenuAtom } from '##/modules/layout';
import { libAtom } from '##/modules/lib';
import { libsAtom } from '##/modules/libs';
import { routesNames, useIsActiveRouter } from '##/modules/router';
import { searchValueAtom, visibleListAtom } from '##/modules/standsMenu';
import { Group, PreparedStand } from '##/types';
import { cn } from '##/utils/bem';

import { LibPageMenuFilters } from './LibPageMenuFilters';

const mapBadgeProps = {
  stable: undefined,
  canary: {
    label: 'canary',
    status: 'success',
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

  return <Badge {...props} size="s" view="stroked" />;
};

const cnLibPageMenu = cn('LibPageMenu');

export const LibPageMenu = memo(() => {
  const [libs] = useAtom(libsAtom);
  const [lib] = useAtom(libAtom);

  const [searchValue] = useAtom(searchValueAtom);
  const [visibleList] = useAtom(visibleListAtom);
  const setSearchValue = useAction((ctx, { value }: { value: string | null }) =>
    searchValueAtom(ctx, value || ''),
  );
  const router = useRouter();
  const route = useRoute();
  const openPrimaryMenuSetFalse = useAction(openPrimaryMenuAtom.setFalse);
  const openSecondaryMenuSetFalse = useAction(openSecondaryMenuAtom.setFalse);

  useScrollToActive();

  const getIsActive = useIsActiveRouter();

  const getItemActive = (item: PreparedStand) =>
    getIsActive(routesNames.LIBS_LIB_STAND, {
      stand: item.id,
      lib: item.lib.id,
    });

  const back = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    router.navigate(routesNames.LIBS);
    openPrimaryMenuSetFalse();
    openSecondaryMenuSetFalse();
  }, []);

  const navigateToReview = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      router.navigate(routesNames.LIBS_LIB, { lib: lib?.id });
      openPrimaryMenuSetFalse();
      openSecondaryMenuSetFalse();
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
      openSecondaryMenuSetFalse();
    },
    [],
  );

  const getItemHref = useCallback((item: PreparedStand) => {
    return router.buildPath(routesNames.LIBS_LIB_STAND, {
      lib: item.lib.id,
      stand: item.id,
    });
  }, []);

  const getGroupIsOpen = (group: Group) => {
    return !!visibleList.find(
      (item) =>
        (item.stand.group === group.id && getItemActive(item)) ||
        group.initialOpen,
    );
  };

  const additionalControls = () => (
    <>
      <div className={cnLibPageMenu('Controls')}>
        {libs?.length > 1 && (
          <Text
            className={cnLibPageMenu('ButtonLibs')}
            as="a"
            href={router.buildPath(routesNames.LIBS)}
            onClick={back}
            size="s"
            view="secondary"
            weight="semibold"
          >
            <Button
              as="span"
              iconLeft={IconArrowLeft}
              size="xs"
              form="round"
              iconSize="s"
            />
            Библиотеки
          </Text>
        )}
        <div className={cnLibPageMenu('Header')}>
          <Text size="xl" lineHeight="m" view="brand" weight="semibold">
            {lib?.title}
          </Text>
        </div>
        <TextField
          type="text"
          value={searchValue}
          size="s"
          width="full"
          placeholder="Поиск"
          leftSide={IconSearch}
          className={cnLibPageMenu('Input')}
          onChange={setSearchValue}
        />
      </div>
      <PortalMenuItem
        href={router.buildPath(routesNames.LIBS_LIB, { lib: lib?.id })}
        label="Обзор"
        active={route.route.name === routesNames.LIBS_LIB}
        onClick={navigateToReview}
      />
    </>
  );

  if (!lib) {
    return null;
  }

  return (
    <PortalMenu
      items={visibleList}
      className={cnLibPageMenu()}
      groups={[...lib.groups]}
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
      filters={<LibPageMenuFilters />}
    />
  );
});
