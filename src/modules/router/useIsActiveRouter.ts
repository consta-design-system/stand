import { useCallback } from "react";
import { useRoute, useRouter } from 'react-router5';
import { startsWithSegment } from 'router5-helpers';

export const useIsActiveRouter = () => {
    const router = useRouter();
    const route = useRoute();
    const routeName = route.route?.name;

    const testStartsWithSegment = startsWithSegment(routeName);

    const getIsActive = useCallback((path: string, params?: Record<string, string>, strictEquality?: boolean, ignoreQueryParams?: boolean) => {
        if (testStartsWithSegment(path)) {
            return router.isActive(path, params, strictEquality, ignoreQueryParams) || route.route.path.includes(router.buildPath(path, params));
        }
        return false;
    }, [testStartsWithSegment, routeName])

    return getIsActive;
}