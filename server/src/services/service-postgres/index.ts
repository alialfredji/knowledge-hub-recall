import { Pool } from 'pg';
import type { HookContext } from '@/types';
import { InitConfig } from '@/services/service-postgres/types';

const SERVICE_NAME = 'postgres';

let pool: Pool = null;

const init = async (_config: InitConfig) => {
    pool = new Pool({
        connectionString: _config.connectionString,
    });
};

export const getClient = () => pool;

export const query = async <T = any>(q: string, params: any[] = []): Promise<T[]> => {
    const client = await pool.connect();
    try {
        const result = await client.query(q, params);
        return result.rows;
    } finally {
        client.release();
    }
};

export default ({ registerAction, getConfig, setContext }: HookContext) => {
    registerAction({
        name: SERVICE_NAME,
        trace: __dirname,
        hook: '$INIT_SERVICE',
        handler: () => {
            init(getConfig('service-postgres'));
            setContext('postgres', { getClient, query });
        },
    });

    registerAction({
        name: SERVICE_NAME,
        trace: __dirname,
        hook: '$START_SERVICE',
        handler: async () => {
            try {
                await query('SELECT NOW()');
                console.log('PostgreSQL connection successful');
            } catch (err) {
                throw new Error('PostgreSQL connection error: ' + err.message);
            }
        }
    })
};