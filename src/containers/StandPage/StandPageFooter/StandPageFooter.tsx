import './StandPageFooter.css';

import { cnMixSpace } from '@consta/uikit/MixSpace';
import { Text } from '@consta/uikit/Text';
import React from 'react';

import { IconConsta } from '##/icons/IconConsta';
import { cn } from '##/utils/bem';

import { useFooter } from './helpers';

type Props = {
  className?: string;
};

const cnStandPageFooter = cn('StandPageFooter');

export const StandPageFooter = (props: Props) => {
  const { className } = props;
  const { docsUrl } = useFooter();

  return (
    <div
      className={cnStandPageFooter(null, [
        className,
        cnMixSpace({ pV: 's', pH: '2xl' }),
      ])}
    >
      <Text className={cnStandPageFooter('Label')} size="s" lineHeight="xs">
        <IconConsta size="s" /> Открытая дизайн-система
      </Text>
      {docsUrl && (
        <Text
          display="block"
          as="a"
          view="link"
          href={docsUrl}
          size="s"
          lineHeight="m"
        >
          Эта страница на GitHub
        </Text>
      )}
    </div>
  );
};
