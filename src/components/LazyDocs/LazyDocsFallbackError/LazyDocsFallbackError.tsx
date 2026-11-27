import './LazyDocsFallbackError.css';

import { cnMixSpace } from '@consta/uikit/MixSpace';
import { Text } from '@consta/uikit/Text';
import React from 'react';

import { cn } from '##/utils/bem';

const cnLazyDocsFallbackError = cn('LazyDocsFallbackError');

export const LazyDocsFallbackError: React.FC<{
  image: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}> = ({ image: Image, title, description }) => (
  <div className={cnLazyDocsFallbackError()}>
    <Image
      className={cnLazyDocsFallbackError('Image', [cnMixSpace({ mB: 'xl' })])}
    />
    <Text
      className={cnMixSpace({ mB: 'xs' })}
      align="center"
      size="xl"
      weight="semibold"
      view="primary"
      lineHeight="m"
    >
      {title}
    </Text>
    <Text
      className={cnMixSpace({ mB: '4xl' })}
      align="center"
      view="primary"
      size="m"
      lineHeight="m"
    >
      {description}
    </Text>
  </div>
);
