import './StandPageVariats.css';

import { Button } from '@consta/uikit/Button';
import { IconCollapse } from '@consta/uikit/IconCollapse';
import { IconExpand } from '@consta/uikit/IconExpand';
import { IconSettings } from '@consta/uikit/IconSettings';
import { useBreakpoints } from '@consta/uikit/useBreakpoints';
import { useClickOutside } from '@consta/uikit/useClickOutside';
import { useFlag } from '@consta/uikit/useFlag';
import React, { useRef } from 'react';
import { useRouter } from 'react-router5';

import { ThemeToggler } from '##/containers/ThemeToggler';
import { VariantsBoard } from '##/containers/VariantsBoard';
import { routesNames } from '##/modules/router';
import { cn } from '##/utils/bem';

import { useFullScreen, useIframeBridge } from './helpers';

const cnStandPageVariats = cn('StandPageVariats');

export const StandPageVariats: React.FC<{ stand: string }> = ({ stand }) => {
  const router = useRouter();
  const [open, setOpen] = useFlag();
  const [fullScreen, setFullscreen] = useFullScreen();
  const { isDesctop } = useBreakpoints({ isDesctop: 900 });

  const ref = useIframeBridge();
  const refBoard = useRef<HTMLDivElement>(null);

  const src = router.buildPath(routesNames.LIBS_VARIANTS, { stand });

  useClickOutside({
    isActive: !isDesctop,
    ignoreClicksInsideRefs: [refBoard],
    handler: setOpen.off,
  });

  return (
    <div className={cnStandPageVariats({ fullScreen })}>
      <div className={cnStandPageVariats('Body')}>
        <div className={cnStandPageVariats('Header', { fullScreen })}>
          <Button
            view="clear"
            iconLeft={fullScreen ? IconCollapse : IconExpand}
            onClick={setFullscreen}
          />
          {fullScreen && <ThemeToggler />}
          {!isDesctop && (
            <Button view="clear" iconLeft={IconSettings} onClick={setOpen.on} />
          )}
        </div>
        <iframe
          className={cnStandPageVariats('Component', { fullScreen })}
          ref={ref}
          title="variants"
          src={src}
        />
      </div>
      {!isDesctop && (
        <div
          className={cnStandPageVariats('Overlay', {
            visible: open,
          })}
        />
      )}
      <div className={cnStandPageVariats('BoardWrapper', { open })}>
        <VariantsBoard
          ref={refBoard}
          className={cnStandPageVariats('Board', {
            open,
            fullScreen,
          })}
        />
      </div>
    </div>
  );
};
