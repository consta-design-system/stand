import { Space } from '@consta/uikit/MixSpace';
import { TextPropSize } from '@consta/uikit/Text';

import { Dimension } from '##/modules/dimension';

export type Gap =
  | 'm'
  | '3xs'
  | '2xs'
  | 'xs'
  | 's'
  | 'l'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl';

export const spaceSizeMMap: Record<Gap, Gap> = {
  '3xs': '3xs',
  '2xs': '2xs',
  'xs': 'xs',
  's': 's',
  'm': 'm',
  'l': 'l',
  'xl': 'xl',
  '2xl': '2xl',
  '3xl': '3xl',
  '4xl': '4xl',
  '5xl': '5xl',
  '6xl': '6xl',
};

export const textSizeMMap: Record<TextPropSize, TextPropSize> = {
  '2xs': '2xs',
  'xs': 'xs',
  's': 's',
  'm': 'm',
  'l': 'l',
  'xl': 'xl',
  '2xl': '2xl',
  '3xl': '3xl',
  '4xl': '4xl',
  '5xl': '5xl',
  '6xl': '6xl',
};

export const spaceSizeSMap: Record<Gap, Gap> = {
  '3xs': '3xs',
  '2xs': '3xs',
  'xs': '2xs',
  's': 'xs',
  'm': 's',
  'l': 'm',
  'xl': 'l',
  '2xl': 'xl',
  '3xl': '2xl',
  '4xl': '3xl',
  '5xl': '4xl',
  '6xl': '5xl',
};

export const textSizeSMap: Record<TextPropSize, TextPropSize> = {
  '2xs': '2xs',
  'xs': 'xs',
  's': 'xs',
  'm': 's',
  'l': 'm',
  'xl': 'l',
  '2xl': 'xl',
  '3xl': '2xl',
  '4xl': '3xl',
  '5xl': '4xl',
  '6xl': '5xl',
};

export const getSpaceFromDimension = (
  space: Space,
  dimension: Dimension,
): Space => {
  if (space === 'auto' || space === 0) {
    return space;
  }
  return (dimension === 'mobile' ? spaceSizeSMap : spaceSizeMMap)[space];
};

export const getSizeFromDimension = (
  size: TextPropSize,
  dimension: Dimension,
): TextPropSize => (dimension === 'mobile' ? textSizeSMap : textSizeMMap)[size];
