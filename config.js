const config = {
  port: process.env.PORT || 8000,
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: 3306,
    username: 'root',
    password: 'root-password',
    name: 'db',
  },
  secret: 'YOULLNEVERKNOWWHATIHAVEDONE',
};

export default config;
