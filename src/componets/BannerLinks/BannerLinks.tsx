import './BannerLinks.css';

import { AnimateIconSwitcherProvider } from '@consta/icons/AnimateIconSwitcherProvider';
import { IconClose } from '@consta/icons/IconClose';
import { IconKebab } from '@consta/icons/IconKebab';
import { withAnimateSwitcherHOC } from '@consta/icons/withAnimateSwitcherHOC';
import { Button } from '@consta/uikit/Button';
import { cnMixPopoverAnimate } from '@consta/uikit/MixPopoverAnimate';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { Popover } from '@consta/uikit/Popover';
import { Switch } from '@consta/uikit/Switch';
import { Text } from '@consta/uikit/Text';
import { useTheme } from '@consta/uikit/Theme';
import { useClickOutside } from '@consta/uikit/useClickOutside';
import { useFlag } from '@consta/uikit/useFlag';
import { useAction, useAtom } from '@reatom/npm-react';
import React, { useRef } from 'react';
import { Transition } from 'react-transition-group';

import { BannerButton } from '##/componets/BannerButton';
import IconFeedback from '##/icons/Feedback.icon.svg';
import IconTelegram from '##/icons/Telegram.icon.svg';
import { isDarkThemeAtom, toggleThemeAction } from '##/modules/theme';
import { cn } from '##/utils/bem';

const cnBannerLinks = cn('BannerLinks');

type BannerLinksProps = {
  view?: 'list' | 'popover';
  mode?: 'sidebar' | 'header';
  className?: string;
};

const MoreSwitchIcon = withAnimateSwitcherHOC({
  startIcon: IconKebab,
  endIcon: IconClose,
});

export const BannerLinks = (props: BannerLinksProps) => {
  const { view = 'list', mode = 'sidebar', className } = props;
  const [isDarkTheme] = useAtom(isDarkThemeAtom);
  const toggleTheme = useAction(toggleThemeAction);
  const [isOpen, setIsOpen] = useFlag();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const standTheme = useTheme();

  useClickOutside({
    isActive: view === 'popover',
    ignoreClicksInsideRefs: [popoverRef, buttonRef],
    handler: setIsOpen.off,
  });

  const renderBanners = () => (
    <>
      <BannerButton
        icon={IconFeedback}
        label="Сообщить об ошибке"
        className={cnBannerLinks('Banner', [
          className,
          cnMixSpace({ mB: 'xs' }),
        ])}
        links={[
          {
            label: 'Форма на GitHub —>',
            path: 'https://github.com/consta-design-system/uikit/issues/new/choose',
          },
        ]}
      />
      <BannerButton
        icon={IconTelegram}
        label="Telegram"
        className={cnBannerLinks('Banner')}
        links={[
          {
            label: 'Чат сообщества —>',
            path: 'https://t.me/Consta_Chat',
          },
          {
            label: 'Канал с обновлениями —>',
            path: 'https://t.me/consta_ui_releases',
          },
        ]}
      />
    </>
  );

  return view === 'list' ? (
    renderBanners()
  ) : (
    <AnimateIconSwitcherProvider active={isOpen}>
      <Button
        size="s"
        view="ghost"
        ref={buttonRef}
        onClick={setIsOpen.toggle}
        form="round"
        className={cnBannerLinks('Button', [
          standTheme.themeClassNames.color.accent,
          className,
        ])}
        onlyIcon
        iconLeft={MoreSwitchIcon}
      />
      <Transition in={isOpen} unmountOnExit timeout={400}>
        {(animate) => (
          <Popover
            direction={mode === 'sidebar' ? 'upStartRight' : 'downStartRight'}
            offset="xs"
            ref={popoverRef}
            className={cnBannerLinks('Popover', [
              cnMixPopoverAnimate({
                animate,
                direction:
                  mode === 'sidebar' ? 'upStartRight' : 'downStartRight',
              }),
            ])}
            anchorRef={buttonRef}
          >
            {mode === 'header' && (
              <div
                className={cnBannerLinks('Toggler', [
                  standTheme.themeClassNames.color.accent,
                  cnMixSpace({ p: 's', mB: 'xs' }),
                ])}
              >
                <Switch size="m" checked={isDarkTheme} onChange={toggleTheme} />
                <Text size="xs" lineHeight="m" view="primary">
                  Тёмная тема
                </Text>
              </div>
            )}
            {renderBanners()}
          </Popover>
        )}
      </Transition>
    </AnimateIconSwitcherProvider>
  );
};
