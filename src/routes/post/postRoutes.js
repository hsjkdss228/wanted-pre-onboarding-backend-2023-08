import express from 'express';

import { getPostsService } from '../../services/GetPostsService';

const router = express.Router();

router.get('/posts', (_, response) => {
  const postsDto = getPostsService.getPosts();

  response.type('application/json')
    .send(postsDto);
});

export default router;
