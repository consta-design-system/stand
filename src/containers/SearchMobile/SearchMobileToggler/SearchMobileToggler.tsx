import { IconSearchStroked } from '@consta/icons/IconSearchStroked';
import { Button } from '@consta/uikit/Button';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { useAction, useAtom } from '@reatom/react';
import React, { memo } from 'react';

import {
  mobileSearchIsActiveAtom,
  mobileSearchToggleAction,
} from '##/modules/mobileSearch';

export const HeaderSearchToggler = memo(() => {
  const toggle = useAction(mobileSearchToggleAction);
  const [isActive] = useAtom(mobileSearchIsActiveAtom);

  return (
    <Button
      view={isActive ? 'primary' : 'ghost'}
      iconLeft={IconSearchStroked}
      className={cnMixSpace({ mR: 'm' })}
      onClick={toggle}
      form="round"
      size="s"
    />
  );
});
