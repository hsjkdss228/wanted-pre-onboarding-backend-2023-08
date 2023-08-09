import { DataSource } from 'typeorm';

import config from '../config';

const { database } = config;

const appDataSource = new DataSource({
  type: 'mysql',
  host: database.host,
  port: database.port,
  username: database.username,
  password: database.password,
  database: database.name,
  synchronize: true,
  logging: true,
  entities: ['src/entities/**/*.js'],
  cli: {
    entitiesDir: 'src/entities/**',
  },
});

export default appDataSource;
