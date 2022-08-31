import './LibPageMenu.css';

import { Badge } from '@consta/uikit/Badge';
import { Button } from '@consta/uikit/Button';
import { IconBackward } from '@consta/uikit/IconBackward';
import { IconSearch } from '@consta/uikit/IconSearch';
import { Switch } from '@consta/uikit/Switch';
import { TextField } from '@consta/uikit/TextField';
import { useAction, useAtom } from '@reatom/react';
import React, { useCallback } from 'react';
import { useRouter } from 'react-router5';

import { Image } from '##/componets/Image';
import { PortalMenu } from '##/containers/PortalMenu';
import { openLeftSide } from '##/exportAtoms/layout';
import { PreparedStand } from '##/exportTypes';
import { libAtom } from '##/modules/lib';
import { libsAtom } from '##/modules/libs';
import { routesNames, useIsActiveRouter } from '##/modules/router';
import {
  deprecatedSwichAtom,
  deprecatedSwichIsVisibleAtom,
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
const getItemHref = () => routesNames.LIBS_STAND;
const getItemParmas = (item: PreparedStand): Record<string, string> => ({
  stand: item.id,
});

const cnLibPageMenu = cn('LibPageMenu');

export const LibPageMenu: React.FC = () => {
  const [libs] = useAtom(libsAtom);
  const [lib] = useAtom(libAtom);
  const [deprecatedSwich] = useAtom(deprecatedSwichAtom);
  const [deprecatedSwichIsVisible] = useAtom(deprecatedSwichIsVisibleAtom);
  const deprecatedSwichSet = useAction(({ checked }: { checked: boolean }) =>
    deprecatedSwichAtom.set(checked),
  );
  const [searchValue] = useAtom(searchValueAtom);
  const [visibleList] = useAtom(visibleListAtom);
  const setSearchValue = useAction(({ value }: { value: string | null }) =>
    searchValueAtom.set(value || ''),
  );
  const router = useRouter();

  const getIsActive = useIsActiveRouter();

  const getItemActive = (item: PreparedStand) =>
    getIsActive(routesNames.LIBS_STAND, { stand: item.id });

  const back = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    router.navigate(routesNames.LIBS);
  }, []);

  const closeMenu = useAction(openLeftSide.setFalse);

  const additionalControls = () => (
    <div className={cnLibPageMenu('Controls')}>
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
      {lib?.logo && <Image src={lib.logo} className={cnLibPageMenu('Image')} />}
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
      {deprecatedSwichIsVisible && (
        <Switch
          checked={deprecatedSwich}
          size="m"
          className={cnLibPageMenu('Switch')}
          onChange={deprecatedSwichSet}
          label="Показывать deprecated"
        />
      )}
    </div>
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
      getItemParams={getItemParmas}
      getGroupLabel={getGroupLabel}
      getItemActive={getItemActive}
      getItemBadge={getItemBadge}
      onItemClick={closeMenu}
      getGroupKey={getGroupKey}
      getItemGroupId={getItemGroupId}
      getItemDescription={getItemDescription}
    />
  );
};
