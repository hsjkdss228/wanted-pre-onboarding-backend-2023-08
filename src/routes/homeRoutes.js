import express from 'express';

const router = express.Router();

router.get('/', (_, response) => response
  .type('text/html')
  .send('Hello, world!'));

export default router;
