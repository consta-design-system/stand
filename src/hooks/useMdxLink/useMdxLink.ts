import { useRouter, useRoute } from 'react-router5';
import { routesNames } from '##/modules/router';

type Result = {
    href: string;
    onClick?: React.MouseEventHandler
}

const buildNavigateParams = (href: string): [string, Record<string, string>] => {
    const decoded = decodeURI(href).toString().replace(/#*/g, '');
    const parts = decoded.split('|');
    let routeParams: Record<string, string> = {};
    let routeName = '';
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (i === 0) {
            routeName = part;
            continue;
        }
        if (part.includes(':')) {
            const [key, value] = part.split(':');
            routeParams[key] = value;
            continue;
        }
        routeParams.hash = part;
    }
    return [
        routeName,
        routeParams,
    ];
}

export const useMdxLink = (href: string): Result => {
    const router = useRouter();
    const route = useRoute();

    const handleClick = (e: React.MouseEvent, routeName: string, routeParams: Record<string, string>) => {
        e.stopPropagation();
        e.preventDefault();
        router.navigate(routeName, routeParams)
    }
    
    if (href[0] === '#' && href[1] === '#') {
        const [routeName, routeParams] = buildNavigateParams(href);
        const name = routesNames[routeName as keyof typeof routesNames];
        return {
            href: router.buildPath(name, routeParams),
            onClick: (e) => handleClick(e, name, routeParams),
        }
    }
    if(href[0] === '#') {
        const routeParams = { ...route.route.params, hash: decodeURI(href.replace(/#*/g, '')) };
        const routeName = route.route.name;
        return {
            href: decodeURI(router.buildPath(routeName, routeParams)),
            onClick: (e) => handleClick(e, routeName, routeParams),
        }
    }
    return {
        href,
    };
}