import './LibPageMenuFilters.css';

import { Badge } from '@consta/uikit/Badge';
import { Switch } from '@consta/uikit/Switch';
import { useAtom } from '@reatom/npm-react';
import React from 'react';

import { filtersAtom } from '##/modules/standsMenu';
import { cn } from '##/utils/bem';

const cnLibPageMenuFilters = cn('LibPageMenuFilters');

const statusMap = {
  deprecated: 'error',
  inWork: 'warning',
  canary: 'success',
} as const;

export const LibPageMenuFilters = () => {
  const [filters] = useAtom(filtersAtom);

  return (
    <div className={cnLibPageMenuFilters()}>
      <div className={cnLibPageMenuFilters('Overlay')}>
        {filters.map(({ label, status, value, onClick }) => {
          return (
            <div className={cnLibPageMenuFilters('Item')} key={label}>
              <Badge
                label={label}
                view="stroked"
                size="s"
                status={statusMap[status]}
              />
              <Switch
                checked={value}
                size="m"
                className={cnLibPageMenuFilters('Switch')}
                onChange={onClick}
                label="Показывать"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
