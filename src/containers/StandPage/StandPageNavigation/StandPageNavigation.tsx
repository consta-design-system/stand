import './StandPageNavigation.css';

import { IconForward } from '@consta/icons/IconForward';
import { IconGitHub } from '@consta/icons/IconGitHub';
import { Button } from '@consta/uikit/Button';
import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';
import { useTheme } from '@consta/uikit/Theme';
import { useAction, useAtom } from '@reatom/npm-react';
import React, { useCallback, useEffect, useMemo } from 'react';
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

  const { themeClassNames } = useTheme();

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
  const figma = useAtom(figmaAtom)[0];
  const github = useAtom(componentRepositoryUrlAtom)[0];

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

  if (navigationList.length <= 1) {
    return null;
  }

  return (
    <div className={cnStandPageNavigation(null, [className])}>
      <div className={cnStandPageNavigation('Tabs')}>
        <ChoiceGroup
          size="s"
          items={navigationList}
          value={value}
          name="StandPageNavigation"
          onChange={handleClick}
        />
      </div>
      {hasLinks && (
        <div
          className={cnStandPageNavigation('Links', [
            themeClassNames.color.invert,
          ])}
        >
          {figma && (
            <Button
              form="round"
              size="s"
              onlyIcon
              as="a"
              target="_blank"
              href={figma}
              iconLeft={IconFigma}
              iconSize="m"
            />
          )}
          {github && (
            <Button
              form="round"
              size="s"
              onlyIcon
              as="a"
              target="_blank"
              href={github}
              iconLeft={IconGitHub}
              iconSize="m"
            />
          )}
          {codesandbox && (
            <Button
              form="round"
              size="s"
              as="a"
              target="_blank"
              label="CodeSandbox"
              href={`https://codesandbox.io/embed/${stand?.stand.sandbox}`}
              iconRight={IconForward}
            />
          )}
        </div>
      )}
    </div>
  );
};
