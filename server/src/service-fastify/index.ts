
import { registerRoute, registerRouter, run } from './fastify.lib';
import type { HookContext } from '../types';

const SERVICE_NAME = 'fastify';

const hooks = {
    INIT_FASTIFY: 'INIT_FASTIFY',
};

export default ({ registerAction, registerHook, knownHooks }: HookContext) => {
    registerHook(hooks);

    registerAction({
        name: SERVICE_NAME,
        trace: __dirname,
        hook: '$INIT_SERVICE',
        handler: async (ctx: HookContext) => {
            registerRoute.get('', (req, res) => {
                res.send('API is running');
            })

            await ctx.createHook.sync(knownHooks.INIT_FASTIFY, {
                registerRoute,
                registerRouter,
            });
        }
    });

    registerAction({
        name: SERVICE_NAME,
        trace: __dirname,
        hook: '$START_SERVICE',
        handler: async () => {
            await run();
        }
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
