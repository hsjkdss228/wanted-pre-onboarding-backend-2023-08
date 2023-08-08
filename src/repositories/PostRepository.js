/* eslint-disable class-methods-use-this */

import appDataSource from '../data-source';

import PostView from '../entities/PostView';

export default class PostRepository {
  async find() {
    const postViewRepository = appDataSource.getRepository(PostView);
    const postsDto = await postViewRepository.find();
    return postsDto;
  }
}

export const postRepository = new PostRepository();
