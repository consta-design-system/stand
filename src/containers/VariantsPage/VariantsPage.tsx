import './VariantsPage.css';

import { useAtom } from '@reatom/npm-react';
import React from 'react';

import { LazyVariants } from '##/componets/LazyVariants';
import { PageDecorator } from '##/containers/PageDecorator';
import { standAtom } from '##/modules/stand';
import { cn } from '##/utils/bem';

const cnVariantsPage = cn('VariantsPage');

export const VariantsPage: React.FC = () => {
  const [stand] = useAtom(standAtom);

  if (stand?.path) {
    return (
      <PageDecorator>
        <div className={cnVariantsPage()}>
          <div className={cnVariantsPage('Bg', { type: 'color' })} />
          <div className={cnVariantsPage('Bg', { type: 'image' })} />
          <div className={cnVariantsPage('Component')}>
            <LazyVariants id={stand?.path} />
          </div>
        </div>
      </PageDecorator>
    );
  }

  return null;
};
