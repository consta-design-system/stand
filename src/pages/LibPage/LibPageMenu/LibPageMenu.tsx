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
import { TextField } from '@consta/uikit/TextField';
import { useFlag } from '@consta/uikit/useFlag';
import { LibWithStands } from '##/exportTypes';

import './LibPageMenu.css';

const getItemLabel = (item: { title: string }) => item.title;
const getItemGroupId = (item: { group?: string }) => item.group;
const getItemDescription = () => undefined;
const getGroupLabel = (group: { title: string }) => group.title;
const getGroupKey = (group: { id: string }) => group.id;

const cnLibPageMenu = cn('LibPageMenu');

export const LibPageMenu: React.FC = () => {
  const [libs] = useAtom(libsAtom);
  const [lib] = useAtom(libAtom);
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string | undefined | null>(null);
  const [showDeprecated, setShowDeprecated] = useFlag(true);


  const getItemOnClick = useCallback(
    (item: { id: string }) => router.navigate(routesNames.LIBS_LIB, { standId: item.id }),
    [],
  );

  const back = () => useCallback(() => router.navigate(routesNames.LIBS, { replace: true }), []);

  console.log(lib)

  const { stands, image, groups } = lib ?? {} as LibWithStands;

  const AdditionalControls = () => {
    return (
      <div className={cnLibPageMenu('Controls')}>
        {libs.length > 1 && (
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
      items={stands}
      className={cnLibPageMenu()}
      groups={[...groups]}
      additionalControls={<AdditionalControls />}
      getItemLabel={getItemLabel}
      getGroupLabel={getGroupLabel}
      getGroupKey={getGroupKey}
      getItemGroupId={getItemGroupId}
      getItemOnClick={getItemOnClick}
      getItemDescription={getItemDescription}
    />
  );
};
