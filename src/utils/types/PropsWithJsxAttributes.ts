import {
  AsTagAttribute,
  AsTags,
} from '@consta/uikit/__internal__/src/utils/types/AsTags';

export type PropsWithJsxAttributes<Props, As extends AsTags = 'div'> = Omit<
  Props & Omit<AsTagAttribute<As>, keyof Props>,
  'css'
>;
