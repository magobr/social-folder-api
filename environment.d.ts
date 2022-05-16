declare global {
    namespace NodeJS {
        interface ProcessEnv {
            APP_URL: string;
            DB_CONNECTION: string;
            AUTH_SECRET: string;
            AWS_ACCESS_KEY_ID: string;
            AWS_SECRET_ACCESS_KEY: string;
            AWS_DEFAULT_REGION: string;
            STORAGE_TYPE: string,
        }
    }
}

export {}