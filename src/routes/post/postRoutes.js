import express from 'express';

import { postRepository } from '../../repositories/PostRepository';

const router = express.Router();

router.get('/posts', async (_, response) => {
  const postsDto = await postRepository.find();
  response.type('application/json')
    .send(postsDto);
});

export default router;
