import './BannerButton.css';

import { PropsWithHTMLAttributes } from '@consta/header/__internal__/src/utils/types/PropsWithHTMLAttributes';
import { IconComponent } from '@consta/icons/Icon';
import { Text } from '@consta/uikit/Text';
import { useTheme } from '@consta/uikit/Theme';
import React, { forwardRef } from 'react';

import { cn } from '##/utils/bem';

const cnBannerButton = cn('BannerButton');

type BannerButtonProps = PropsWithHTMLAttributes<
  {
    label?: string;
    icon?: IconComponent;
    links?: Array<{ label: string; path: string }>;
  },
  HTMLDivElement
>;

export const BannerButton = forwardRef<HTMLDivElement, BannerButtonProps>(
  (props, ref) => {
    const { label, icon: Icon, links = [], className, ...otherProps } = props;

    const theme = useTheme();

    return (
      <div
        ref={ref}
        className={cnBannerButton(null, [
          className,
          theme.themeClassNames.color.accent,
        ])}
        {...otherProps}
      >
        <div className={cnBannerButton('Top')}>
          {Icon && <Icon view="primary" className={cnBannerButton('Icon')} />}
          <Text
            size="xs"
            lineHeight="m"
            weight="medium"
            className={cnBannerButton('Label')}
          >
            {label}
          </Text>
        </div>
        {links.length > 0 && (
          <div className={cnBannerButton('List')}>
            {links.map(({ label, path }, index) => (
              <Text
                as="a"
                size="xs"
                lineHeight="m"
                view="secondary"
                href={path}
                key={cnBannerButton('Item', { index })}
                className={cnBannerButton('Item')}
              >
                {label}
              </Text>
            ))}
          </div>
        )}
      </div>
    );
  },
);
