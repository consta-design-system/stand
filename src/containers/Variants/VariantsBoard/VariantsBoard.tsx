import { useAtom } from '@reatom/react';
import React from 'react';

import { variantsNamesAtom } from '##/exportAtoms/variants';
import { cn } from '##/utils/bem';

import { VariantsField } from '../VariantsField';

const cnVariantsBoard = cn('VariantsBoard');

export const VariantsBoard = () => {
  const [variantsNames] = useAtom(variantsNamesAtom);

  return (
    <div className={cnVariantsBoard()}>
      {variantsNames.map((name) => {
        return <VariantsField key={name} name={name} />;
      })}
    </div>
  );
};
