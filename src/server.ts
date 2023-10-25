import dotenv from 'dotenv';
dotenv.config();

import {createServer, IncomingMessage, ServerResponse} from 'http';
import {serverConfig} from './configs'
import {routes} from "./routes";


const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    routes.route(req, res);
});

server.listen(serverConfig.PORT, () => {
    console.log(`Server started on http://localhost:${serverConfig.PORT}`);
});
