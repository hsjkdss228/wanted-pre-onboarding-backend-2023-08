/* eslint-disable class-methods-use-this */

import { userRepository } from '../../repositories/UserRepository';
import { postRepository } from '../../repositories/PostRepository';

import UserNotFound from '../../exceptions/user/UserNotFound';
import PostNotFound from '../../exceptions/post/PostNotFound';
import UserNotCreatedPost from '../../exceptions/post/UserNotCreatedPost';

export default class ModifyPostService {
  async modifyPost({
    userId,
    postId,
    modifyPostRequestDto,
  }) {
    const user = await userRepository.findBy({ userId });

    if (!user) {
      throw new UserNotFound();
    }

    const post = await postRepository.findOneBy({ postId });

    if (!post) {
      throw new PostNotFound();
    }

    if (!post.postedBy(user)) {
      throw new UserNotCreatedPost();
    }

    post.modify(modifyPostRequestDto);

    await postRepository.update(post);
  }
}

export const modifyPostService = new ModifyPostService();
