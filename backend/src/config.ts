export const config = {
  port: process.env.PORT || 1337,
  authToken: process.env.AUTH_TOKEN,
  app: {
    user: process.env.APP_USERNAME,
    pass: process.env.APP_PASSWORD,
  },
  db: {
    user: process.env.MONGO_USERNAME,
    pass: process.env.MONGO_PASSWORD,
    name: process.env.MONGO_DB_NAME,
  },
};
