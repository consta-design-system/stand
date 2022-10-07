import './Variants.css';

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

import { useFullScreen, useIframeBridge, ZIndexContext } from './helpers';
import { VariantsResolutions } from './VariantsResolutions';

const cnVariants = cn('Variants');

export const Variants: React.FC<{ stand: string; lib: string }> = ({
  stand,
  lib,
}) => {
  const router = useRouter();
  const [openBoard, setOpenBoard] = useFlag();
  const [openResolutionsMenu, setOpenResolutionsMenu] = useState<boolean>();
  const [resolution, setResolution] = useState<number>(0);
  const [fullScreen, setFullscreen] = useFullScreen();
  const { isDesctop } = useBreakpoints({ isDesctop: 900 });

  const ref = useIframeBridge();
  const refBoard = useRef<HTMLDivElement>(null);

  const src = router.buildPath(routesNames.LIBS_VARIANTS, { stand, lib });

  useClickOutside({
    isActive: !isDesctop,
    ignoreClicksInsideRefs: [refBoard],
    handler: setOpenBoard.off,
  });

  return (
    <ZIndexContext.Provider value={fullScreen ? 101 : undefined}>
      <div className={cnVariants({ fullScreen })}>
        <div className={cnVariants('Body')}>
          <div className={cnVariants('Header', { fullScreen })}>
            <Button
              view="clear"
              iconLeft={fullScreen ? IconCollapse : IconExpand}
              onClick={setFullscreen}
            />
            {fullScreen && <ThemeToggler />}
            {fullScreen && (
              <VariantsResolutions
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
          <div className={cnVariants('Component', { fullScreen })}>
            <iframe
              className={cnVariants('Iframe')}
              style={{ width: resolution || undefined }}
              ref={ref}
              title="variants"
              src={src}
            />
          </div>
        </div>
        <div
          className={cnVariants('Overlay', {
            visible: openBoard || openResolutionsMenu,
            fullScreen,
          })}
        />
        <div className={cnVariants('BoardWrapper', { open: openBoard })}>
          <VariantsBoard
            ref={refBoard}
            className={cnVariants('Board', {
              open: openBoard,
              fullScreen,
            })}
          />
        </div>
      </div>
      <div className={cnVariants('Fake', { fullScreen })} />
    </ZIndexContext.Provider>
  );
};
