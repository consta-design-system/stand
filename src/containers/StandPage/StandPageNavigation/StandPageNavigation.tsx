import './StandPageNavigation.css';

import { IconForward } from '@consta/icons/IconForward';
import { IconGitHub } from '@consta/icons/IconGitHub';
import { IconKebab } from '@consta/icons/IconKebab';
import { Button } from '@consta/uikit/Button';
import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';
import { ContextMenu } from '@consta/uikit/ContextMenu';
import { useTheme } from '@consta/uikit/Theme';
import { useClickOutside } from '@consta/uikit/useClickOutside';
import { useComponentBreakpoints } from '@consta/uikit/useComponentBreakpoints';
import { useFlag } from '@consta/uikit/useFlag';
import { useAction, useAtom } from '@reatom/npm-react';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { navigateToAction, routerAtom } from 'reatom-router5';

import { useStand } from '##/containers/StandPage/helpers';
import IconFigma from '##/icons/Figma.icon.svg';
import { routesNames } from '##/modules/router';
import { componentRepositoryUrlAtom, figmaAtom } from '##/modules/stand';
import { cn } from '##/utils/bem';

import { NavigationItem, useNavigationList } from './helpers';

type Props = {
  className?: string;
};

const cnStandPageNavigation = cn('StandPageNavigation');

export const StandPageNavigation = ({ className }: Props) => {
  const navigateTo = useAction(navigateToAction);
  const [router] = useAtom(routerAtom);
  const stand = useStand();
  const navigationList = useNavigationList();
  const ref = useRef<HTMLDivElement>(null);
  const acnorContextMenu = useRef<HTMLButtonElement>(null);
  const { isDesktop } = useComponentBreakpoints(ref, { isDesktop: 768 });
  const { themeClassNames } = useTheme();
  const [contextMenuIsOpen, setContextMenuIsOpen] = useFlag();

  const value = useMemo(
    () =>
      navigationList.find((item) => {
        if (item.id) {
          return item.id === router.route?.params.tab;
        }
        return routesNames.LIBS_LIB_STAND === router.route?.name;
      }) as NavigationItem,
    [router],
  );

  const codesandbox = stand?.stand.sandbox;
  const [figma] = useAtom(figmaAtom);
  const [github] = useAtom(componentRepositoryUrlAtom);

  const hasLinks = codesandbox || figma || github;

  const handleClick = useCallback(({ value }: { value: NavigationItem }) => {
    if (value.id) {
      navigateTo({
        name: routesNames.LIBS_LIB_STAND_TAB,
        params: {
          stand: stand?.id,
          lib: stand?.lib.id,
          tab: value.id,
        },
      });
    } else {
      navigateTo({
        name: routesNames.LIBS_LIB_STAND,
        params: {
          stand: stand?.id,
          lib: stand?.lib.id,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (
      navigationList.length === 1 &&
      router.route?.name !== routesNames.LIBS_LIB_STAND
    ) {
      navigateTo({
        name: routesNames.LIBS_LIB_STAND,
        params: {
          stand: stand?.id,
          lib: stand?.lib.id,
        },
      });
    }
  }, [stand?.id]);

  useClickOutside({
    isActive: true,
    ignoreClicksInsideRefs: [acnorContextMenu],
    handler: setContextMenuIsOpen.off,
  });

  if (navigationList.length <= 1) {
    return null;
  }

  const items = [
    ...(figma
      ? [
          {
            label: 'Figma',
            href: figma,
            icon: IconFigma,
            onlyIcon: true,
          },
        ]
      : []),
    ...(github
      ? [
          {
            label: 'GitHub',
            href: github,
            icon: IconGitHub,
            onlyIcon: true,
          },
        ]
      : []),
    ...(codesandbox
      ? [
          {
            label: 'CodeSandbox',
            href: `https://codesandbox.io/embed/${stand?.stand.sandbox}`,
            icon: IconForward,
            onlyIcon: false,
          },
        ]
      : []),
  ];

  return (
    <>
      <div ref={ref} className={cnStandPageNavigation(null, [className])}>
        <div className={cnStandPageNavigation('Wrapper', { isDesktop })}>
          {hasLinks && !isDesktop && (
            <div
              className={cnStandPageNavigation('Links', [
                themeClassNames.color.invert,
              ])}
            >
              <Button
                ref={acnorContextMenu}
                form="round"
                size="s"
                onlyIcon
                onClick={setContextMenuIsOpen.on}
                iconLeft={IconKebab}
                iconSize="m"
              />
            </div>
          )}
          {hasLinks && isDesktop && (
            <div
              className={cnStandPageNavigation('Links', [
                themeClassNames.color.invert,
              ])}
            >
              {items.map(({ onlyIcon, href, icon, label }, index) => (
                <Button
                  key={index}
                  form="round"
                  size="s"
                  onlyIcon={onlyIcon}
                  as="a"
                  target="_blank"
                  href={href}
                  iconRight={icon}
                  iconSize="m"
                  label={label}
                />
              ))}
            </div>
          )}
          <div className={cnStandPageNavigation('Tabs')}>
            <ChoiceGroup
              size="s"
              items={navigationList}
              value={value}
              name="StandPageNavigation"
              onChange={handleClick}
            />
          </div>
        </div>
      </div>
      <ContextMenu
        className={cnStandPageNavigation('ContextMenu')}
        anchorRef={acnorContextMenu}
        isOpen={contextMenuIsOpen}
        isMobile
        direction="downStartLeft"
        spareDirection="downStartLeft"
        getItemAs={() => 'a'}
        getItemAttributes={({ href }) => ({ href, target: '_blank' })}
        items={items}
      />
    </>
  );
};
