import './Variats.css';

import {
  useFullScreen,
  useIframeBridge,
} from '@consta/stand/src/containers/Variats/helpers';
import { Button } from '@consta/uikit/Button';
import { IconCollapse } from '@consta/uikit/IconCollapse';
import { IconExpand } from '@consta/uikit/IconExpand';
import { IconSettings } from '@consta/uikit/IconSettings';
import { useBreakpoints } from '@consta/uikit/useBreakpoints';
import { useClickOutside } from '@consta/uikit/useClickOutside';
import { useFlag } from '@consta/uikit/useFlag';
import React, { useRef, useState } from 'react';
import { useRouter } from 'react-router5';

import { ThemeToggler } from '##/containers/ThemeToggler';
import { VariantsBoard } from '##/containers/VariantsBoard';
import { routesNames } from '##/modules/router';
import { cn } from '##/utils/bem';

import { VariatsResolutions } from './VariatsResolutions';

const cnVariats = cn('Variats');

export const Variats: React.FC<{ stand: string }> = ({ stand }) => {
  const router = useRouter();
  const [openBoard, setOpenBoard] = useFlag();
  const [openResolutionsMenu, setOpenResolutionsMenu] = useState<boolean>();
  const [resolution, setResolution] = useState<number>(0);
  const [fullScreen, setFullscreen] = useFullScreen();
  const { isDesctop } = useBreakpoints({ isDesctop: 900 });

  const ref = useIframeBridge();
  const refBoard = useRef<HTMLDivElement>(null);

  const src = router.buildPath(routesNames.LIBS_VARIANTS, { stand });

  useClickOutside({
    isActive: !isDesctop,
    ignoreClicksInsideRefs: [refBoard],
    handler: setOpenBoard.off,
  });

  return (
    <div className={cnVariats({ fullScreen })}>
      <div className={cnVariats('Body')}>
        <div className={cnVariats('Header', { fullScreen })}>
          <Button
            view="clear"
            iconLeft={fullScreen ? IconCollapse : IconExpand}
            onClick={setFullscreen}
          />
          {fullScreen && <ThemeToggler />}
          {fullScreen && (
            <VariatsResolutions
              onOpen={setOpenResolutionsMenu}
              onSelect={setResolution}
            />
          )}
          {!isDesctop && (
            <Button
              view="clear"
              iconLeft={IconSettings}
              onClick={setOpenBoard.on}
            />
          )}
        </div>
        <div className={cnVariats('Component', { fullScreen })}>
          <iframe
            className={cnVariats('Iframe')}
            style={{ width: resolution || undefined }}
            ref={ref}
            title="variants"
            src={src}
          />
        </div>
      </div>
      <div
        className={cnVariats('Overlay', {
          visible: openBoard || openResolutionsMenu,
          fullScreen,
        })}
      />
      <div className={cnVariats('BoardWrapper', { open: openBoard })}>
        <VariantsBoard
          ref={refBoard}
          className={cnVariats('Board', {
            open: openBoard,
            fullScreen,
          })}
        />
      </div>
    </div>
  );
};
