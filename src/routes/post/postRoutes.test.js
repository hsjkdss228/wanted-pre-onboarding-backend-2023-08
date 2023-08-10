import request from 'supertest';

import context from 'jest-plugin-context';

import server from '../../../app';
import PostNotFound from '../../exceptions/post/PostNotFound';

jest.mock('reflect-metadata', () => jest.fn());
jest.mock('../../data-source', () => ({
  initialize: jest.fn(),
}));

const find = jest.fn();
const findOneBy = jest.fn();

jest.mock(
  '../../repositories/PostRepository',
  () => ({
    postRepository: {
      find: () => find(),
      findOneBy: () => findOneBy(),
    },
  }),
);

describe('postRoutes', () => {
  afterAll(() => {
    server.close();
  });

  context('GET /posts', () => {
    const postsDto = [
      {
        id: 1,
        userId: 22,
        userEmail: 'seungjjun@naver.com',
        title: '제목 1',
      },
      {
        id: 2,
        userId: 22,
        userEmail: 'seungjjun@naver.com',
        title: '제목 22',
      },
      {
        id: 3,
        userId: 5,
        userEmail: 'jingwook@gmail.com',
        title: '제목 3333',
      },
    ];

    beforeEach(() => {
      find.mockReturnValue(postsDto);
    });

    it('postsDto 응답을 반환', (done) => {
      request(server).get('/posts')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect(postsDto)
        .end(done);
    });
  });

  context('GET /posts/:postId', () => {
    beforeEach(() => {
      findOneBy.mockClear();
    });

    context('post가 존재하는 경우', () => {
      const postDto = {
        id: 1,
        title: '제목 111',
        descriptionText: '내용 1111',
        userId: 22,
        userEmail: 'seungjjun@naver.com',
      };

      beforeEach(() => {
        findOneBy.mockReturnValueOnce(postDto);
      });

      it('postDto 응답을 반환', (done) => {
        request(server).get(`/posts/${postDto.id}`)
          .expect(200)
          .expect('Content-Type', /application\/json/)
          .expect(postDto)
          .end(done);
      });
    });

    context('post가 존재하지 않는 경우', () => {
      beforeEach(() => {
        findOneBy.mockImplementation(() => {
          throw new PostNotFound();
        });
      });

      it('PostNotFound 예외 응답을 반환', (done) => {
        request(server).get('/posts/4444')
          .expect(404)
          .expect('Content-Type', /text\/html/)
          .expect('존재하지 않는 게시글입니다.')
          .end(done);
      });
    });
  });
});
