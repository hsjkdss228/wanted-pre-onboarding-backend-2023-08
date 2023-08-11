/* eslint-disable class-methods-use-this */

import { userRepository } from '../../repositories/UserRepository';
import { postRepository } from '../../repositories/PostRepository';

import UserNotFound from '../../exceptions/user/UserNotFound';
import PostNotFound from '../../exceptions/post/PostNotFound';
import PostAlreadyDeleted from '../../exceptions/post/PostAlreadyDeleted';
import UserNotCreatedPost from '../../exceptions/post/UserNotCreatedPost';

export default class DeletePostService {
  async deletePost({
    userId,
    postId,
  }) {
    const user = await userRepository.findBy({ userId });

    if (!user) {
      throw new UserNotFound();
    }

    const post = await postRepository.findOneBy({ postId });

    if (!post) {
      throw new PostNotFound();
    }

    if (post.notActive()) {
      throw new PostAlreadyDeleted();
    }

    if (!post.postedBy(user)) {
      throw new UserNotCreatedPost();
    }

    await postRepository.delete({ postId });
  }
}

export const deletePostService = new DeletePostService();
