
import type { FastifySchema } from 'fastify';

import type { HookContext } from '@/types';

import { registerRoute, registerRouter, start, init } from './fastify.lib';
import type { FastifyLibContext } from './types';

const SERVICE_NAME: string = 'fastify';

const hooks: Record<string, string> = {
    INIT_FASTIFY: 'INIT_FASTIFY',
};

const healthSchema: FastifySchema = {
    tags: ['health'],
    description: 'Health check endpoint',
    response: {
        200: {
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        }
    }
};

export default ({
    registerAction,
    registerHook,
    getConfig,
    knownHooks,
    createHook,
    setContext,
}: HookContext) => {
    registerHook(hooks);

    registerAction({
        name: SERVICE_NAME,
        trace: __dirname,
        hook: '$INIT_SERVICE',
        handler: async () => {
            await init(getConfig('service-fastify'));

            await createHook.sync(knownHooks.INIT_FASTIFY, { registerRoute, registerRouter });
            setContext('fastify', { registerRoute, registerRouter });
        }
    });

    registerAction({
        name: SERVICE_NAME,
        trace: __dirname,
        hook: '$INIT_FASTIFY',
        handler: ({ registerRoute }: FastifyLibContext) => {
            registerRoute.get({
                url: '/health',
                schema: healthSchema,
                handler: async () => ({ message: 'ok' })
            });
        }
    })

    registerAction({
        name: SERVICE_NAME,
        trace: __dirname,
        hook: '$START_SERVICE',
        handler: start
    });
};
