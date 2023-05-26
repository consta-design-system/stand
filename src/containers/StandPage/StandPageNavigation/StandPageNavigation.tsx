import './StandPageNavigation.css';

import { IconComponent } from '@consta/icons/Icon';
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

type LinkItem = {
  label: string;
  href: string;
  icon: IconComponent;
  onlyIcon: boolean;
  iconSize: 'm' | 'xs';
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

  const codesandboxUrl = stand?.stand.sandbox;
  const [figmaUrl] = useAtom(figmaAtom);
  const [githubUrl] = useAtom(componentRepositoryUrlAtom);

  const hasLinks = codesandboxUrl || figmaUrl || githubUrl;

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

  const figmaItem: LinkItem | undefined = figmaUrl
    ? {
        label: 'figmaUrl',
        href: figmaUrl,
        icon: IconFigma,
        onlyIcon: true,
        iconSize: 'm',
      }
    : undefined;

  const gitHubItem: LinkItem | undefined = githubUrl
    ? {
        label: 'githubUrl',
        href: githubUrl,
        icon: IconGitHub,
        onlyIcon: true,
        iconSize: 'm',
      }
    : undefined;

  const codesandboxItem: LinkItem | undefined = figmaUrl
    ? {
        label: 'codesandboxUrl',
        href: `https://codesandboxUrl.io/embed/${stand?.stand.sandbox}`,
        icon: IconForward,
        onlyIcon: false,
        iconSize: 'xs',
      }
    : undefined;

  const items = [figmaItem, gitHubItem, codesandboxItem].filter((item) =>
    Boolean(item),
  ) as LinkItem[];

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
              {items.map(({ onlyIcon, href, icon, label, iconSize }, index) => (
                <Button
                  key={index}
                  form="round"
                  size="s"
                  onlyIcon={onlyIcon}
                  as="a"
                  target="_blank"
                  href={href}
                  iconRight={icon}
                  iconSize={iconSize}
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
