import './VariatsResolutions.css';

import { Button } from '@consta/uikit/Button';
import { ContextMenu } from '@consta/uikit/ContextMenuCanary';
import { IconLaptop } from '@consta/uikit/IconLaptop';
import { useFlag } from '@consta/uikit/useFlag';
import React, { useEffect, useRef } from 'react';

import { cn } from '##/utils/bem';

import { resolutionsLabels, useResolutions } from './helpers';

const cnVariatsResolutions = cn('VariatsResolutions');

export const VariatsResolutions: React.FC<{
  onOpen: (open: boolean) => void;
  onSelect: (value: number) => void;
}> = ({ onSelect, onOpen }) => {
  const [openResolutionsMenu, setOpenResolutionsMenu] = useFlag();

  const resolutions = useResolutions();

  const refResolutionsButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    onOpen(resolutions.length ? openResolutionsMenu : false);
  }, [openResolutionsMenu, resolutions.length]);

  useEffect(() => () => onSelect(0), []);

  useEffect(() => {
    onSelect(0);
  }, [resolutions.length]);

  if (!resolutions.length) {
    return null;
  }

  return (
    <>
      <Button
        view="clear"
        iconLeft={IconLaptop}
        onClick={setOpenResolutionsMenu.toogle}
        ref={refResolutionsButton}
      />
      <ContextMenu
        className={cnVariatsResolutions('Menu')}
        getItemLabel={(item) => resolutionsLabels[item]}
        items={resolutions}
        anchorRef={refResolutionsButton}
        isOpen={openResolutionsMenu}
        onClickOutside={setOpenResolutionsMenu.off}
        direction="downStartRight"
        onItemClick={({ item }) => onSelect(item)}
      />
    </>
  );
};
