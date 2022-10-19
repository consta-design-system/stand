import './LibPageMenu.css';

import { Badge } from '@consta/uikit/Badge';
import { Button } from '@consta/uikit/Button';
import { ContextMenu } from '@consta/uikit/ContextMenu';
import { IconBackward } from '@consta/uikit/IconBackward';
import { IconBento } from '@consta/uikit/IconBento';
import { IconSearch } from '@consta/uikit/IconSearch';
import { Switch } from '@consta/uikit/Switch';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import { useFlag } from '@consta/uikit/useFlag';
import { useAction, useAtom } from '@reatom/react';
import React, { useCallback, useRef } from 'react';
import { useRoute, useRouter } from 'react-router5';

import { PortalMenu } from '##/containers/PortalMenu';
import { openLeftSide } from '##/exportAtoms/layout';
import { Group, LibWithStands, PreparedStand } from '##/exportTypes';
import { libAtom } from '##/modules/lib';
import { libsAtom } from '##/modules/libs';
import { routesNames, useIsActiveRouter } from '##/modules/router';
import {
  canarySwitchAtom,
  deprecatedSwitchAtom,
  inWorkSwitchAtom,
  isShowFiltersAtom,
  searchValueAtom,
  visibleListAtom,
} from '##/modules/standsMenu';
import { cn } from '##/utils/bem';

const mapBadgeProps = {
  stable: undefined,
  canary: {
    label: 'canary',
    status: 'success',
    view: 'filled',
  },
  inWork: {
    label: 'в работе',
    status: 'warning',
    view: 'filled',
  },
  deprecated: {
    label: 'deprecated',
    status: 'error',
    view: 'stroked',
  },
} as const;

const getItemLabel = (item: PreparedStand) => item.stand.title;
const getItemGroupId = (item: PreparedStand) => item.stand.group;
const getItemDescription = () => undefined;
const getGroupLabel = (group: { title: string }) => group.title;
const getGroupKey = (group: { id: string }) => group.id;
const getItemBadge = (item: PreparedStand) => {
  if (!item.stand.status) {
    return undefined;
  }

  const props = mapBadgeProps[item.stand.status];

  if (!props) {
    return undefined;
  }

  return <Badge {...props} size="s" />;
};
const getItemHref = () => routesNames.LIBS_LIB_STAND;
const getItemParmas = (item: PreparedStand): Record<string, string> => ({
  stand: item.id,
  lib: item.lib.id,
});

const cnLibPageMenu = cn('LibPageMenu');

export const LibPageMenu: React.FC = () => {
  const [libs] = useAtom(libsAtom);
  const [lib] = useAtom(libAtom);

  const [deprecatedSwitch] = useAtom(deprecatedSwitchAtom);
  const [canarySwitch] = useAtom(canarySwitchAtom);
  const [inWorkSwitch] = useAtom(inWorkSwitchAtom);
  const [isShowFilters] = useAtom(isShowFiltersAtom);
  const [showLibs, setShowLibs] = useFlag();
  const deprecatedSwitchSet = useAction(({ checked }: { checked: boolean }) =>
    deprecatedSwitchAtom.set(checked),
  );
  const canarySwitchSet = useAction(({ checked }: { checked: boolean }) =>
    canarySwitchAtom.set(checked),
  );
  const inWorkSwitchSet = useAction(({ checked }: { checked: boolean }) =>
    inWorkSwitchAtom.set(checked),
  );
  const [searchValue] = useAtom(searchValueAtom);
  const [visibleList] = useAtom(visibleListAtom);
  const setSearchValue = useAction(({ value }: { value: string | null }) =>
    searchValueAtom.set(value || ''),
  );
  const router = useRouter();
  const route = useRoute();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const getIsActive = useIsActiveRouter();

  const getItemActive = (item: PreparedStand) =>
    getIsActive(routesNames.LIBS_LIB_STAND, {
      stand: item.id,
      lib: item.lib.id,
    });

  const back = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    router.navigate(routesNames.LIBS);
  }, []);

  const navigateToReview = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      router.navigate(routesNames.LIBS_LIB, { lib: lib?.id });
    },
    [lib?.id],
  );

  const closeMenu = useAction(openLeftSide.setFalse);

  const handleLibClick = (params: {
    e: React.MouseEvent;
    item: LibWithStands;
  }) => {
    const { e, item } = params;
    e.preventDefault();
    router.navigate(routesNames.LIBS_LIB, { lib: item.id });
  };

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
        <div className={cnLibPageMenu('Header')}>
          {libs?.length > 1 && (
            <>
              <Button
                iconLeft={IconBento}
                onlyIcon
                ref={buttonRef}
                size="s"
                onClick={setShowLibs.toogle}
              />
              <ContextMenu
                anchorRef={buttonRef}
                onItemClick={handleLibClick}
                items={libs}
                isOpen={showLibs}
                offset="xs"
                direction="rightDown"
                onClickOutside={setShowLibs.off}
                getItemLabel={(item) => item.title}
                size="m"
              />
            </>
          )}

          <Text size="xl" lineHeight="m" view="brand" weight="semibold">
            {lib?.title}
          </Text>
        </div>
        {libs?.length > 1 && (
          <Button
            as="a"
            href={router.buildPath(routesNames.LIBS)}
            label="К списку библиотек"
            iconLeft={IconBackward}
            size="xs"
            view="clear"
            onClick={back}
            className={cnLibPageMenu('Button')}
          />
        )}
        <TextField
          type="text"
          value={searchValue}
          size="s"
          width="full"
          placeholder="Поиск по компонентам"
          leftSide={IconSearch}
          className={cnLibPageMenu('Input')}
          onChange={setSearchValue}
        />
      </div>
      <Text
        as="a"
        href={router.buildPath(routesNames.LIBS_LIB, { lib: lib?.id })}
        size="m"
        view={route.route.name === routesNames.LIBS_LIB ? 'brand' : 'primary'}
        onClick={navigateToReview}
        display="block"
        className={cnLibPageMenu('ButtonToReview', {
          active: route.route.name === routesNames.LIBS_LIB,
        })}
      >
        Обзор
      </Text>
    </>
  );

  const filters = () => {
    return (
      <div className={cnLibPageMenu('Filters')}>
        <div className={cnLibPageMenu('Overlay')}>
          <div className={cnLibPageMenu('FiltersItem')}>
            <Badge label="Deprecated" view="stroked" size="s" status="error" />
            <Switch
              checked={deprecatedSwitch}
              size="m"
              className={cnLibPageMenu('Switch')}
              onChange={deprecatedSwitchSet}
              label="Показывать"
            />
          </div>
          <div className={cnLibPageMenu('FiltersItem')}>
            <Badge label="Canary" view="stroked" size="s" status="success" />
            <Switch
              checked={canarySwitch}
              size="m"
              className={cnLibPageMenu('Switch')}
              onChange={canarySwitchSet}
              label="Показывать"
            />
          </div>
          <div className={cnLibPageMenu('FiltersItem')}>
            <Badge label="В работе" view="stroked" size="s" status="warning" />
            <Switch
              checked={inWorkSwitch}
              size="m"
              className={cnLibPageMenu('Switch')}
              onChange={inWorkSwitchSet}
              label="Показывать"
            />
          </div>
        </div>
      </div>
    );
  };

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
      getItemParams={getItemParmas}
      getGroupLabel={getGroupLabel}
      getItemActive={getItemActive}
      getItemBadge={getItemBadge}
      onItemClick={closeMenu}
      getGroupKey={getGroupKey}
      withoutGroups={!!searchValue && searchValue.trim() !== ''}
      getGroupInitialOpen={getGroupIsOpen}
      getItemGroupId={getItemGroupId}
      filters={isShowFilters ? filters() : undefined}
      getItemDescription={getItemDescription}
    />
  );
};
