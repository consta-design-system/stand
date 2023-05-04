import { IconIpadFilled } from '@consta/icons/IconIpadFilled';
import { IconLaptopFilled } from '@consta/icons/IconLaptopFilled';
import { IconScreenFilled } from '@consta/icons/IconScreenFilled';
import { useComponentBreakpoints } from '@consta/uikit/useComponentBreakpoints';
import { useMemo } from 'react';

import IconSmartphone from '##/icons/Smartphone.icon.svg';

const transoformResolutionsForHook = (resolutions: number[]) => {
  const breakpoints: Record<number, number> = {};

  for (let index = 0; index < resolutions.length; index++) {
    const element = resolutions[index];
    breakpoints[element] = element + 280;
  }

  return breakpoints;
};

const resolutionsValues = [0, 320, 960, 1333];

const breakpointsForHook = transoformResolutionsForHook(resolutionsValues);

const resolutionsLabels: Record<number, string> = {
  0: 'Без ограничений',
  320: 'Телефон',
  960: 'Планшет',
  1333: 'Ноутбук',
};

export const useResolutions = (
  componentRef: React.RefObject<HTMLDivElement>,
) => {
  const breakpoints = useComponentBreakpoints(componentRef, breakpointsForHook);

  return useMemo(
    () => {
      const resolutions = resolutionsValues
        .map((item) => (breakpoints[item] ? item : 1))
        .filter((item) => item !== 1);

      return resolutions.length > 1 ? resolutions : [];
    },
    Object.keys(breakpoints).map(
      (key) => breakpoints[key as keyof typeof breakpoints],
    ),
  );
};

export const getResolutionIcon = (item: number) => {
  if (item === 0) return IconScreenFilled;
  if (item === 320) return IconSmartphone;
  if (item === 960) return IconIpadFilled;
  return IconLaptopFilled;
};

export const getItemLabel = (item: number) => resolutionsLabels[item];
export const getItemKey = (item: number) => item;
