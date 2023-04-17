import { Dimension } from '##/modules/dimension';
import {
  Gap,
  getSpaceFromDimension,
  spaceSizeMMap,
} from '##/utils/typographySize';

export const createGapMap = (dimension: Dimension) => {
  const gapMap: Record<string, string> = {};
  Object.keys(spaceSizeMMap).forEach((key) => {
    const copyKey = key as Gap;
    gapMap[`--lazy-docs-gap-${copyKey}`] = `var(--space-${getSpaceFromDimension(
      copyKey,
      dimension,
    )})`;
  });
  return gapMap;
};
