/* eslint-disable class-methods-use-this */

import appDataSource from '../data-source';

import PostEntity from '../entities/post/PostEntity';
import UserEntity from '../entities/user/UserEntity';

import PostNotFound from '../exceptions/post/PostNotFound';

export default class PostRepository {
  async find() {
    const postRepository = appDataSource.getRepository(PostEntity);

    const postsDto = await postRepository
      .createQueryBuilder('posts')
      .select('posts.id', 'id')
      .addSelect('posts.title', 'title')
      .addSelect('users.id', 'userId')
      .addSelect('users.email', 'userEmail')
      .leftJoin(UserEntity, 'users', 'users.id = posts.user_id')
      .getRawMany();

    return postsDto;
  }

  async findOneBy(postId) {
    const postRepository = appDataSource.getRepository(PostEntity);

    const postDto = await postRepository
      .createQueryBuilder('posts')
      .select('posts.id', 'id')
      .addSelect('posts.title', 'title')
      .addSelect('posts.description_text', 'descriptionText')
      .addSelect('users.id', 'userId')
      .addSelect('users.email', 'userEmail')
      .leftJoin(UserEntity, 'users', 'users.id = posts.user_id')
      .where('posts.id = :postId', { postId })
      .getRawOne();

    if (!postDto) {
      throw new PostNotFound();
    }

    return postDto;
  }

  async save(post) {
    const postRepository = appDataSource.getRepository(PostEntity);

    const { userId, title, descriptionText } = post;

    const postEntity = PostEntity.create({
      userId,
      title,
      descriptionText,
    });

    const { id } = await postRepository.save(postEntity);

    return id;
  }
}

export const postRepository = new PostRepository();
