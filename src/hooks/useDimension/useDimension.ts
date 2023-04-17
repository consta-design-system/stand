import { useAction } from '@reatom/npm-react';
import { useEffect } from 'react';

import { Dimension, dimensionAtom, getDimension } from '##/modules/dimension';

export const useDimension = () => {
  const setDimension = useAction((ctx, value: Dimension) =>
    dimensionAtom(ctx, value),
  );

  const detectDimension = () => {
    setDimension(getDimension());
  };
  useEffect(() => {
    window.addEventListener('resize', detectDimension);
    return () => window.removeEventListener('resize', detectDimension);
  }, []);
};
