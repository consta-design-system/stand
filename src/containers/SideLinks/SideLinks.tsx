import './SideLinks.css';

import { Button } from '@consta/uikit/Button';
import { IconForward } from '@consta/uikit/IconForward';
import { useAtom } from '@reatom/npm-react';
import React from 'react';

import { MdxMenuTransfer } from '##/containers/MdxMenuTransfer';
import {
  componentRepositoryUrlAtom,
  figmaAtom,
  issueRepositoryUrlAtom,
} from '##/modules/stand';
import { cn } from '##/utils/bem';

const cnSideLinks = cn('SideLinks');

type LinkItemProps = {
  href?: string;
  label: string;
};

const LinkItem = ({ href, label }: LinkItemProps) => {
  return (
    <Button
      as="a"
      href={href}
      view="ghost"
      size="s"
      target="_blank"
      iconRight={IconForward}
      label={label}
      width="full"
    />
  );
};

const Links = () => {
  const links: LinkItemProps[] = [
    {
      label: 'Открыть в Figma',
      href: useAtom(figmaAtom)[0],
    },
    {
      label: 'Открыть на GitHub',
      href: useAtom(componentRepositoryUrlAtom)[0],
    },
    {
      label: 'Сообщить о проблеме',
      href: useAtom(issueRepositoryUrlAtom)[0],
    },
  ].filter((item) => Boolean(item.href));

  return (
    <div className={cnSideLinks('Links')}>
      {links.map((props, index) => (
        <LinkItem key={cnSideLinks({ index })} {...props} />
      ))}
    </div>
  );
};

export const SideLinks = () => {
  return (
    <div className={cnSideLinks()}>
      <MdxMenuTransfer />
      <Links />
    </div>
  );
};
