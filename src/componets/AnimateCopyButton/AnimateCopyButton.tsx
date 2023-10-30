import { AnimateIconSwitcherProvider } from '@consta/icons/AnimateIconSwitcherProvider';
import { IconAllDone } from '@consta/icons/IconAllDone';
import { IconCopy } from '@consta/icons/IconCopy';
import { withAnimateSwitcherHOC } from '@consta/icons/withAnimateSwitcherHOC';
import { PropsWithHTMLAttributes } from '@consta/uikit/__internal__/src/utils/types/PropsWithHTMLAttributes';
import { Button } from '@consta/uikit/Button';
import React, { forwardRef } from 'react';

import { cn } from '##/utils/bem';

const cnAnimateCopyButton = cn('AnimateCopyButton');

type Props = PropsWithHTMLAttributes<
  {
    copied?: boolean;
  },
  HTMLButtonElement
>;

const CopyIcon = withAnimateSwitcherHOC({
  startIcon: IconCopy,
  endIcon: IconAllDone,
});

export const AnimateCopyButton = forwardRef<HTMLButtonElement, Props>(
  (props, ref) => {
    const { copied, className, children, ...otherProps } = props;

    return (
      <AnimateIconSwitcherProvider active={copied}>
        <Button
          size="xs"
          view="ghost"
          title="Копировать"
          ref={ref}
          className={cnAnimateCopyButton(null, [className])}
          iconLeft={CopyIcon}
          {...otherProps}
        />
      </AnimateIconSwitcherProvider>
    );
  },
);
