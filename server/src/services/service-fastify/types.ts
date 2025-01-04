export interface RegisterRoute {
    get: (url: string, handler: Function, schema: object) => void;
    post: (url: string, handler: Function, schema: object) => void;
    put: (url: string, handler: Function, schema: object) => void;
    delete: (url: string, handler: Function, schema: object) => void;
}

export interface InitFastifyContext {
    registerRoute: RegisterRoute;
    registerRouter: (file: any, prefix: string) => void;
}

export interface InitFastifyConfig {
    port: number;
    basePath: string;
    logger: boolean;
}