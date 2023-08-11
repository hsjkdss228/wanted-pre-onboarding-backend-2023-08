import request from 'supertest';

import context from 'jest-plugin-context';

import server from '../../../app';

import { jwtUtil } from '../../utils/JwtUtil';

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

const createPost = jest.fn();

jest.mock(
  '../../services/post/CreatePostService',
  () => ({
    createPostService: {
      createPost: () => createPost(),
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

  context('POST /posts', () => {
    const createPostRequestDto = {
      title: '새로 올릴려는 글 제목33',
      descriptionText: '새로 올릴려는 글 내용3333',
    };

    beforeEach(() => {
      createPost.mockClear();
    });

    context('Header에 Access Token이 포함되어 있으면', () => {
      const createPostResultDto = { postId: 10 };

      beforeEach(() => {
        createPost.mockReturnValue();
      });

      it('생성된 게시글의 id를 반환', (done) => {
        const userId = 11;
        const accessToken = jwtUtil.encode(userId);

        request(server).post('/posts')
          .set('Authorization', `Bearer ${accessToken}`)
          .accept('application/json')
          .send(createPostRequestDto)
          .expect(201)
          .expect('Content-type', /application\/json/)
          .expect(createPostResultDto)
          .end(() => {
            expect(createPost).toBeCalled();
            done();
          });
      });
    });

    context('Header에 Access Token이 포함되어 있지 않으면', () => {
      it('디코딩 오류 예외 응답을 반환', (done) => {
        request(server).post('/posts')
          .accept('application/json')
          .send(createPostRequestDto)
          .expect(400)
          .expect('Content-type', /text\/html/)
          .expect('Access Token이 없거나 잘못되었습니다.')
          .end(() => {
            expect(createPost).not.toBeCalled();
            done();
          });
      });
    });

    context('Header에 잘못된 Access Token이 포함되어 있으면', () => {
      it('디코딩 오류 예외 응답을 반환', (done) => {
        const accessToken = 'BAD_ACCESS_TOKEN';

        request(server).post('/posts')
          .set('Authorization', `Bearer ${accessToken}`)
          .accept('application/json')
          .send(createPostRequestDto)
          .expect(400)
          .expect('Content-type', /text\/html/)
          .expect('Access Token이 없거나 잘못되었습니다.')
          .end(() => {
            expect(createPost).not.toBeCalled();
            done();
          });
      });
    });
  });
});
