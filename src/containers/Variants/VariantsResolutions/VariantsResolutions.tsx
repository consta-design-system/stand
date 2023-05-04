import './VariantsResolutions.css';

import { Button } from '@consta/uikit/Button';
import { ContextMenu } from '@consta/uikit/ContextMenu';
import { IconCheck } from '@consta/uikit/IconCheck';
import { useFlag } from '@consta/uikit/useFlag';
import React, { useEffect, useRef, useState } from 'react';

import { cn } from '##/utils/bem';

import { useZIndex } from '../helpers';
import {
  getItemKey,
  getItemLabel,
  getResolutionIcon,
  useResolutions,
} from './helpers';

const cnVariantsResolutions = cn('VariantsResolutions');

export const VariantsResolutions: React.FC<{
  onOpen: (open: boolean) => void;
  onSelect: (value: number) => void;
  componentRef: React.RefObject<HTMLDivElement>;
}> = ({ onSelect, onOpen, componentRef }) => {
  const [openResolutionsMenu, setOpenResolutionsMenu] = useFlag();
  const [resolution, setResolution] = useState(0);

  const resolutions = useResolutions(componentRef);

  const refResolutionsButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    onOpen(resolutions.length ? openResolutionsMenu : false);
  }, [openResolutionsMenu, resolutions.length]);

  useEffect(() => {
    onSelect(0);
    setResolution(0);
  }, []);

  useEffect(() => {
    onSelect(0);
    setResolution(0);
  }, [resolutions.length]);

  const zIndex = useZIndex();

  if (!resolutions.length) {
    return null;
  }

  const handleSelect = ({ item }: { item: number }) => {
    onSelect(item);
    setResolution(item);
    setOpenResolutionsMenu.off();
  };

  return (
    <>
      <Button
        view="ghost"
        form="round"
        iconLeft={getResolutionIcon(resolution)}
        onClick={setOpenResolutionsMenu.toggle}
        ref={refResolutionsButton}
        size="xs"
      />
      <ContextMenu
        className={cnVariantsResolutions('Menu')}
        getItemLabel={getItemLabel}
        getItemKey={getItemKey}
        items={resolutions}
        anchorRef={refResolutionsButton}
        size="s"
        getItemLeftIcon={getResolutionIcon}
        getItemRightIcon={(item) =>
          item === resolution ? IconCheck : undefined
        }
        isOpen={openResolutionsMenu}
        onClickOutside={setOpenResolutionsMenu.off}
        direction="downStartRight"
        onItemClick={handleSelect}
        style={{ zIndex }}
      />
    </>
  );
};
