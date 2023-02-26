export interface AppConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  MONGO_DB_URI: string;
  MONGO_DB_NAME: string;
  MONGO_USERNAME: string;
  MONGO_PASSWORD: string;
  JWT_SECRET: string;
  JWT_EXPIRATION: number;
}
