import './MdxCode.css';

import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { useFlag } from '@consta/uikit/useFlag';
import React, { useMemo, useState } from 'react';

import { cn } from '##/utils/bem';

import { AnimateCopyButton } from '../AnimateCopyButton';
import { MdxCodeContext } from './context';

const cnMdxCode = cn('MdxCode');

export const MdxCode: React.FC<{
  children: React.ReactElement;
  labels?: string[];
}> = ({ children, labels }) => {
  const [tab, setTab] = useState<string>(labels?.[0] ?? 'TSX');
  const [copied, setCopied] = useFlag();

  const [items, contentMap] = useMemo(() => {
    const items: string[] = [];
    const contentMap: Record<string, string> = {};
    if (Array.isArray(children)) {
      children.forEach((el, i) => {
        const key =
          labels?.[i] ??
          el?.props?.children?.props?.className
            ?.split('language-')[1]
            ?.toUpperCase();
        items.push(key);
        contentMap[key] =
          el?.props?.children?.props?.children?.toString() ?? '';
      });
    }
    return [items, contentMap];
  }, [labels, children]);

  const content = useMemo(() => {
    if (Array.isArray(children)) {
      return children?.[items.indexOf(tab)];
    }
    return null;
  }, [tab, items]);

  const handleClick = () => {
    if (tab && contentMap[tab]) {
      navigator.clipboard.writeText(contentMap[tab]);
    }
    setCopied.on();
    setTimeout(setCopied.off, 2000);
  };

  if (!Array.isArray(children)) {
    return children;
  }

  return (
    <MdxCodeContext.Provider value>
      <div className={cnMdxCode()}>
        <div className={cnMdxCode('Header', [cnMixSpace({ p: 's' })])}>
          <ChoiceGroup
            size="xs"
            name="file"
            view="ghost"
            items={items}
            onChange={({ value }) => setTab(value)}
            value={tab}
            getItemLabel={(item) => item}
          />
          <AnimateCopyButton copied={copied} onClick={handleClick} />
        </div>
        {content}
      </div>
    </MdxCodeContext.Provider>
  );
};
