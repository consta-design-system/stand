import React from 'react';
import { useRouter, useRoute } from 'react-router5'; 
import { routesNames } from '##/modules/router';
import { Tabs } from '@consta/uikit/TabsCanary';
import { useMemo } from 'react';
import { useEffect } from 'react';

type NavigationItem = {
    label: string;
    route: string;
}

const navigationList: NavigationItem[] = [
    {
        label: 'Обзор',
        route: routesNames.LIBS_LIB_STAND,
    },
    {
        label: 'Дизайнеру',
        route: routesNames.LIBS_LIB_STAND_DESIGN,
    },
    {
        label: 'Разработчику',
        route: routesNames.LIBS_LIB_STAND_DEV,
    },
    {
        label: 'Песочница',
        route: routesNames.LIBS_LIB_STAND_SANDBOX,
    },
]

type Props = {
    standId?: string;
    libId?: string;
    className?: string;
    onChange?: (type: string) => void;
}

export const StandPageNavigation = (props: Props) => {
    const { standId = '', libId = '', onChange, className } = props;
    const router = useRouter();
    const route = useRoute();
    const routeName = route.route.name;

    const value = useMemo(() => {
        return navigationList.filter((item) => {
            return item.route === routeName
        })[0];
    }, [route])
    
    useEffect(() => {
        onChange?.(value.route)
    }, [value])

    const handleClick = (item: NavigationItem) => {
        router.navigate(item.route, { libId, standId });
    }

    return (
        <Tabs 
            items={navigationList}
            onChange={({ value }) => handleClick(value)}
            size="m"
            className={className}
            value={value}
        />   
    )
}