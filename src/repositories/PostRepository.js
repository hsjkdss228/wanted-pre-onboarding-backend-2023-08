/* eslint-disable class-methods-use-this */

import appDataSource from '../data-source';

import Post from '../entities/post/Post';
import User from '../entities/user/User';

import PostNotFound from '../exceptions/post/PostNotFound';

export default class PostRepository {
  async find() {
    const postRepository = appDataSource.getRepository(Post);

    const postsDto = await postRepository
      .createQueryBuilder('posts')
      .select('posts.id', 'id')
      .addSelect('posts.title', 'title')
      .addSelect('users.id', 'userId')
      .addSelect('users.name', 'authorName')
      .leftJoin(User, 'users', 'users.id = posts.user_id')
      .getRawMany();

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

    if (!postDto) {
      throw new PostNotFound();
    }

    return postDto;
  }
}

export const postRepository = new PostRepository();
