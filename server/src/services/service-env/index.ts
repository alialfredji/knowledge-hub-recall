/**
 * Extends `process.env` with informations from local files:
 *
 * .env
 * .env.local
 * .env.[development|production|...]
 * .env.[development|production|...].local
 *
 */

import path from 'path'
import fs from 'fs'
import nodeEnvFile from 'node-env-file'
import type { HookContext } from '@/types'

const SERVICE_NAME = 'env'

interface InitEnvArgs {
    cwd?: string
}


const fileExists = (filePath: string): Promise<boolean> => 
    new Promise(resolve => {
        fs.access(filePath, fs.constants.F_OK, err => {
            resolve(!err)
        })
    })

const loadEnv = async (fileName: string, root: string, options: { overwrite: boolean }): Promise<void> => {
    const filePath = path.join(root, fileName)
    if (await fileExists(filePath)) {
        nodeEnvFile(filePath, options)
    }
}

const initEnv = async (args: InitEnvArgs, ctx: HookContext): Promise<void> => {
    const cwd = args.cwd || process.cwd()
    await loadEnv('.env', cwd, { overwrite: false })
    await loadEnv('.env.local', cwd, { overwrite: true })
    await loadEnv(`.env.${process.env.NODE_ENV}`, cwd, { overwrite: true })
    await loadEnv(`.env.${process.env.NODE_ENV}.local`, cwd, { overwrite: true })

    // Decorate the context with an environment variable getter
    ctx.setContext('getEnv', getEnv)
}

export const getEnv = (name: string, defaultValue?: any): any => {
    const value = process.env[name]
    if (value !== undefined) return value
    if (defaultValue !== undefined) return defaultValue
    throw new Error(`Env.${name} must be declared`)
}

export default ({ registerAction }: HookContext) =>
    registerAction({
        hook: '$START',
        name: SERVICE_NAME,
        trace: __filename,
        handler: (ctx: HookContext) => initEnv({}, ctx),
    })
