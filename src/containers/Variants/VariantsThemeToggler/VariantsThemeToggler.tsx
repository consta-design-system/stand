import './VariantsThemeToggler.css';

import { IconCheck } from '@consta/icons/IconCheck';
import { Button } from '@consta/uikit/Button';
import { ContextMenu } from '@consta/uikit/ContextMenu';
import { ThemePreset } from '@consta/uikit/Theme';
import { useFlag } from '@consta/uikit/useFlag';
import { useAction, useAtom } from '@reatom/npm-react';
import React, { useEffect, useRef } from 'react';

import {
  getThemeIcon,
  getThemeKey,
  getThemeLabel,
  variantThemeAtom,
  variantThemes,
} from '##/modules/theme';
import { cn } from '##/utils/bem';

const cnVariantsThemeToggler = cn('VariantsThemeToggler');

export const VariantsThemeToggler: React.FC<{
  onOpen: (open: boolean) => void;
}> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useFlag();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const [theme] = useAtom(variantThemeAtom);

  const setTheme = useAction((ctx, value: ThemePreset) => {
    variantThemeAtom(ctx, value);
  });

  const handleSelect = ({ item }: { item: ThemePreset }) => {
    setIsOpen.off();
    setTheme(item);
  };

  useEffect(() => {
    onOpen(isOpen);
  }, [isOpen]);

  return (
    <>
      <Button
        view="ghost"
        form="round"
        onClick={setIsOpen.toggle}
        ref={buttonRef}
        iconLeft={getThemeIcon(theme)}
        size="xs"
      />
      <ContextMenu
        items={variantThemes}
        anchorRef={buttonRef}
        size="s"
        className={cnVariantsThemeToggler('Menu')}
        getItemRightIcon={(item) => {
          return item.color.primary === theme.color.primary
            ? IconCheck
            : undefined;
        }}
        getItemLabel={getThemeLabel}
        getItemKey={getThemeKey}
        getItemLeftIcon={getThemeIcon}
        isOpen={isOpen}
        direction="downStartRight"
        onClickOutside={setIsOpen.off}
        onItemClick={handleSelect}
      />
    </>
  );
};
