import {HttpMethod} from "../constants";
import {RouteHandler} from "../types";

export interface Route {
    method: HttpMethod;
    pattern: RegExp;
    handler: RouteHandler;
    middlewares?: RouteHandler[];
}
