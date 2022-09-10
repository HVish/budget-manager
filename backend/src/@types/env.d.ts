declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'production' | 'development' | 'test';
    /** server port */
    PORT: string;

    /** auth token to access this server api */
    AUTH_TOKEN: string;

    MONGO_DB_NAME: string;
    MONGO_USERNAME: string;
    MONGO_PASSWORD: string;
  }
}
