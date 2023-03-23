import './Variants.css';

import { IconCollapse } from '@consta/icons/IconCollapse';
import { IconExpand } from '@consta/icons/IconExpand';
import { IconSettings } from '@consta/icons/IconSettings';
import { Button } from '@consta/uikit/Button';
import { cnTheme } from '@consta/uikit/Theme';
import { useBreakpoints } from '@consta/uikit/useBreakpoints';
import { useClickOutside } from '@consta/uikit/useClickOutside';
import { useFlag } from '@consta/uikit/useFlag';
import { useAtom } from '@reatom/npm-react';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'react-router5';

import { VariantsBoard } from '##/containers/VariantsBoard';
import { routesNames } from '##/modules/router';
import { variantThemeAtom } from '##/modules/theme';
import { cn } from '##/utils/bem';

import { useFullScreen, useIframeBridge, ZIndexContext } from './helpers';
import { VariantsResolutions } from './VariantsResolutions';
import { VariantsThemeToggler } from './VariantsThemeToggler';

const cnVariants = cn('Variants');

export const Variants: React.FC<{ stand: string; lib: string }> = ({
  stand,
  lib,
}) => {
  const router = useRouter();
  const [openBoard, setOpenBoard] = useFlag();
  const [openResolutionsMenu, setOpenResolutionsMenu] = useState<boolean>();
  const [openThemeMenu, setOpenThemeMenu] = useState<boolean>();
  const [resolution, setResolution] = useState<number>(0);
  const [fullScreen, setFullscreen] = useFullScreen();
  const { isDesctop } = useBreakpoints({ isDesctop: 900 });

  const [theme] = useAtom(variantThemeAtom);

  const ref = useIframeBridge();
  const refBoard = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLButtonElement>(null);

  const src = router.buildPath(routesNames.LIBS_VARIANTS, { stand, lib });

  useClickOutside({
    isActive: !isDesctop,
    ignoreClicksInsideRefs: [refBoard, settingsRef],
    handler: setOpenBoard.off,
  });

  useEffect(() => {
    !fullScreen && setResolution(0);
  }, [fullScreen]);

  return (
    <ZIndexContext.Provider value={fullScreen ? 101 : undefined}>
      <div className={cnVariants({ fullScreen })}>
        <div className={cnVariants('Body')}>
          {!isDesctop && (
            <Button
              view="clear"
              ref={settingsRef}
              className={cnVariants('Settings', { open: openBoard }, [
                cnTheme({ color: theme.color.primary }),
              ])}
              iconLeft={IconSettings}
              onClick={setOpenBoard.toggle}
              size="s"
            />
          )}
          <div className={cnVariants('Component')}>
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
            visible: openBoard || openResolutionsMenu || openThemeMenu,
            fullScreen,
          })}
        />
        <div
          ref={refBoard}
          className={cnVariants('BoardWrapper', { open: openBoard })}
        >
          <div className={cnVariants('BoardContainer', { open: openBoard })}>
            <div className={cnVariants('Controls')}>
              <div className={cnVariants('Block')}>
                <VariantsResolutions
                  onOpen={setOpenResolutionsMenu}
                  onSelect={setResolution}
                />
                <VariantsThemeToggler onOpen={setOpenThemeMenu} />
              </div>
              <Button
                size="xs"
                form="round"
                onlyIcon
                iconLeft={fullScreen ? IconCollapse : IconExpand}
                onClick={setFullscreen}
              />
            </div>
            <VariantsBoard
              className={cnVariants('Board', {
                open: openBoard,
              })}
            />
          </div>
        </div>
      </div>
      <div className={cnVariants('Fake', { fullScreen })} />
    </ZIndexContext.Provider>
  );
};
