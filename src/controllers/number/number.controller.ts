import { IncomingMessage, ServerResponse } from 'http';
import {numberService} from '../../services';
import {customErrorHandler} from "../../helpers";
/**
 * ApiController class responsible for handling API requests related to numbers.
 */
class NumberController {
    private readonly numberService = numberService;
    constructor() {
    }

    /**
     * @param req - The incoming HTTP request.
     * @param res - The outgoing HTTP response.
     * @param params - Optional parameters containing the 'num' parameter.
     */
    getNumber(req: IncomingMessage, res: ServerResponse, params?: any): void {
        // Parse the 'num' parameter from the request.
        if (!params?.num || typeof params.num !== 'number') {
            customErrorHandler(404, "Invalid datatype", req, res);
        }
        const num = parseInt(params?.num || '0', 10);

        const result = numberService.checkNumber(num);

        // Set the response header and send back the result as a JSON object.
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ result }));
    }
}

export const numberController = new NumberController();

