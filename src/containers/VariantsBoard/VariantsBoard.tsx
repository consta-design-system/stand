import { useAtom } from '@reatom/react';
import React from 'react';

import { VariantsField } from '##/containers/VariantsField';
import { variantsNamesAtom } from '##/exportAtoms/variants';
import { cn } from '##/utils/bem';

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
