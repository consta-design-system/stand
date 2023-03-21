import './SearchListItem.css';

import {
  IconComponent as IconComponentType,
  IconPropView,
} from '@consta/uikit/Icon';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { Text } from '@consta/uikit/Text';
import React from 'react';

import IconArtical from '##/icons/Artical.icon.svg';
import IconComponent from '##/icons/Component.icon.svg';
import IconRecent from '##/icons/Recent.icon.svg';
import { PreparedStand } from '##/types';
import { cn } from '##/utils/bem';

const cnSearchListItem = cn('SearchListItem');

type SearchListItemProps = {
  label: string;
  type: 'doc' | 'component' | 'history';
  status?: PreparedStand['stand']['status'];
  description?: PreparedStand['stand']['description'];
  href?: string;
  onClick?: React.MouseEventHandler;
};

const mapIcon: Record<'doc' | 'component' | 'history', IconComponentType> = {
  doc: IconArtical,
  component: IconComponent,
  history: IconRecent,
};

const mapIconView: Record<
  Exclude<PreparedStand['stand']['status'], undefined>,
  IconPropView
> = {
  deprecated: 'alert',
  inWork: 'warning',
  canary: 'brand',
  stable: 'ghost',
};

export const SearchListItem = (props: SearchListItemProps) => {
  const { label, type, href, onClick, status = 'stable', description } = props;

  const Icon = mapIcon[type];
  const Tag = href ? 'a' : 'div';

  return (
    <Tag
      href={href}
      onClick={onClick}
      className={cnSearchListItem({ bordered: type === 'history' }, [
        type === 'history' ? cnMixSpace({ mL: 'm' }) : undefined,
        type !== 'history' ? cnMixSpace({ mR: 'm' }) : undefined,
      ])}
    >
      {type !== 'history' && (
        <div
          className={cnSearchListItem('Slot', { left: true }, [
            cnMixSpace({ p: 'm' }),
          ])}
        >
          <Icon view={mapIconView[status]} />
        </div>
      )}
      <div
        className={cnSearchListItem(
          'Slot',
          { center: true, bordered: type !== 'history' },
          [type !== 'history' ? cnMixSpace({ pL: '2xs' }) : undefined],
        )}
      >
        {type !== 'history' && label && (
          <Text weight="semibold" size="s" truncate>
            {label}
          </Text>
        )}
        {type !== 'history' && description && (
          <Text size="s" truncate view="secondary">
            {description}
          </Text>
        )}
        {type === 'history' && label && (
          <Text size="s" truncate view="secondary">
            {label}
          </Text>
        )}
      </div>
      {type === 'history' && (
        <div
          className={cnSearchListItem('Slot', { right: true }, [
            cnMixSpace({ pH: 'm', pV: 'xs' }),
          ])}
        >
          <Icon view="ghost" />
        </div>
      )}
    </Tag>
  );
};
