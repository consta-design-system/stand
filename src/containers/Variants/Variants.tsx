import { useAtom } from '@reatom/react';
import React, { Fragment } from 'react';

import { LazyVariants } from '##/componets/LazyVariants';
import { libAtom } from '##/modules/lib';
import { standAtom } from '##/modules/stand';
import { themeAtom } from '##/modules/theme';

import { VariantsBoard } from './VariantsBoard';

export const Variants: React.FC = () => {
  const [stand] = useAtom(standAtom);
  const [lib] = useAtom(libAtom);
  const [theme] = useAtom(themeAtom);

  const Decorator = lib?.standPageDecoration || Fragment;

  if (stand?.path) {
    return (
      <div>
        <Decorator theme={theme}>
          <LazyVariants id={stand?.path} />
        </Decorator>
        <VariantsBoard />
      </div>
    );
  }

  return null;
};
