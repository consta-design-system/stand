import './SideLinks.css';

import { IconArrowLeft } from '@consta/icons/IconArrowLeft';
import { IconArrowRight } from '@consta/icons/IconArrowRight';
import { Button } from '@consta/uikit/Button';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { useAction, useAtom } from '@reatom/npm-react';
import React, { memo } from 'react';
import { Transition } from 'react-transition-group';

import { BannerButton } from '##/componets/BannerButton';
import { MdxMenuTransfer } from '##/containers/MdxMenuTransfer';
import { ThemeToggler } from '##/containers/ThemeToggler';
import IconFeedback from '##/icons/Feedback.icon.svg';
import IconTelegram from '##/icons/Telegram.icon.svg';
import { breakpointsAtom } from '##/modules/breakpoints';
import { openRightSideAtom } from '##/modules/layout';
import { cn } from '##/utils/bem';

const cnSideLinks = cn('SideLinks');

const timeout = 400;

export const SideLinks = memo(() => {
  const toggleRightSide = useAction(openRightSideAtom.toggle);
  const [breakpoints] = useAtom(breakpointsAtom);
  const [openRightSide] = useAtom(openRightSideAtom);
  const isOpen = openRightSide || breakpoints.l;
  const withOpenButton = !breakpoints.l;

  return (
    <div className={cnSideLinks(null)}>
      <Transition in={isOpen} unmountOnExit timeout={timeout}>
        {(animate) => {
          return (
            <div
              className={cnSideLinks(
                'Slot',
                { animate, size: 'm', withOpenButton },
                [cnMixSpace({ pV: 'xl', pH: 'm' })],
              )}
            >
              <div className={cnSideLinks('BannerButtons')}>
                <BannerButton
                  className={cnMixSpace({ mB: 'xs' })}
                  as="a"
                  label="Сообщить о проблеме"
                  href="https://github.com/consta-design-system/uikit/issues/new/choose"
                  target="_blank"
                  icon={IconFeedback}
                  description="Исправим ошибку, которую вы найдёте"
                />
                <BannerButton
                  as="a"
                  label="Telegram"
                  icon={IconTelegram}
                  href="https://t.me/Consta_Chat"
                  target="_blank"
                />
              </div>
              <MdxMenuTransfer className={cnSideLinks('Menu')} />
              <div className={cnSideLinks('ControlsWrap')}>
                <div className={cnSideLinks('Controls')}>
                  <ThemeToggler />
                  {withOpenButton && (
                    <Button
                      size="s"
                      view="ghost"
                      onlyIcon
                      iconLeft={IconArrowRight}
                      onClick={toggleRightSide}
                      form="round"
                    />
                  )}
                </div>
              </div>
            </div>
          );
        }}
      </Transition>
      <Transition in={!isOpen} unmountOnExit timeout={timeout}>
        {(animate) => {
          return (
            <div
              className={cnSideLinks(
                'Slot',
                { animate, size: 's', withOpenButton },
                [cnMixSpace({ pV: 'xl', pH: 's' })],
              )}
            >
              <div className={cnSideLinks('BannerButtons')}>
                <BannerButton
                  className={cnMixSpace({ mB: 'xs' })}
                  as="a"
                  label="Сообщить о проблеме"
                  href="https://github.com/consta-design-system/uikit/issues/new/choose"
                  target="_blank"
                  icon={IconFeedback}
                  description="Исправим ошибку, которую вы найдёте"
                  onlyIcon
                />
                <BannerButton
                  as="a"
                  label="Telegram"
                  icon={IconTelegram}
                  href="https://t.me/Consta_Chat"
                  target="_blank"
                  onlyIcon
                />
              </div>
              <div className={cnSideLinks('ControlsWrap')}>
                <div className={cnSideLinks('Controls')}>
                  {withOpenButton && (
                    <Button
                      size="s"
                      view="ghost"
                      onlyIcon
                      iconLeft={IconArrowLeft}
                      onClick={toggleRightSide}
                      form="round"
                    />
                  )}
                  <ThemeToggler />
                </div>
              </div>
            </div>
          );
        }}
      </Transition>
    </div>
  );
});
