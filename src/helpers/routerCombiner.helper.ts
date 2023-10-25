import { Router } from './router.helper';
import {RouterMethodsMap} from "../constants";
/**
 * The RouteCombiner class provides functionality to merge multiple routers into a single router.
 * This is useful for modularizing route definitions while still being able to use them as a unified set.
 */
export class RouteCombiner {

    /**
     * Combines multiple routers into a single router.
     *
     * @param routers - An array of routers to be combined.
     * @returns A new router that combines all routes from the provided routers.
     */
    static combine(routers: Router[]): Router {
        const combinedRouter = new Router();

        routers.forEach(router => {
            router.routes.forEach(route => {
                // Extract main handler from the route
                const handler = route.handler;

                // Extract middlewares if any
                const middlewares = route.middlewares || [];

                // Convert pattern to a string
                const patternSource = route.pattern.source;


                // Use the method name to call the appropriate function on the combined router.
                // For example, for GET method, it will call combinedRouter.get()
                const routerMethod = RouterMethodsMap[route.method];
                (combinedRouter[routerMethod as keyof typeof combinedRouter] as any)(patternSource, handler, ...middlewares);

            });
        });

        return combinedRouter;
    }
}
