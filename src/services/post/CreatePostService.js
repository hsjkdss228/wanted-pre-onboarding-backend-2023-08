/* eslint-disable class-methods-use-this */

import { userRepository } from '../../repositories/UserRepository';
import { postRepository } from '../../repositories/PostRepository';

import Post from '../../entities/post/Post';

import UserNotFound from '../../exceptions/user/UserNotFound';

export default class CreatePostService {
  async createPost({
    userId,
    createPostRequestDto,
  }) {
    const user = await userRepository.findBy({ userId });

    if (!user) {
      throw new UserNotFound();
    }

    const { title, descriptionText } = createPostRequestDto;

    const post = new Post({
      userId,
      title,
      descriptionText,
    });

    const postId = await postRepository.save(post);

    return { postId };
  }
}

export const createPostService = new CreatePostService();
