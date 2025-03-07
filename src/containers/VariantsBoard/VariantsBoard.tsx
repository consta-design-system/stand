import { cnMixScrollBar } from '@consta/uikit/MixScrollBar';
import { useAtom } from '@reatom/npm-react';
import React, { forwardRef } from 'react';

import { VariantsField } from '##/containers/VariantsField';
import { variantsNamesAtom } from '##/modules/variants';
import { cn } from '##/utils/bem';

const cnVariantsBoard = cn('VariantsBoard');

export const VariantsBoard = forwardRef(
  (
    props: React.HTMLAttributes<HTMLDivElement>,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const [variantsNames] = useAtom(variantsNamesAtom);

    return (
      <div
        {...props}
        ref={ref}
        className={cnVariantsBoard(null, [cnMixScrollBar(), props.className])}
      >
        {variantsNames.map((id) => {
          return <VariantsField key={id} id={id} />;
        })}
      </div>
    );
  },
);
