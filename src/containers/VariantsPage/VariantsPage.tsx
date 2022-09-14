import './VariantsPage.css';

import { useAtom } from '@reatom/react';
import React, { Fragment } from 'react';

import { LazyVariants } from '##/componets/LazyVariants';
import { libAtom } from '##/modules/lib';
import { standAtom } from '##/modules/stand';
import { themeAtom } from '##/modules/theme';
import { cn } from '##/utils/bem';

const cnVariantsPage = cn('VariantsPage');

export const VariantsPage: React.FC = () => {
  const [stand] = useAtom(standAtom);
  const [lib] = useAtom(libAtom);
  const [theme] = useAtom(themeAtom);

  const Decorator = lib?.standPageDecoration || Fragment;

  if (stand?.path) {
    return (
      <Decorator theme={theme}>
        <div className={cnVariantsPage()}>
          <div className={cnVariantsPage('Bg')} />
          <div className={cnVariantsPage('Component')}>
            <LazyVariants id={stand?.path} />
          </div>
        </div>
      </Decorator>
    );
  }

  return null;
};
