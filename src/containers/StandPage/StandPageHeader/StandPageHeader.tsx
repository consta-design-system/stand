import './StandPageHeader.css';

import { IconQuestion } from '@consta/icons/IconQuestion';
import { Badge } from '@consta/uikit/Badge';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { Text } from '@consta/uikit/Text';
import { useAtom } from '@reatom/npm-react';
import React from 'react';

import { gapAtomMapFabric, sizeAtomMapFabric } from '##/modules/adaptiveSize';
import { badgeStatusMap } from '##/modules/stand';
import { Stand } from '##/types';
import { cn } from '##/utils/bem';

import { StandPageHeaderInfo } from './StandPageHeaderInfo';

type Props = {
  stand: Stand;
  className?: string;
};

const cnStandPageHeader = cn('StandPageHeader');

export const getView = (status: Stand['status']) => {
  if (status === 'deprecated' || status === 'stable') {
    return 'stroked';
  }
  if (status === 'canary' || status === 'inWork') {
    return 'filled';
  }
};

export const StandPageHeader = (props: Props) => {
  const { stand, className } = props;
  const { title, status, version, description } = stand;

  const hasBadges = status || version;

  const [size2xl] = useAtom(sizeAtomMapFabric['2xl']);
  const [sizeM] = useAtom(sizeAtomMapFabric.m);
  const [gapXl] = useAtom(gapAtomMapFabric.xl);
  const [gapL] = useAtom(gapAtomMapFabric.l);

  return (
    <div className={cnStandPageHeader(null, [className])}>
      <StandPageHeaderInfo className={cnMixSpace({ mB: gapXl })} />
      <Text size={size2xl} lineHeight="m" weight="bold" view="primary">
        {title}
      </Text>
      <Text size={sizeM} lineHeight="m" view="primary">
        {description}
      </Text>
      {hasBadges && (
        <div
          className={cnStandPageHeader('Badges', [cnMixSpace({ mT: gapL })])}
        >
          {status && (
            <Badge
              label={status}
              icon={IconQuestion}
              status={badgeStatusMap[status]}
              size="s"
              form="round"
              view="filled"
            />
          )}
          {version && (
            <Badge
              label={`Доступен с ${version}`}
              status="system"
              icon={IconQuestion}
              size="s"
              form="round"
              view="filled"
            />
          )}
        </div>
      )}
    </div>
  );
};
