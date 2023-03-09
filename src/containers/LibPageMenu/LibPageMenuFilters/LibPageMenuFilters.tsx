import './LibPageMenuFilters.css';

import { Badge } from '@consta/uikit/Badge';
import { Switch } from '@consta/uikit/Switch';
import { useAtom, useUpdate } from '@reatom/npm-react';
import React, { useRef } from 'react';

import { filtersAtom, libPageMenuFiltersRefAtom } from '##/modules/standsMenu';
import { cn } from '##/utils/bem';

const cnLibPageMenuFilters = cn('LibPageMenuFilters');

const statusMap = {
  deprecated: 'error',
  inWork: 'warning',
  canary: 'normal',
} as const;

export const LibPageMenuFilters = () => {
  const [filters] = useAtom(filtersAtom);
  const ref = useRef<HTMLDivElement>(null);

  useUpdate(libPageMenuFiltersRefAtom, [ref]);

  if (!filters.length) {
    return null;
  }

  return (
    <div className={cnLibPageMenuFilters()} ref={ref}>
      <div className={cnLibPageMenuFilters('Overlay')}>
        {filters.map(({ label, status, value, onClick }) => {
          return (
            <div className={cnLibPageMenuFilters('Item')} key={label}>
              <Badge
                label={label}
                size="s"
                status={statusMap[status]}
                form="round"
              />
              <Switch
                checked={value}
                size="m"
                className={cnLibPageMenuFilters('Switch')}
                onChange={onClick}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
