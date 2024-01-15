import './MdxCode.css';

import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';
import { cnMixScrollBar } from '@consta/uikit/MixScrollBar';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import React, { useMemo, useState } from 'react';

import { cn } from '##/utils/bem';

const cnMdxCode = cn('MdxCode');

const noKeyLabel = 'demo';

const getContent = (
  children: React.ReactElement,
  tabs: string[],
  tab: string,
) => {
  if (Array.isArray(children)) {
    return children?.[tabs.indexOf(tab)];
  }
  return null;
};

const getItemLabel = (item: string) => item;

export const MdxCode: React.FC<{
  children: React.ReactElement;
  labels?: string[];
}> = ({ children, labels }) => {
  const [tabs] = useMemo(() => {
    const items: string[] = [];

    if (Array.isArray(children)) {
      children.forEach((el, i) => {
        const key =
          labels?.[i] ||
          el?.props?.children?.props?.className
            ?.split('language-')[1]
            ?.toLowerCase() ||
          noKeyLabel;

        items.push(key);
      });
    }
    return [items];
  }, [labels, children]);

  const [tab, setTab] = useState<string>(tabs[0]);

  if (!Array.isArray(children)) {
    return children;
  }

  return (
    <div className={cnMdxCode()}>
      <div
        className={cnMdxCode('Header', [
          cnMixSpace({ p: 's' }),
          cnMixScrollBar({ invisible: true }),
        ])}
      >
        <ChoiceGroup
          size="xs"
          name="file"
          view="ghost"
          items={tabs}
          onChange={setTab}
          value={tab}
          getItemLabel={getItemLabel}
        />
      </div>
      {getContent(children, tabs, tab)}
    </div>
  );
};
