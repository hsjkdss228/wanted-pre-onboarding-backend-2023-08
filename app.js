import express from 'express';

import 'reflect-metadata';

import homeRoutes from './src/routes/homeRoutes';
import postRoutes from './src/routes/post/postRoutes';
import userRoutes from './src/routes/user/userRoutes';

import config from './config';
import appDataSource from './src/data-source';

const app = express();

app.use(express.json());
app.use(homeRoutes, postRoutes, userRoutes);

const { port } = config;

const initializeAppDataSource = async () => {
  try {
    await appDataSource.initialize();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

initializeAppDataSource();

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default server;
