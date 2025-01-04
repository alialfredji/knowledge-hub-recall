
import { registerRoute, registerRouter, start, init } from './fastify.lib';
import type { HookContext } from '@/types';

const SERVICE_NAME = 'fastify';

export default ({
    registerAction,
    registerHook,
    getConfig,
    knownHooks,
    createHook,
    setContext,
}: HookContext) => {
    registerHook({
        INIT_FASTIFY: 'INIT_FASTIFY',
    });

    registerAction({
        name: SERVICE_NAME,
        trace: __dirname,
        hook: '$INIT_SERVICE',
        handler: async () => {
            init(getConfig('service-fastify'));

            registerRoute.get('', (req, res) => {
                res.send('API is running');
            })

            await createHook.sync(knownHooks.INIT_FASTIFY, {
                registerRoute,
                registerRouter,
            });

            setContext('fastify', {
                registerRoute,
                registerRouter,
            })
        }
    });

    registerAction({
        name: SERVICE_NAME,
        trace: __dirname,
        hook: '$START_SERVICE',
        handler: start,
    });

    // registerAction({
    //     name: SERVICE_NAME,
    //     trace: __dirname,
    //     hook: '$INIT_FASTIFY',
    //     handler: async ({ registerRoute }: InitFastifyContext) => {
    //         registerRoute.get('/test', (request, reply) => {
    //             return reply.send('Hello World');
    //         });
    //     }
    // });
};
