import Fastify from 'fastify';

const env = {
    port: 8080,
    basePath: '/api',
    logger: false,
};

const fastify = Fastify({
    logger: env.logger,
});

export const run = async () => {
    await fastify.listen({ port: env.port });
    console.log(`API is running on http://localhost:${env.port}${env.basePath}`);
}

// List of all routes
export const fastifyRoutes = [];

// Get all routes
export const getRoutes = () => fastifyRoutes;

// Register a router
export const registerRouter = (file: any, prefix: string) => {
    fastifyRoutes.push(`${env.basePath}${prefix}`);
    fastify.register(file, { prefix: `${env.basePath}${prefix}` });
};

// Register a route
export const registerRoute = (method: string, url: string, handler: Function, schema: object = {}) => {
    fastifyRoutes.push(`${env.basePath}${url}`);

    fastify.route({
        method,
        url: `${env.basePath}${url}`,
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