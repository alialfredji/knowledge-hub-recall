import type { HookContext } from '../../types';
import type { SupabaseClient } from '@supabase/supabase-js';

interface ContentPayload {
    url: string;
    title?: string;
    type?: 'article' | 'video' | 'audio';
}

export default ({ registerAction, knownHooks }: HookContext) => {
    registerAction({
        name: 'content',
        trace: __dirname,
        hook: knownHooks.INIT_FASTIFY,
        handler: async ({ registerRoute }) => {
            registerRoute.post('/content', async (req, res) => {
                const payload = req.body as ContentPayload;
                const { client } = req.supabase as { client: SupabaseClient };

                const { data, error } = await client
                    .from('content')
                    .insert([payload])
                    .select()
                    .single();

                if (error) {
                    return res.status(400).send({ error: error.message });
                }

                return res.send(data);
            });
        },
    });
}; 