import './StandPageNavigation.css';

import { IconForward } from '@consta/icons/IconForward';
import { IconGitHub } from '@consta/icons/IconGitHub';
import { Button } from '@consta/uikit/Button';
import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';
import { useTheme } from '@consta/uikit/Theme';
import { useAtom } from '@reatom/npm-react';
import React, { useEffect, useMemo } from 'react';
import { useRoute, useRouter } from 'react-router5';

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
  const router = useRouter();
  const route = useRoute();
  const stand = useStand();

  const navigationList = useNavigationList();

  const { themeClassNames } = useTheme();

  const value = useMemo(
    () =>
      navigationList.find((item) => {
        if (item.id) {
          return item.id === route.route.params.tab;
        }
        return routesNames.LIBS_LIB_STAND === route.route.name;
      }) as NavigationItem,
    [route],
  );

  const codesandbox = stand?.stand.sandbox;
  const figma = useAtom(figmaAtom)[0];
  const github = useAtom(componentRepositoryUrlAtom)[0];

  const hasLinks = codesandbox || figma || github;

  const handleClick = ({ value }: { value: NavigationItem }) => {
    if (value.id) {
      router.navigate(routesNames.LIBS_LIB_STAND_TAB, {
        stand: stand?.id,
        lib: stand?.lib.id,
        tab: value.id,
      });
    } else {
      router.navigate(routesNames.LIBS_LIB_STAND, {
        stand: stand?.id,
        lib: stand?.lib.id,
      });
    }
  };

  useEffect(() => {
    if (navigationList.length === 1) {
      handleClick({ value: navigationList[0] });
    }
  }, [stand?.id]);

  if (navigationList.length <= 1) {
    return null;
  }

  return (
    <div className={cnStandPageNavigation(null, [className])}>
      <ChoiceGroup
        size="s"
        items={navigationList}
        value={value}
        name="StandPageNavigation"
        onChange={handleClick}
      />
      {hasLinks && (
        <div
          className={cnStandPageNavigation('Links', [
            themeClassNames.color.accent,
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
