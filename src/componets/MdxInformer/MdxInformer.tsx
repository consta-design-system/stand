import { classnames } from '@bem-react/classnames';
import { Informer, InformerPropStatus } from '@consta/uikit/Informer';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import React from 'react';

type MdxInformerProps = {
  status?: InformerPropStatus;
  label?: React.ReactNode;
  title?: string;
};

export const MdxInformer = (props = {}) => {
  return (
    <Informer
      {...props}
      className={classnames(cnMixSpace({ mB: 'l' }), props.className)}
    />
  );
};
