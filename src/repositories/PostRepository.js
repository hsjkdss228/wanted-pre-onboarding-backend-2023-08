/* eslint-disable class-methods-use-this */

import appDataSource from '../data-source';

import PostEntity from '../entities/post/PostEntity';
import UserEntity from '../entities/user/UserEntity';

import Post from '../models/post/Post';

import PostNotFound from '../exceptions/post/PostNotFound';
import PostAlreadyDeleted from '../exceptions/post/PostAlreadyDeleted';

export default class PostRepository {
  async find({
    page,
    count,
  }) {
    const postRepository = appDataSource.getRepository(PostEntity);

    const queryResult = await postRepository
      .createQueryBuilder('posts')
      .leftJoinAndMapOne(
        'posts.user',
        UserEntity,
        'users',
        'users.id = posts.userId',
      )
      .where('posts.deleted = false')
      .skip((page - 1) * count)
      .take(count)
      .getManyAndCount();

    return {
      posts: queryResult[0].map(({
        id, title, userId, user,
      }) => ({
        id,
        title,
        userId,
        userEmail: user.email,
      })),
      totalCount: queryResult[1],
    };
  }

  async findOneDtoBy(postId) {
    const postRepository = appDataSource.getRepository(PostEntity);

    const postDto = await postRepository
      .createQueryBuilder('posts')
      .select('posts.id', 'id')
      .addSelect('posts.title', 'title')
      .addSelect('posts.description_text', 'descriptionText')
      .addSelect('posts.deleted', 'deleted')
      .addSelect('users.id', 'userId')
      .addSelect('users.email', 'userEmail')
      .leftJoin(UserEntity, 'users', 'users.id = posts.user_id')
      .where('posts.id = :postId', { postId })
      .getRawOne();

    if (!postDto) {
      throw new PostNotFound();
    }

    const {
      id,
      title,
      descriptionText,
      deleted,
      userId,
      userEmail,
    } = postDto;

    if (deleted) {
      throw new PostAlreadyDeleted();
    }

    return {
      id,
      title,
      descriptionText,
      userId,
      userEmail,
    };
  }

  async findOneBy({ postId }) {
    const postRepository = appDataSource.getRepository(PostEntity);

    const {
      id,
      userId,
      title,
      descriptionText,
      deleted,
    } = await postRepository.findOneBy({ id: postId });

    return new Post({
      id,
      userId,
      title,
      descriptionText,
      deleted,
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

  async delete({ postId }) {
    const postRepository = appDataSource.getRepository(PostEntity);

    await postRepository.update(
      { id: postId },
      { deleted: true },
    );
  }
}

export const postRepository = new PostRepository();
