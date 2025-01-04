import { RouteOptions } from 'fastify';
import { SwaggerOptions } from '@fastify/swagger';
import { FastifySwaggerUiOptions } from '@fastify/swagger-ui';

export interface InitConfig {
    port: number;
    basePath: string;
    logger: boolean;
    swagger: SwaggerOptions;
    swaggerUi: FastifySwaggerUiOptions;
};

export type RouteConfig = Omit<RouteOptions, 'method' | 'url' | 'handler'> & {
    url: string;
    handler: (req: any, res: any) => Promise<any> | any;
};

export interface RegisterRoute {
    get: (routeConfig: RouteConfig) => void;
    post: (routeConfig: RouteConfig) => void;
    put: (routeConfig: RouteConfig) => void;
    delete: (routeConfig: RouteConfig) => void;
};

export interface FastifyLibContext {
    registerRoute: RegisterRoute;
    registerRouter: (file: any, prefix: string) => void;
};