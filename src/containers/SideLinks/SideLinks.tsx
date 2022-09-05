import './SideLinks.css';

import { A } from '@consta/stand/src/typography/A';
import { Button } from '@consta/uikit/Button';
import { IconComponent } from '@consta/uikit/Icon';
import { IconForward } from '@consta/uikit/IconForward';
import { Text } from '@consta/uikit/Text';
import { useAtom } from '@reatom/react';
import React, { useMemo } from 'react';
import { useRoute } from 'react-router5';

import { useStand } from '##/containers/StandPage/useStand';
import { useMdxLink } from '##/hooks/useMdxLink';
import { useMenu } from '##/hooks/useMenu';
import { menuMdxAtom } from '##/modules/menuMdx';
import { cn } from '##/utils/bem';

const cnSideLinks = cn('SideLinks');

type LinkItemProps = {
  href: string;
  className?: string;
  label?: string;
  target?: string;
  iconRight?: IconComponent;
};

const LinkItem = (props: LinkItemProps) => {
  const { href: hrefProp, label, className, target, iconRight } = props;

  const [href, onClick] = useMdxLink(hrefProp);

  return (
    <Button
      as="a"
      href={href}
      view="clear"
      size="s"
      target={target}
      iconRight={iconRight}
      onClick={onClick}
      className={className}
      label={label}
    />
  );
};

export const SideLinks = () => {
  const { links } = useMenu();
  const [menuMdx] = useAtom(menuMdxAtom);
  const stand = useStand();
  const { route } = useRoute();

  const hash = useMemo(() => {
    return `${route.params?.hash}`;
  }, [route.params]);

  const activeLinkStyle = `.stand--SideLinks-Menu a[href$="${encodeURI(
    hash,
  )}"] {
    color: var(--color-typo-brand);
  }`;

  return (
    <div className={cnSideLinks()}>
      <style>{activeLinkStyle}</style>
      <Text
        size="xs"
        lineHeight="s"
        view="ghost"
        transform="uppercase"
        weight="semibold"
        className={cnSideLinks('Header')}
      >
        Содержание
      </Text>
      <div className={cnSideLinks('Menu')}>
        {stand && (
          <A
            className={cnSideLinks('MenuItem')}
            href={`#${stand.stand.title.toLowerCase()}`}
          >
            {stand.stand.title}
          </A>
        )}
        {menuMdx}
      </div>
      {links && (
        <div className={cnSideLinks('Links')}>
          {links?.map(({ label, href }) => (
            <LinkItem
              iconRight={IconForward}
              key={cnSideLinks({ label })}
              target="_blank"
              label={label}
              href={href}
            />
          ))}
        </div>
      )}
    </div>
  );
};
