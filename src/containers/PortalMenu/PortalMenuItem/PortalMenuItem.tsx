import './PortalMenuItem.css';

import { IconArrowDown } from '@consta/uikit/IconArrowDown';
import { Text } from '@consta/uikit/Text';
import { useFlag } from '@consta/uikit/useFlag';
import React, { useMemo } from 'react';

import { Link } from '##/componets/Link';
import { PortalMenuItemProps } from '##/containers/PortalMenu/types';
import { cn } from '##/utils/bem';

const cnPortalMenuItem = cn('PortalMenuItem');

export const PortalMenuItem = <ITEM,>(props: PortalMenuItemProps<ITEM>) => {
  const {
    item,
    onClick,
    className,
    getItemActive,
    getItemLabel,
    getItemDescription,
    getItemBadge,
    getItemSubMenu,
    getItemOnClick,
    getItemParams,
    getItemHref,
  } = props;

  const handleClick: React.MouseEventHandler = (e) => {
    if ((subMenu && getItemOnClick(item)) || !subMenu) {
      onClick?.(e);
      if (!getItemHref(item)) {
        getItemOnClick(item)?.(e);
      }
    } else {
      setShowSubMenu.toogle();
    }
  };

  const [showSubMenu, setShowSubMenu] = useFlag(true);

  const Component = getItemSubMenu(item) ? 'div' : 'button';

  const subMenu = useMemo(() => getItemSubMenu(item), [item, getItemSubMenu]);

  const toogle: React.MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSubMenu.toogle();
  };

  const content = () => (
    <>
      <div className={cnPortalMenuItem('Text')}>
        <Text
          className={cnPortalMenuItem('Label')}
          size="m"
          lineHeight="m"
          view={getItemActive(item) ? 'brand' : 'primary'}
        >
          {getItemLabel(item)}
        </Text>
        {getItemDescription(item) && (
          <Text
            className={cnPortalMenuItem('Description')}
            size="xs"
            lineHeight="m"
            view="secondary"
          >
            {getItemDescription(item)}
          </Text>
        )}
      </div>
      {(getItemBadge(item) || subMenu) && (
        <div className={cnPortalMenuItem('Controls')}>
          {getItemBadge(item)}
          {subMenu && (
            <button
              className={cnPortalMenuItem('MoreButton', { open: showSubMenu })}
              type="button"
              onClick={toogle}
            >
              <IconArrowDown size="s" view="primary" />
            </button>
          )}
        </div>
      )}
    </>
  );

  return (
    <div className={cnPortalMenuItem(null, [className])}>
      {getItemHref(item) ? (
        <Link
          className={cnPortalMenuItem('Button', {
            active: getItemActive(item),
          })}
          to={`${getItemHref(item)}`}
          params={getItemParams(item)}
          onClick={handleClick}
        >
          {content()}
        </Link>
      ) : (
        <Component
          className={cnPortalMenuItem('Button', {
            active: getItemActive(item),
          })}
          {...(Component === 'button' && { type: 'button' })}
          onClick={handleClick}
        >
          {content()}
        </Component>
      )}
    </div>
  );
};
