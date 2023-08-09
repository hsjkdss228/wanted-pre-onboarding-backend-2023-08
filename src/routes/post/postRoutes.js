import express from 'express';

import { postRepository } from '../../repositories/PostRepository';
import PostNotFound from '../../exceptions/post/PostNotFound';

const router = express.Router();

router.get('/posts', async (_, response) => {
  const postsDto = await postRepository.find();

  response.type('application/json')
    .send(postsDto);
});

router.get('/posts/:postId', async (request, response) => {
  const postId = Number(request.params.postId);

  try {
    const postDto = await postRepository.findOneBy(postId);

    response.type('application/json')
      .send(postDto);
  } catch (error) {
    if (error instanceof PostNotFound) {
      response.status(404)
        .type('text/html')
        .send(error.message);
    } else {
      response.status(500)
        .type('text/html')
        .send('Internal Server Error');
    }
  }
});

export default router;
