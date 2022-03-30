import 'dotenv/config';

const config = {
  mongodb: process.env.MONGO_DB_URI,
  port: process.env.PORT || '8080',
  cors: process.env.CORS || '*',
  cookie_max_age: process.env.COOKIE_MAX_AGE,
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
  MAIL_ETH_HOST: process.env.MAIL_ETH_HOST,
  MAIL_ETH_PORT: process.env.MAIL_ETH_PORT,
  MAIL_ETH_USER: process.env.MAIL_ETH_USER,
  MAIL_ETH_PASS: process.env.MAIL_ETH_PASS,
};

export default config;
