import {IncomingMessage, ServerResponse} from 'http';
import {numberController} from '../../../src/controllers/';
import {numberService} from '../../../src/services';

// Mocking numberService
jest.mock('../../../src/services', () => ({
    numberService: {
        checkNumber: jest.fn()
    }
}));

describe('NumberController', () => {
    let req: Partial<IncomingMessage>;
    let res: Partial<ServerResponse>;

    beforeEach(() => {
        req = {};
        res = {
            writeHead: jest.fn(),
            end: jest.fn()
        };
    });

    it('should respond with a JSON result based on the num parameter', () => {
        (numberService.checkNumber as jest.Mock).mockReturnValueOnce('G');
        req = {
            url: '/endpoint?num=3'
        };

        numberController.getNumber(req as IncomingMessage, res as ServerResponse, {num: '3'});

        expect(res.writeHead).toHaveBeenCalledWith(200, {'Content-Type': 'application/json'});
        expect(res.end).toHaveBeenCalledWith(JSON.stringify({result: 'G'}));
    });

    it('should respond with a default JSON result when no num parameter is provided', () => {
        (numberService.checkNumber as jest.Mock).mockReturnValueOnce('GN'); // Using the actual default value
        req = {
            url: '/endpoint'
        };

        numberController.getNumber(req as IncomingMessage, res as ServerResponse);

        expect(res.writeHead).toHaveBeenCalledWith(200, {'Content-Type': 'application/json'});
        expect(res.end).toHaveBeenCalledWith(JSON.stringify({result: 'GN'})); // Using the actual default value
    });

    it('should respond with a 404 error when the num parameter is not a number', () => {
        req = {
            url: '/endpoint?num=abc'
        };

        numberController.getNumber(req as IncomingMessage, res as ServerResponse, {num: 'abc'});

        expect(res.writeHead).toHaveBeenCalledWith(404, {'Content-Type': 'application/json'});
        expect(res.end).toHaveBeenCalledWith(JSON.stringify({error: 'Invalid datatype'}));
    });

    it('should handle potentially invalid num values', () => {
        (numberService.checkNumber as jest.Mock).mockReturnValueOnce('Invalid');
        req = {
            url: '/endpoint?num=-3'
        };

        numberController.getNumber(req as IncomingMessage, res as ServerResponse, {num: '-3'});

        expect(res.writeHead).toHaveBeenCalledWith(200, {'Content-Type': 'application/json'});
        expect(res.end).toHaveBeenCalledWith(JSON.stringify({result: 'Invalid'}));
    });
})
