import { Button } from '@consta/uikit/Button';
import React from 'react';

export const ListCardButtonMore = ({
  visible,
  onClick,
}: {
  visible?: boolean;
  onClick?: () => void;
}) => {
  if (visible) {
    return (
      <Button
        onClick={onClick}
        label="Показать ещё"
        width="full"
        view="ghost"
      />
    );
  }

  return null;
};
