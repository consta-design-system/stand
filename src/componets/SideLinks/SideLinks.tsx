import React from 'react';
import { cn } from '##/utils/bem';
import { SideLinksProps } from './types';
import { Button } from '@consta/uikit/Button';
import { IconForward } from '@consta/uikit/IconForward';
import { Tabs } from '@consta/uikit/TabsCanary';
import './SideLinks.css';

const cnSideLinks = cn('SideLinks');

export const SideLinks = <ITEM,>(props: SideLinksProps<ITEM>) => {
    const { items, links } = props;


    return (
        <div className={cnSideLinks()}>
            {items && (
                <Tabs
                    linePosition="left"
                    className={cnSideLinks('List')}
                    items={items}
                    size="s"
                    onChange={() => {}}
                />
            )}
            {links && (
                <div className={cnSideLinks('Links')}>
                    {links?.map(({ label, href }) => (
                        <Button 
                            as="a"
                            href={href}
                            view="clear"
                            size="s"
                            target="_blank"
                            label={label}
                            iconRight={IconForward}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}