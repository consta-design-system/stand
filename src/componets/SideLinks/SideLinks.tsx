import React from 'react';
import { cn } from '##/utils/bem';
import { Button } from '@consta/uikit/Button';
import { IconForward } from '@consta/uikit/IconForward';
import { Tabs, RenderItemProps } from '@consta/uikit/TabsCanary';
import { activeItemAtom } from '##/modules/anchor';
import { useAtom } from '@reatom/react';
import { useMdxLink } from '@consta/stand/src/hooks/useMdxLink';
import { MenuItem } from '##/hooks/useMenu';
import { IconComponent } from '@consta/uikit/Icon';

import './SideLinks.css';

const cnSideLinks = cn('SideLinks');

type LinkItemProps = {
    href: string;
    className?: string;
    label?: string;
    target?: string;
    iconRight?: IconComponent;
}

const LinkItem = (props: LinkItemProps) => {
    const { href: hrefProp, label, className, target, iconRight } = props;

    const { href, onClick } = useMdxLink(hrefProp);

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
    )
}


export const SideLinks = (props: { menu: MenuItem[], links?: MenuItem[] }) => {
    const { menu, links } = props;
    const [activeItem] = useAtom(activeItemAtom)
   
    const renderItem = (props: RenderItemProps<MenuItem>) => {
        const { item: { href, label }, checked } = props;
        return (
            <LinkItem className={cnSideLinks('ListItem', { checked })} label={label} href={href} />
        )
    }

    return (
        <div className={cnSideLinks()}>
            {menu && menu.length > 0 && (
                <Tabs
                    linePosition="left"
                    className={cnSideLinks('List')}
                    items={menu}
                    size="s"
                    value={activeItem}
                    renderItem={renderItem}
                    onChange={() => {}}
                />
            )}
            {links && (
                <div className={cnSideLinks('Links')}>
                    {links?.map(({ label, href }) => (
                        <LinkItem
                          iconRight={IconForward}
                          key={cnSideLinks({ label })}
                          target="_blank"
                          label={label}
                          href={href} />

                        
                    ))}
                </div>
            )}
        </div>
    );
}