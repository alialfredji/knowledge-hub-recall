import type { FastifySchema } from 'fastify';
import type { HookContext } from '@/types';
import type { FastifyLibContext } from '@/services/service-fastify/types';
import * as pg from '@/services/service-postgres';

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

export default ({ registerAction }: HookContext) => {
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

                    const result = await pg.query(
                        `
                            INSERT INTO uploads (type, payload, created_at, updated_at)
                            VALUES ($1, $2, NOW(), NOW())
                            RETURNING id
                        `,
                        [type, payload]
                    );

                    return reply.status(201).send({
                        id: result[0].id,
                    });
                }
            })
        }
    })
}; 