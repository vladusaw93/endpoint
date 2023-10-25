import { IncomingMessage, ServerResponse } from 'http';
import { HttpMethod } from "../constants";
import { Route } from "../interfaces";
import { RouteHandler } from "../types";

export class Router {
    private _routes: Route[] = [];
    private readonly baseRoute: string;

    constructor(baseRoute: string = "") {
        // Normalize the base route to ensure it starts with a slash and doesn't end with one.
        this.baseRoute = baseRoute.startsWith('/') ? baseRoute : '/' + baseRoute;
        if (this.baseRoute.endsWith('/')) {
            this.baseRoute = this.baseRoute.slice(0, -1);
        }
    }

    public get routes(): Route[] {
        return this._routes;
    }

    public get(pattern: string, handler: RouteHandler, ...middlewares: RouteHandler[]): void {
        this.add(HttpMethod.GET, pattern, handler, middlewares);
    }

    public post(pattern: string, handler: RouteHandler, ...middlewares: RouteHandler[]): void {
        this.add(HttpMethod.POST, pattern, handler, middlewares);
    }

    public put(pattern: string, handler: RouteHandler, ...middlewares: RouteHandler[]): void {
        this.add(HttpMethod.PUT, pattern, handler, middlewares);
    }

    public delete(pattern: string, handler: RouteHandler, ...middlewares: RouteHandler[]): void {
        this.add(HttpMethod.DELETE, pattern, handler, middlewares);
    }

    public patch(pattern: string, handler: RouteHandler, ...middlewares: RouteHandler[]): void {
        this.add(HttpMethod.PATCH, pattern, handler, middlewares);
    }

    public options(pattern: string, handler: RouteHandler, ...middlewares: RouteHandler[]): void {
        this.add(HttpMethod.OPTIONS, pattern, handler, middlewares);
    }

    public head(pattern: string, handler: RouteHandler, ...middlewares: RouteHandler[]): void {
        this.add(HttpMethod.HEAD, pattern, handler, middlewares);
    }

    // Handle routing logic
    public route(req: IncomingMessage, res: ServerResponse): void {
        const { method, url } = req;
        const matchedRoute = this._routes.find(route => {

            return    method === route.method && route.pattern.test(url || '')
            }
        );
        if (matchedRoute) {
            // Execute middlewares in sequence
            matchedRoute.middlewares?.forEach(middleware => middleware(req, res));
            // Execute the main route handler
            matchedRoute.handler(req, res, matchedRoute.pattern.exec(url || '')?.groups);
        } else {
            // If no route matches, return 404
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        }
    }

    // Private helper to add routes
    private add(method: HttpMethod, pattern: string, handler: RouteHandler, middlewares?: RouteHandler[]): void {
        // Convert URL parameters (e.g., ":param") into named RegExp groups for more expressive routing
        const modifiedPattern = `${this.baseRoute}${this.baseRoute ? '/' : ''}${pattern.replace(/:([A-Za-z0-9_]+)/g, '(?<$1>[^/]+)')}`;

        this._routes.push({
            method,
            pattern: new RegExp(modifiedPattern),
            handler,
            middlewares
        });
    }
}
