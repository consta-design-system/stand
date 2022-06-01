import React, { useCallback, useState } from 'react';

import { PortalMenu } from '##/componets/PortalMenu';
import { useAtom } from '@reatom/react';

import { libsAtom } from '##/modules/libs';
import { libAtom } from '##/modules/lib';
import { useRouter } from 'react-router5';
import { routesNames } from '##/modules/router';
import { cn } from '##/utils/bem';
import { IconBackward } from '@consta/uikit/IconBackward';
import { IconSearch } from '@consta/uikit/IconSearch';
import { Switch } from '@consta/uikit/Switch';
import { Button } from '@consta/uikit/Button';
import { Badge } from '@consta/uikit/Badge';
import { TextField } from '@consta/uikit/TextField';
import { useFlag } from '@consta/uikit/useFlag';
import { LibWithStands, Stand } from '##/exportTypes';

import './LibPageMenu.css';
import { useMemo } from 'react';

const getItemLabel = (item: { title: string }) => item.title;
const getItemGroupId = (item: { group?: string }) => item.group;
const getItemDescription = () => undefined;
const getGroupLabel = (group: { title: string }) => group.title;
const getGroupKey = (group: { id: string }) => group.id;
const getItemBadge = (item: Stand) => {
  if (item.status === 'stable') {
    return undefined;
  } else if (item.status === 'canary') {
    return <Badge label="Canary" view="filled" status="success" size="s" />
  } else if (item.status === 'inWork') {
    return <Badge label="в работе" view="filled" status="warning" size="s" />
  } else {
    return <Badge label="depricated" view="stroked" status="error" size="s" />
  }
}

const cnLibPageMenu = cn('LibPageMenu');

const defaultStand: Stand = {
    id: 'uikit',
    title: 'Обзор',
    group: 'review',
    status: 'stable',
    version: ''
}

export const LibPageMenu: React.FC = () => {
  const [libs] = useAtom(libsAtom);
  const [lib] = useAtom(libAtom);
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string | undefined | null>(null);
  const [showDeprecated, setShowDeprecated] = useFlag(true);

  const onItemClick = useCallback(
    (item: { standId?: string, id: string }) => {
      if (item.standId) {
        router.navigate(routesNames.LIBS_LIB_STAND, { libId: item.id, standId: item.standId })
      } else {
        router.navigate(routesNames.LIBS_LIB, { libId: item.id })
      }
    },
    [],
  );

  const getItemActive = (item: Stand) => {
    if (item.standId) {
      return router.isActive(routesNames.LIBS_LIB_STAND, { libId: item.id, standId: item.standId })
    } else {
      return router.isActive(routesNames.LIBS_LIB, { libId: item.id }) || router.getState().path === '/'
    }
  }

  const back = () => useCallback(() => router.navigate(routesNames.LIBS, { replace: true }), []);

  const { stands, image, groups } = lib ?? {} as LibWithStands;

  const allStands = [defaultStand, ...(stands ?? [])];

  const visibleStands = useMemo(() => {
    return allStands.filter((item) => {
      if (!showDeprecated && item.status === 'depricated') {
        return false;
      }
      if (searchValue && searchValue.trim() !== '') {
        return item.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
      }
      return true;
    });
  }, [showDeprecated, searchValue])

  const additionalControls = () => {
    return (
      <div className={cnLibPageMenu('Controls')}>
        {libs?.length > 1 && (
             <Button
             label="К списку библиотек"
             iconLeft={IconBackward}
             onClick={back}
             size="xs"
             view="clear"
             className={cnLibPageMenu('Button')}
           />
        )}
        <img alt="Consta-UIKit" src={image?.toString()} className={cnLibPageMenu('Image')} />
        <TextField
          type="text"
          value={searchValue}
          size="s"
          width="full"
          placeholder="Поиск по компонентам"
          leftSide={IconSearch}
          className={cnLibPageMenu('Input')}
          onChange={({ value }) => setSearchValue(value)}
        />
        <Switch
          checked={showDeprecated}
          size="m"
          className={cnLibPageMenu('Switch')}
          onChange={({ checked }) => setShowDeprecated[checked ? 'on' : 'off']()}
          label="Показывать deprecated"
        />
      </div>
    );
  };

  return (
    <PortalMenu
      items={visibleStands}
      className={cnLibPageMenu()}
      groups={[...(groups ?? [])]}
      additionalControls={additionalControls()}
      getItemLabel={getItemLabel}
      getGroupLabel={getGroupLabel}
      getItemActive={getItemActive}
      getItemBadge={getItemBadge}
      getGroupKey={getGroupKey}
      getItemGroupId={getItemGroupId}
      onItemClick={({ item }) => onItemClick(item)}
      getItemDescription={getItemDescription}
    />
  );
};
