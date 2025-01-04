import { createClient } from '@supabase/supabase-js';
import type { HookContext } from '@/types';
import { InitSupabaseConfig } from './types';

const SERVICE_NAME = 'supabase';

let config: InitSupabaseConfig = null;

let client: ReturnType<typeof createClient> = null;

const init = (_config: InitSupabaseConfig) => {
    config = _config;

    client = createClient(config.url, config.key, {
        auth: {
            autoRefreshToken: true,
            persistSession: true,
        },
    });
};

export default ({ registerAction, registerHook, getConfig, knownHooks, createHook }: HookContext) => {
    registerHook({
        INIT_SUPABASE: 'INIT_SUPABASE',
    });

    registerAction({
        name: SERVICE_NAME,
        trace: __dirname,
        hook: '$INIT_SERVICE',
        handler: async () => {
            init(getConfig('service-supabase'));

            await createHook.sync(knownHooks.INIT_SUPABASE, {
                client,
            });
        },
    });
}; 