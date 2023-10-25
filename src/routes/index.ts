import {RouteCombiner} from "../helpers";
import {numberRouter} from "./number";

export const routes = RouteCombiner.combine([numberRouter]);
