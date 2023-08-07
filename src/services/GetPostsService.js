/* eslint-disable class-methods-use-this */

export default class GetPostsService {
  getPosts() {
    const postsDto = [
      {
        id: 1,
        title: '제목 1',
        descriptionText: '내용 1',
      },
      {
        id: 2,
        title: '제목 2',
        descriptionText: '내용 2',
      },
    ];

    return postsDto;
  }
}

export const getPostsService = new GetPostsService();
