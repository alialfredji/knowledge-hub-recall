import type { FastifySchema } from 'fastify';
import type { HookContext } from '@/types';
import type { FastifyLibContext } from '@/services/service-fastify/types';

const FEATURE_NAME = 'uploads';

const createUploadSchema: FastifySchema = {
    tags: ['uploads'],
    description: 'Create a new upload',
    body: {
        type: 'object',
        required: ['type', 'payload'],
        properties: {
            type: { type: 'string' },
            payload: { 
                type: 'object',
                additionalProperties: true
            }
        }
    },
    response: {
        201: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                type: { type: 'string' },
                payload: { type: 'object' },
                created_at: { type: 'string' },
                updated_at: { type: 'string' }
            }
        }
    }
};

export default ({ registerAction, createHook }: HookContext) => {
    registerAction({
        name: FEATURE_NAME,
        trace: __dirname,
        hook: '$INIT_FASTIFY',
        handler: async ({ registerRoute }: FastifyLibContext) => {
            registerRoute.post({
                url: '/uploads',
                schema: createUploadSchema,
                handler: async (request, reply) => {
                    const { type, payload } = request.body as { type: string; payload: any };

                    console.log(type, payload);

                    return reply.status(201).send({
                        id: 1,
                        type,
                        payload,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString()
                    });
                }
            })
        }
    })
}; 