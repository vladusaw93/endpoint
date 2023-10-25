import {HttpMethod} from "../constants";

export const RouterMethodsMap: {
    [key in HttpMethod]: string;
} = {
    [HttpMethod.GET]: 'get',
    [HttpMethod.POST]: 'post',
    [HttpMethod.PUT]: 'put',
    [HttpMethod.DELETE]: 'delete',
    [HttpMethod.PATCH]: 'patch',
    [HttpMethod.OPTIONS]: 'options',
    [HttpMethod.HEAD]: 'head'
};
