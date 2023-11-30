import './SearchLenght.css';

import { cnMixSpace } from '@consta/uikit/MixSpace';
import { Text } from '@consta/uikit/Text';
import { useAtom } from '@reatom/npm-react';
import React, { memo } from 'react';

import { searchListLengthAtom } from '##/modules/search';
import { cn } from '##/utils/bem';
import { declOfNum } from '##/utils/declOfNum';

const cnSearchLenght = cn('SearchLenght');

export const SearchLenght = memo(({ className }: { className?: string }) => {
  const [length] = useAtom(searchListLengthAtom);

  if (!length) {
    return null;
  }

  return (
    <Text
      className={cnSearchLenght(null, [
        cnMixSpace({ pH: 's', p: 'xs' }),
        className,
      ])}
      view="secondary"
      size="s"
      lineHeight="m"
    >
      {length} {declOfNum(length, ['результат', 'результата', 'результатов'])}
    </Text>
  );
});
