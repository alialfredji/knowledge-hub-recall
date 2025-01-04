import Fastify, { FastifyInstance } from 'fastify';
import { InitConfig, RouteConfig } from './types';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

let config: InitConfig = null;
let client: FastifyInstance = null;

export const init = async (_config: InitConfig) => {
    config = _config;
    client = Fastify({ logger: config.logger });
    
    await client.register(swagger, config.swagger);
    await client.register(swaggerUi, config.swaggerUi);
};

export const start = async () => {
    await client.listen({ port: config.port });
    console.log(`API is running on http://localhost:${config.port}${config.basePath}`);
};

export const registerRoute = {
    get: (routeConfig: RouteConfig) => client.get(`${config.basePath}${routeConfig.url}`, routeConfig),
    post: (routeConfig: RouteConfig) => client.post(`${config.basePath}${routeConfig.url}`, routeConfig),
    put: (routeConfig: RouteConfig) => client.put(`${config.basePath}${routeConfig.url}`, routeConfig),
    delete: (routeConfig: RouteConfig) => client.delete(`${config.basePath}${routeConfig.url}`, routeConfig),
};

export const registerRouter = (plugin: any, prefix: string) => 
    client.register(plugin, { prefix: `${config.basePath}${prefix}` });