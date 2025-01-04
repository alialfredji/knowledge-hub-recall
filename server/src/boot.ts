import hookApp from '@alialfredji/hook-app';
import type { HookContext } from './types';

hookApp.run({
    trace: true,
    features: [],
    services: [
        require('./services/service-env'),
        require('./services/service-supabase'),
        require('./services/service-fastify'),
    ],
    settings: ({ setConfig, getEnv }: HookContext) => {
        setConfig('service-fastify', {
            port: getEnv('PORT', '8080'),
            basePath: getEnv('BASE_PATH', '/api'),
            logger: getEnv('LOGGER', false),
        });

        setConfig('service-supabase', {
            url: getEnv('SUPABASE_URL'),
            key: getEnv('SUPABASE_SERVICE_KEY'),
        });
    },
});

/*
Result in console
---------------------

testHook payload: Hello World!

=================
Boot Trace:
=================

▶ feature1 ◇ init::feature
  ▶ feature1 » testHook
♦ app/trace ◇ finish
*/
