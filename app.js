import express from 'express';

import homeRoutes from './src/routes/homeRoutes';

import config from './config';

const app = express();

app.use('/', homeRoutes);

const { port } = config;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default server;
