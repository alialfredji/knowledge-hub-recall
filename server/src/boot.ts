import hookApp from '@alialfredji/hook-app';
import type { HookContext } from '@/types';

hookApp.run({
    trace: process.env.NODE_ENV === 'development',
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
            logger: getEnv('LOGGER', 'false') === 'true',
        });

        setConfig('service-supabase', {
            url: getEnv('SUPABASE_URL'),
            key: getEnv('SUPABASE_SERVICE_KEY'),
        });
    },
});