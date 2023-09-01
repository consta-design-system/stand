import { classnames } from '@bem-react/classnames';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import React from 'react';

import { Image } from '##/componets/Image';

export const MdxImage: typeof Image = (props = {}) => {
  return (
    <Image
      {...props}
      className={classnames(cnMixSpace({ mB: 'm', mT: 's' }), props.className)}
    />
  );
};
