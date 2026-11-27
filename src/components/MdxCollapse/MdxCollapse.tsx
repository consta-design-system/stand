import './MdxCollapse.css';

import { Collapse } from '@consta/uikit/Collapse';
import { useFlag } from '@consta/uikit/useFlag';
import React from 'react';

import { cn } from '##/utils/bem';

type MdxCollapseProps = {
  children: React.ReactElement;
  initialOpen?: boolean;
  label: string;
};

const cnMdxCollapse = cn('MdxCollapse');

export const MdxCollapse = (props: MdxCollapseProps) => {
  const { children, initialOpen, label } = props;

  const [isOpen, setIsOpen] = useFlag(initialOpen);

  return (
    <Collapse
      isOpen={isOpen}
      size="m"
      className={cnMdxCollapse()}
      iconView="ghost"
      onClick={setIsOpen.toggle}
      label={label}
    >
      {children}
    </Collapse>
  );
};
