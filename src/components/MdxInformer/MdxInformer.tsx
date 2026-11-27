import { IconInfo } from '@consta/icons/IconInfo';
import { PropsWithHTMLAttributes } from '@consta/uikit/__internal__/src/utils/types/PropsWithHTMLAttributes';
import { Informer, InformerPropStatus } from '@consta/uikit/Informer';
import React from 'react';

import { cn } from '##/utils/bem';

type MdxInformerProps = PropsWithHTMLAttributes<
  {
    status?: InformerPropStatus;
    label?: React.ReactNode;
    title?: string;
  },
  HTMLDivElement
>;

const titleMap: Record<InformerPropStatus, string | undefined> = {
  alert: 'Внимание',
  normal: 'Примечание',
  success: 'Совет',
  warning: 'Предупреждение',
  system: undefined,
};

const cnMdxInformer = cn('MdxInformer');

export const MdxInformer: React.FC<MdxInformerProps> = (props) => {
  const { className, status = 'normal', title, ...otherProps } = props;
  return (
    <Informer
      {...otherProps}
      className={cnMdxInformer(null, [className])}
      view="outline"
      size="m"
      icon={IconInfo}
      status={status}
      title={title || titleMap[status]}
    />
  );
};
