import { classnames } from '@bem-react/classnames';
import { IconInfo } from '@consta/icons/IconInfo';
import { PropsWithHTMLAttributes } from '@consta/uikit/__internal__/src/utils/types/PropsWithHTMLAttributes';
import { Informer, InformerPropStatus } from '@consta/uikit/Informer';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import React from 'react';

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

export const MdxInformer: React.FC<MdxInformerProps> = (props) => {
  const { className, status = 'normal', title, ...otherProps } = props;
  return (
    <Informer
      {...otherProps}
      view="outline"
      size="m"
      icon={IconInfo}
      status={status}
      title={title || titleMap[status]}
      className={classnames(cnMixSpace({ mB: 'l' }), className)}
    />
  );
};
