import { useBreakpoints } from '@consta/uikit/useBreakpoints';
import { useMemo } from 'react';

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

export const resolutionsLabels: Record<number, string> = {
  0: 'Без ограничений',
  320: 'Телефон',
  960: 'Планшет',
  1333: 'Ноутбук',
};

export const useResolutions = () => {
  const breakpoints = useBreakpoints(breakpointsForHook);

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
