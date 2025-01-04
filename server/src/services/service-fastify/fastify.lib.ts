import Fastify, { FastifyInstance } from 'fastify';
import { InitFastifyConfig } from './types';

let config: InitFastifyConfig = null;
let client: FastifyInstance = null;

// List of all routes
export const routePaths: string[] = [];

export const init = (_config: InitFastifyConfig) => {
    config = _config;

    client = Fastify({
        logger: config.logger,
    });
};

export const start = async () => {
    await client.listen({ port: config.port });
    console.log(`API is running on http://localhost:${config.port}${config.basePath}`);
};

// Get all routes
export const getRoutesPaths = () => routePaths;

// Register a router
export const registerRouter = (file: any, prefix: string) => {
    routePaths.push(`${config.basePath}${prefix}`);
    client.register(file, { prefix: `${config.basePath}${prefix}` });
};

// Register a route
export const registerRoute = (method: string, url: string, handler: Function, schema: object = {}) => {
    routePaths.push(`${config.basePath}${url}`);

    client.route({
        method,
        url: `${config.basePath}${url}`,
        handler: (request, reply) => handler(request, reply),
        schema,
    });
};

registerRoute.get = (url: string, handler: Function, schema: object = {}) => {
    registerRoute('GET', url, handler, schema);
};

registerRoute.post = (url: string, handler: Function, schema: object = {}) => {
    registerRoute('POST', url, handler, schema);
};

registerRoute.put = (url: string, handler: Function, schema: object = {}) => {
    registerRoute('PUT', url, handler, schema);
};

registerRoute.delete = (url: string, handler: Function, schema: object = {}) => {
    registerRoute('DELETE', url, handler, schema);
};