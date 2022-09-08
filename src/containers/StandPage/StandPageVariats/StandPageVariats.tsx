import './StandPageVariats.css';

import React, { useRef } from 'react';
import { useRouter } from 'react-router5';

import { VariantsBoard } from '##/containers/VariantsBoard';
import { routesNames } from '##/modules/router';
import { cn } from '##/utils/bem';

import { useIframeBridge } from './helpers';

const cnStandPageVariats = cn('StandPageVariats');

export const StandPageVariats: React.FC<{ stand: string }> = ({ stand }) => {
  const router = useRouter();

  const ref = useRef<HTMLIFrameElement>(null);

  useIframeBridge(ref);

  const src = router.buildPath(routesNames.LIBS_VARIANTS, { stand });

  return (
    <div className={cnStandPageVariats()}>
      <VariantsBoard />
      <iframe
        ref={ref}
        className={cnStandPageVariats('Iframe')}
        title="variants"
        src={src}
      />
    </div>
  );
};
