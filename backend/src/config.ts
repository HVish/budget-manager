export const config = {
  port: process.env.PORT || 1337,
  db: {
    user: process.env.MONGO_USERNAME,
    pass: process.env.MONGO_PASSWORD,
    name: process.env.MONGO_DB_NAME,
  }
};
