export interface HookContext {
    registerAction: (config: ActionConfig) => void;
    registerHook: (hooks: Record<string, string>) => void;
    knownHooks: Record<string, string>;
    createHook: {
        sync: (hook: string, payload: any) => void;
    };
    getConfig: (name: string) => any;
    setConfig: (name: string, value: any) => void;
    getEnv: (name: string, defaultValue?: any) => any;
    setContext: (name: string, value: any) => void;
}

export interface ActionConfig {
    name: string;
    trace: string;
    hook: string;
    handler: (payload: any) => void;
}
