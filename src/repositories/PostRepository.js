/* eslint-disable class-methods-use-this */

import appDataSource from '../data-source';

import PostView from '../entities/post/PostView';
import Post from '../entities/post/Post';
import User from '../entities/user/User';

export default class PostRepository {
  async find() {
    const postViewRepository = appDataSource.getRepository(PostView);
    const postsDto = await postViewRepository.find();
    return postsDto;
  }

  async findOneBy(postId) {
    const postRepository = appDataSource.getRepository(Post);

    const postDto = await postRepository
      .createQueryBuilder('posts')
      .select('posts.id', 'id')
      .addSelect('users.id', 'userId')
      .addSelect('users.name', 'authorName')
      .addSelect('posts.title', 'title')
      .addSelect('posts.description_text', 'descriptionText')
      .leftJoin(User, 'users', 'users.id = posts.user_id')
      .where('posts.id = :postId', { postId })
      .getRawOne();

    return postDto;
  }
}

export const postRepository = new PostRepository();
