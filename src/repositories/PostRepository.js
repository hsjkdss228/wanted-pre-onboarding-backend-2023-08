/* eslint-disable class-methods-use-this */

import appDataSource from '../data-source';

import PostEntity from '../entities/post/PostEntity';
import UserEntity from '../entities/user/UserEntity';

import Post from '../models/post/Post';

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

  async findOneDtoBy(postId) {
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

  async findOneBy({ postId }) {
    const postRepository = appDataSource.getRepository(PostEntity);

    const {
      id,
      userId,
      title,
      descriptionText,
    } = await postRepository.findOneBy({ id: postId });

    return new Post({
      id,
      userId,
      title,
      descriptionText,
    });
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

  async update(post) {
    const postRepository = appDataSource.getRepository(PostEntity);

    const { id, title, descriptionText } = post;

    await postRepository.update(
      { id },
      { title, descriptionText },
    );
  }
}

export const postRepository = new PostRepository();
