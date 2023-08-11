import express from 'express';

import authenticationMiddleware from '../../middlewares/authenticationMiddleware';

import { postRepository } from '../../repositories/PostRepository';
import { createPostService } from '../../services/post/CreatePostService';
import { modifyPostService } from '../../services/post/ModifyPostService';

import PostNotFound from '../../exceptions/post/PostNotFound';
import UserNotFound from '../../exceptions/user/UserNotFound';
import UserNotCreatedPost from '../../exceptions/post/UserNotCreatedPost';

const router = express.Router();

router.get('/posts', async (_, response) => {
  const postsDto = await postRepository.find();

  response.type('application/json')
    .send(postsDto);
});

router.get('/posts/:postId', async (request, response) => {
  const postId = Number(request.params.postId);

  try {
    const postDto = await postRepository.findOneDtoBy(postId);

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

router.post(
  '/posts',
  authenticationMiddleware,
  async (request, response) => {
    const { userId } = request;

    try {
      const createPostResultDto = await createPostService
        .createPost({
          userId,
          createPostRequestDto: request.body,
        });

      response.status(201)
        .type('application/json')
        .send(createPostResultDto);
    } catch (error) {
      if (error instanceof UserNotFound) {
        response.status(404)
          .type('text/html')
          .send(error.message);
      } else {
        response.status(500)
          .type('text/html')
          .send('Internal Server Error');
      }
    }
  },
);

router.patch(
  '/posts/:postId',
  authenticationMiddleware,
  async (request, response) => {
    const { userId } = request;
    const { postId } = request.params;

    try {
      await modifyPostService.modifyPost({
        userId,
        postId: Number(postId),
        modifyPostRequestDto: request.body,
      });

      response.status(204).send();
    } catch (error) {
      if (error instanceof UserNotCreatedPost) {
        response.status(400)
          .type('text/html')
          .send(error.message);
      } else if (error instanceof UserNotFound || PostNotFound) {
        response.status(404)
          .type('text/html')
          .send(error.message);
      } else {
        response.status(500)
          .type('text/html')
          .send('Internal Server Error');
      }
    }
  },
);

export default router;
