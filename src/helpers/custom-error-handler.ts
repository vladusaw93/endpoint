import { IncomingMessage, ServerResponse } from 'http';

export const customErrorHandler = (statusCode: number, message: string, req: IncomingMessage, res: ServerResponse): void => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        error: message
    }));
}

