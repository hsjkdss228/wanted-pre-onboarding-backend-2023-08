const config = {
  port: process.env.PORT || 8000,
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: 'db',
  },
  secret: 'YOULLNEVERKNOWWHATIHAVEDONE',
};

export default config;
