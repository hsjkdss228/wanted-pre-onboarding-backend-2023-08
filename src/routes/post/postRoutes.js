import express from 'express';

import { postRepository } from '../../repositories/PostRepository';

const router = express.Router();

router.get('/posts', async (_, response) => {
  const postsDto = await postRepository.find();
  response.type('application/json')
    .send(postsDto);
});

router.get('/posts/:postId', async (request, response) => {
  const postId = Number(request.params.postId);

  const postDto = await postRepository.findOneBy(postId);

  response.type('application/json')
    .send(postDto);
});

export default router;
