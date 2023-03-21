import { Button } from '@consta/uikit/Button';
import { IconSearch } from '@consta/uikit/IconSearch';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { useAction, useAtom } from '@reatom/npm-react';
import React, { memo } from 'react';

import {
  mobileSearchIsActiveAtom,
  mobileSearchToogleAction,
} from '##/modules/mobileSearch';

export const HeaderSearchToggler = memo(() => {
  const toggle = useAction(mobileSearchToogleAction);
  const [isActive] = useAtom(mobileSearchIsActiveAtom);

  return (
    <Button
      view={isActive ? 'primary' : 'ghost'}
      iconLeft={IconSearch}
      className={cnMixSpace({ mR: 'm' })}
      onClick={toggle}
      form="round"
      size="s"
    />
  );
});
